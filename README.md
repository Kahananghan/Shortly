# Shortly - URL Shortener

A modern, full-stack URL shortener application built with Node.js, Express, React, and MongoDB.

## Features

- 🔗 Shorten long URLs instantly
- 👤 User authentication and registration
- 🔐 Google OAuth integration for easy sign-in/sign-up
- 👁️ Password visibility toggle with eye icon
- 📊 Click tracking and analytics
- 🎨 Custom URL slugs for registered users
- 📱 Responsive design
- 🔒 Secure with rate limiting and input validation
- ⚡ Fast and reliable

## Tech Stack

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JWT Authentication
- Google OAuth 2.0 integration
- bcryptjs for password hashing
- Helmet for security headers
- Rate limiting with express-rate-limit
- Input validation
- CORS configuration for cross-origin requests

### Frontend
- React 19
- TanStack Router for routing
- TanStack Query for data fetching
- Redux Toolkit for state management
- Tailwind CSS for styling
- Framer Motion for animations

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd URL-SHORTNER
```

2. Install backend dependencies
```bash
cd Backend
npm install
```

3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

4. Set up environment variables

Backend (.env):
```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URI=http://localhost:5173
GOOGLE_CLIENT_ID=your_google_oauth_client_id
PORT=3000
```

Frontend (.env):
```bash
VITE_BACKEND_URI=http://localhost:3000
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
VITE_NODE_ENV=development
```

5. Start MongoDB service

6. Run the application

Backend:
```bash
cd Backend
npm run dev
```

Frontend:
```bash
cd frontend
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/google` - Google OAuth authentication
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### URL Management
- `POST /api/create` - Create short URL
- `DELETE /api/url/:id` - Delete URL (authenticated)
- `POST /api/user/urls` - Get user's URLs
- `GET /:shortUrl` - Redirect to original URL

## Security Features

- Password hashing with bcryptjs
- JWT token authentication (cookies + Authorization header)
- Google OAuth 2.0 secure authentication
- Rate limiting (100 requests/15min, 20 URL creations/15min)
- Input validation and sanitization
- Security headers with Helmet
- CORS protection with origin validation
- Cross-Origin-Opener-Policy for Google Sign-In
- MongoDB injection prevention
- Environment-based configuration

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 Client ID credentials
5. Add authorized origins:
   - `http://localhost:5173` (development)
   - `https://your-production-domain.com` (production)
6. Copy Client ID to environment variables

## Deployment

### Backend (Vercel)
- Configure `vercel.json`
- Set environment variables in Vercel dashboard:
  - `MONGO_URI`
  - `JWT_SECRET`
  - `GOOGLE_CLIENT_ID`
  - `FRONTEND_URI`
- Deploy with `vercel --prod`

### Frontend (Vercel)
- Configure build settings
- Set environment variables:
  - `VITE_BACKEND_URI`
  - `VITE_GOOGLE_CLIENT_ID`
- Deploy with `vercel --prod`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.