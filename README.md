# User Auth API

A production-level RESTful authentication API built with Node.js, Express, and MongoDB.

## Features

- JWT authentication with access and refresh tokens
- Refresh token rotation with reuse detection
- Email verification on registration
- Forgot/reset password via email
- Rate limiting on sensitive routes
- Input validation with Zod
- Security headers with Helmet
- CORS support

## Upcoming Features

- [ ] Role-Based Access Control (RBAC)
- [ ] Two-Factor Authentication (2FA) via Authenticator Apps
- [ ] OAuth2 / Social Login Integration (Google, GitHub)
- [ ] Device & Session Management
- [ ] Security Audit Logging
- [ ] Secure HTTP-Only Cookies for Refresh Tokens
- [ ] Redis-backed Token Blocklist

## Tech Stack

- Node.js + Express 5
- MongoDB + Mongoose
- JSON Web Tokens (jsonwebtoken)
- Bcryptjs for password hashing
- Zod for schema validation
- Nodemailer for emails
- Helmet + CORS + express-rate-limit

## Getting Started

### Prerequisites
- Node.js >= 18
- MongoDB Atlas account
- Gmail account with App Password

### Installation

```bash
git clone https://github.com/Karimmm03/user-auth-api
cd user-auth-api
npm install
cp .env.example .env
# fill in your .env values
npm run dev
```

## API Endpoints

### Auth
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/auth/register | Register new user | No |
| POST | /api/auth/verify-email | Verify email address | No |
| POST | /api/auth/resend-verification-email | Resend verification email | No |
| POST | /api/auth/login | Login user | No |
| POST | /api/auth/refresh | Refresh access token | No |
| POST | /api/auth/logout | Logout user | Yes |
| POST | /api/auth/forgot-password | Request password reset | No |
| POST | /api/auth/reset-password | Reset password | No |

### User
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /api/users/me | Get current user | Yes |

## Environment Variables

See `.env.example` for all required variables.

## Security

- Passwords hashed with bcrypt (10 salt rounds)
- Refresh tokens rotated on every use
- Reset and verification tokens hashed with SHA-256 before storage
- Rate limiting on auth endpoints (5 requests per 15 minutes)
- HTTP security headers via Helmet

## License

ISC License