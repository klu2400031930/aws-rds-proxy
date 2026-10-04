# CloudExam - Serverless Online Examination Platform

## Project Overview
CloudExam is a modern, professional, responsive frontend for a cloud-based online examination platform. It is designed to connect to an AWS serverless backend.

## Features
- Secure Examinations
- Real-Time Evaluation
- Scalable Cloud Architecture
- Admin and Student Dashboards
- Mock Data Mode for testing without a backend

## Technology Stack
- React
- Vite
- React Router DOM
- Axios
- Lucide React

## Folder Structure
- `src/components`: Reusable UI components
- `src/pages`: Main application pages
- `src/services`: API service layers for connecting to the backend
- `src/hooks`: Custom React hooks (e.g., `useAuth`, `useExam`)
- `src/context`: React context for state management
- `src/utils`: Helper functions and mock data
- `src/styles`: Global CSS and variables

## Local Setup
1. Clone the repository
2. Run `npm install`
3. Copy `.env.example` to `.env`
4. Run `npm run dev`

## Environment Variables
- `VITE_API_BASE_URL`: URL of the API Gateway
- `VITE_USE_MOCK_API`: Set to `true` to use mock data for development

## AWS Architecture
The frontend is part of an architecture that includes:
React Frontend -> Amazon API Gateway -> AWS Lambda -> Amazon RDS Proxy -> PostgreSQL Amazon RDS
