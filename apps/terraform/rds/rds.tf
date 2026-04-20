# RDS security group
resource "aws_security_group" "rds_sg" {
  name = "rds-security-group"

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["116.64.234.139/32"] # dev
  }
}

# RDS instance
resource "aws_db_instance" "postgres" {
  allocated_storage    = 20
  engine               = "postgres"
  engine_version       = "16.10"
  instance_class       = "db.t3.micro"
  db_name              = "myappdb"
  username             = "postgres"
  password             = var.rds_password
  parameter_group_name = "default.postgres16"
  skip_final_snapshot  = false
  publicly_accessible  = false
  vpc_security_group_ids = [aws_security_group.rds_sg.id]
}