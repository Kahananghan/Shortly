# Shortly - URL Shortener

A modern, full-stack URL shortener application built with Node.js, Express, React, and MongoDB.

## Features

- 🔗 Shorten long URLs instantly
- 👤 User authentication and registration
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
- bcryptjs for password hashing
- Helmet for security headers
- Rate limiting with express-rate-limit
- Input validation

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
cp .env.example .env
# Edit .env with your configuration
```

Frontend (.env):
```bash
cp .env.example .env
# Edit .env with your configuration
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
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### URL Management
- `POST /api/create` - Create short URL
- `DELETE /api/url/:id` - Delete URL (authenticated)
- `POST /api/user/urls` - Get user's URLs
- `GET /:shortUrl` - Redirect to original URL

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Rate limiting (100 requests/15min, 20 URL creations/15min)
- Input validation and sanitization
- Security headers with Helmet
- CORS protection
- MongoDB injection prevention

## Deployment

### Backend (Vercel)
- Configure `vercel.json`
- Set environment variables in Vercel dashboard
- Deploy with `vercel --prod`

### Frontend (Vercel)
- Configure build settings
- Set environment variables
- Deploy with `vercel --prod`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.