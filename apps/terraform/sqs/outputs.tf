output "generate_clip_queue_url" {
  value = aws_sqs_queue.generate_clip.url
}

output "review_eval_queue_url" {
  value = aws_sqs_queue.review_eval.url
}

output "secret_arn" {
  value = aws_secretsmanager_secret.sqs_credentials.arn
}