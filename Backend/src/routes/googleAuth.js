import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import User from '../models/usermodel.js';
import { signtoken } from '../utils/helper.js';

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/google', async (req, res) => {
  try {
    const { token } = req.body;
    console.log('Received token:', token ? 'Token present' : 'No token');
    console.log('Client ID:', process.env.GOOGLE_CLIENT_ID);
    
    if (!token) {
      return res.status(400).json({ success: false, message: 'No token provided' });
    }
    
    // Verify the Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;
    console.log('Google user:', { email, name });
    
    // Check if user exists
    let user = await User.findOne({ email });
    
    if (!user) {
      user = new User({
        email,
        name,
        googleId,
        avatar: picture,
        isVerified: true
      });
      await user.save();
    }
    
    // Generate JWT token
    const jwtToken = signtoken({ id: user._id });
    
    res.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        avatar: user.avatar
      },
      token: jwtToken
    });
    
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(400).json({ success: false, message: 'Invalid Google token' });
  }
});

export default router;