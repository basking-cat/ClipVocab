variable "queue_arn" {
    type = string
}

variable "queue_url" {
    type = string
}

variable "image" {
    type = string
}

variable "database_url" {
    type = string
    sensitive = true
}

variable "youtube_api_key" {
    type      = string
    sensitive = true
}