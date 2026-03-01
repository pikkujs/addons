# @pikku/addon-s3

S3-compatible object storage (AWS, MinIO, DigitalOcean Spaces).

## Functions

- `s3ListBuckets` — list all buckets
- `s3CreateBucket` — create a bucket
- `s3DeleteBucket` — delete a bucket
- `s3ListObjects` — list objects in a bucket
- `s3GetObject` — get an object
- `s3PutObject` — upload an object
- `s3DeleteObject` — delete an object
- `s3CopyObject` — copy an object

## Secrets

`S3_CREDENTIALS` — fields: accessKeyId, secretAccessKey, region, endpoint, forcePathStyle

## Dependencies

- @aws-sdk/client-s3
