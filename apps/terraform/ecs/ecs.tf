# デフォルトVPC情報の取得（既存ネットワークの流用）
data "aws_vpc" "default" {
  default = true
}

# デフォルトVPC内のサブネット一覧の取得
data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

# ECSタスク実行用IAMロール（ECSエージェントがタスク起動時に使う権限）
resource "aws_iam_role" "execution" {
  name = "clip-vocab-worker-execution"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Service = "ecs-tasks.amazonaws.com" }
      Action    = "sts:AssumeRole"
    }]
  })
}

# タスク実行用ロールにECRイメージPull・CloudWatchログ送信の標準権限を付与
resource "aws_iam_role_policy_attachment" "execution" {
  role       = aws_iam_role.execution.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

# DB接続URLを格納するSecrets Managerシークレット
resource "aws_secretsmanager_secret" "worker" {
  name = "clip-vocab/worker"
}

# Secrets ManagerにDB接続URLの値を登録
resource "aws_secretsmanager_secret_version" "worker" {
  secret_id     = aws_secretsmanager_secret.worker.id
  secret_string = var.database_url
}

# タスク実行用ロールにSecrets Managerからの値取得権限を付与
resource "aws_iam_role_policy" "execution_secrets" {
  name = "read-worker-secret"
  role = aws_iam_role.execution.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Action   = ["secretsmanager:GetSecretValue"]
      Resource = [aws_secretsmanager_secret.worker.arn]
    }]
  })
}

# ECSタスク用IAMロール（コンテナ内のアプリケーションコードが使う権限）
resource "aws_iam_role" "task" {
  name = "clip-vocab-worker-task"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Service = "ecs-tasks.amazonaws.com" }
      Action    = "sts:AssumeRole"
    }]
  })
}

# アプリケーションにSQSメッセージの受信・削除・可視性変更権限を付与
resource "aws_iam_role_policy" "task_sqs" {
  name = "receive-generate-clip"
  role = aws_iam_role.task.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = [
        "sqs:ReceiveMessage",
        "sqs:DeleteMessage",
        "sqs:GetQueueAttributes",
        "sqs:ChangeMessageVisibility",
      ]
      Resource = [var.queue_arn]
    }]
  })
}

# コンテナログ出力先のCloudWatchロググループ（保持期間7日）
resource "aws_cloudwatch_log_group" "worker" {
  name              = "/ecs/clip-vocab-worker"
  retention_in_days = 7
}

# ECSクラスター（タスクの実行グループ）
resource "aws_ecs_cluster" "worker" {
  name = "clip-vocab"
}

# タスク定義（コンテナのCPU・メモリ・イメージ・環境変数などの設計図）
resource "aws_ecs_task_definition" "worker" {
  family                   = "clip-vocab-worker"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = aws_iam_role.execution.arn
  task_role_arn            = aws_iam_role.task.arn

  container_definitions = jsonencode([{
    name      = "worker"
    image     = var.image
    essential = true
    environment = [
      { name = "AWS_REGION", value = "ap-northeast-1" },
      { name = "QUEUE_URL", value = var.queue_url },
    ]
    secrets = [
      { name = "DATABASE_URL", valueFrom = aws_secretsmanager_secret.worker.arn },
    ]
    logConfiguration = {
      logDriver = "awslogs"
      options = {
        awslogs-group         = aws_cloudwatch_log_group.worker.name
        awslogs-region        = "ap-northeast-1"
        awslogs-stream-prefix = "worker"
      }
    }
  }])
}

# ワーカー用セキュリティグループ（アウトバウンド通信のみ許可）
resource "aws_security_group" "worker" {
  name   = "clip-vocab-worker"
  vpc_id = data.aws_vpc.default.id

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# ECSサービス（Fargate上でタスクを1台常時稼働させる管理機構）
resource "aws_ecs_service" "worker" {
  name            = "clip-vocab-worker"
  cluster         = aws_ecs_cluster.worker.id
  task_definition = aws_ecs_task_definition.worker.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = data.aws_subnets.default.ids
    security_groups  = [aws_security_group.worker.id]
    assign_public_ip = true
  }
}