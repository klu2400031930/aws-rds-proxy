# CloudExam AWS Lambda Backend

This repository contains the Node.js backend logic for the CloudExam platform. It is designed to run in AWS Lambda, connecting to an Amazon RDS PostgreSQL database via Amazon RDS Proxy.

## Project Structure
- `index.mjs`: The AWS Lambda handler containing API routing and database queries.
- `schema.sql`: PostgreSQL table definitions.
- `seed.sql`: Sample data to populate the database for demonstration.
- `.env.example`: Environment variables required for Lambda.

## Local Setup / Testing
While designed for Lambda, you can test this logic locally using an AWS SAM CLI or a local script that imports `handler(event)` directly.
Ensure you run `npm install` to download the `pg` dependency.

## Deployment to AWS Lambda
1. Zip the contents of this folder (`index.mjs`, `node_modules/`, `package.json`).
2. Upload the zip to your AWS Lambda function.
3. Configure the following Environment Variables in the AWS Lambda Console:
   - `DB_HOST` (Your RDS Proxy endpoint)
   - `DB_PORT` (Usually 5432)
   - `DB_NAME` (Your database name)
   - `DB_USER` (Your database username)
   - `DB_PASSWORD` (Your database password)
4. Ensure the Lambda Execution Role has permissions to access the VPC where the RDS Proxy resides.
