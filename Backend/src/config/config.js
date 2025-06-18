
export const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Only secure in production (HTTPS)
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // 'none' for cross-site in production
    maxAge: 1000 * 60 * 60, // 60 minutes
    domain: process.env.NODE_ENV === 'production' ? undefined : undefined // Let browser handle domain
}