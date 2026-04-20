# Cognito
module "auth" {
  source      = "./cognito"
}

# RDS
module "db" {
  source      = "./rds"
  rds_password = var.rds_password
}