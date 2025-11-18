output "s3_website_url" {
  description = "URL for the S3 hosted website"
  value       = "http://${aws_s3_bucket.website.bucket}.s3-website.${aws_s3_bucket.website.region}.amazonaws.com"
}
