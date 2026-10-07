resource "aws_ecr_repository" "worker" {
  name                 = "clip-vocab-worker"
  image_tag_mutability = "MUTABLE"
}
