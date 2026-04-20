# Cognito
module "auth" {
  source      = "./cognito"
}

# RDS
module "db" {
  source      = "./rds"
  rds_password = var.rds_password
  db_allowed_cidr = var.db_allowed_cidr
}