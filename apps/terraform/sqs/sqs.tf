resource "aws_sqs_queue" "generate_clip_dlq" {
  name = "clip-vocab-generate-clip-dlq"
}

resource "aws_sqs_queue" "generate_clip" {
  name                       = "clip-vocab-generate-clip"
  visibility_timeout_seconds = 300  # longer than worker process time
  redrive_policy = jsonencode({
    deadLetterTargetArn = aws_sqs_queue.generate_clip_dlq.arn
    maxReceiveCount     = 3
  })
}

resource "aws_sqs_queue" "review_eval_dlq" {
  name = "clip-vocab-review-eval-dlq"
}

resource "aws_sqs_queue" "review_eval" {
  name                       = "clip-vocab-review-eval"
  visibility_timeout_seconds = 120
  redrive_policy = jsonencode({
    deadLetterTargetArn = aws_sqs_queue.review_eval_dlq.arn
    maxReceiveCount     = 3
  })
}

resource "aws_iam_user" "api_routes" {
  name = "clip-vocab-api-routes"
}

resource "aws_iam_access_key" "api_routes" {
  user = aws_iam_user.api_routes.name
}

resource "aws_iam_user_policy" "api_routes_send" {
  name = "sqs-send-message"
  user = aws_iam_user.api_routes.name

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = [
        "sqs:SendMessage",
        "sqs:GetQueueUrl",
      ]
      Resource = [
        aws_sqs_queue.generate_clip.arn,
        aws_sqs_queue.review_eval.arn,
      ]
    }]
  })
}

resource "aws_secretsmanager_secret" "sqs_credentials" {
  name = "clip-vocab/sqs"
}

resource "aws_secretsmanager_secret_version" "sqs_credentials" {
  secret_id = aws_secretsmanager_secret.sqs_credentials.id
  secret_string = jsonencode({
    AWS_ACCESS_KEY_ID     = aws_iam_access_key.api_routes.id
    AWS_SECRET_ACCESS_KEY = aws_iam_access_key.api_routes.secret
    AWS_REGION            = "ap-northeast-1"
    GENERATE_CLIP_QUEUE_URL = aws_sqs_queue.generate_clip.url
    REVIEW_EVAL_QUEUE_URL   = aws_sqs_queue.review_eval.url
  })
}