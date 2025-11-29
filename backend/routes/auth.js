const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const { register, login } = require('../controllers/authCrontroller');

// Regular email/password auth
router.post('/register', register);
router.post('/login', login);

// Google OAuth routes
router.get('/google', 
  passport.authenticate('google', { 
    scope: ['profile', 'email'],
    session: false 
  })
);

router.get('/google/callback',
  passport.authenticate('google', { 
    failureRedirect: process.env.FRONTEND_URL + '/login?error=google_auth_failed',
    session: false 
  }),
  (req, res) => {
    // Successful authentication
    const { farmer, token } = req.user;
    
    // Redirect to frontend with token
    const redirectUrl = `${process.env.FRONTEND_URL}/auth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify(farmer))}`;
    res.redirect(redirectUrl);
  }
);

module.exports = router;