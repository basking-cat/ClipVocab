# Cognito
module "auth" {
  source      = "./cognito"
}

# SQS
module "sqs" {
  source = "./sqs"
}