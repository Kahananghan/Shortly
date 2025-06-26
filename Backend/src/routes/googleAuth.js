import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import User from '../models/usermodel.js';
import { signtoken } from '../utils/helper.js';

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/google', async (req, res) => {
  try {
    const { token, isRegister, isLogin } = req.body;
    
    // Verify the Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;
    
    let user = await User.findOne({ email });
    let isExistingUser = false;
    
    if (!user) {
      if (isLogin) {
        return res.json({
          success: true,
          isNewUser: true,
          message: 'No account found'
        });
      }
      
      user = new User({
        email,
        name,
        googleId,
        avatar: picture,
        isVerified: true
      });
      await user.save();
    } else {
      isExistingUser = true;
      if (isRegister) {
        return res.json({
          success: true,
          isExistingUser: true,
          message: 'User already exists'
        });
      }
    }
    
    const jwtToken = signtoken({ id: user._id });

    res.cookie('token', jwtToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000
    });
    
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