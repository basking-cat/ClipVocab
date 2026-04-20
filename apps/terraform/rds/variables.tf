variable "rds_password" {
  type      = string
  sensitive = true
}

variable "db_allowed_cidr" {
  type = string
}