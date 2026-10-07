# Cognito
module "auth" {
  source = "./cognito"
}

# SQS
module "sqs" {
  source = "./sqs"
}

# ECR
module "ecr" {
  source = "./ecr"
}

module "ecs" {
  source       = "./ecs"
  queue_arn    = module.sqs.generate_clip_queue_arn
  queue_url    = module.sqs.generate_clip_queue_url
  image        = "${module.ecr.worker_repository_url}:latest"
  database_url = var.worker_database_url
}