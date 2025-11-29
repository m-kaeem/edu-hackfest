require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('../db/connect');
const jwt = require('jsonwebtoken');

// Only configure Google Strategy if credentials are provided
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails[0].value;
      const name = profile.displayName;
      const googleId = profile.id;
      const avatar = profile.photos[0]?.value;

      // Check if user exists
      let result = await db.query(
        'SELECT * FROM farmers WHERE email = $1 OR google_id = $2',
        [email, googleId]
      );

      let farmer;

      if (result.rows.length > 0) {
        // User exists - update google_id if not set
        farmer = result.rows[0];
        if (!farmer.google_id) {
          await db.query(
            'UPDATE farmers SET google_id = $1, avatar = $2 WHERE id = $3',
            [googleId, avatar, farmer.id]
          );
        }
      } else {
        // Create new user
        const insertResult = await db.query(
          `INSERT INTO farmers (name, email, google_id, avatar, preferred_lang) 
           VALUES ($1, $2, $3, $4, 'bn') RETURNING id, name, email, district`,
          [name, email, googleId, avatar]
        );
        farmer = insertResult.rows[0];
      }

      // Create JWT token
      const token = jwt.sign(
        { id: farmer.id, email: farmer.email },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
      );      return done(null, { farmer, token });
    } catch (error) {
      console.error('Google auth error:', error);
      return done(error, null);
    }
  }
  ));
} else {
  console.warn('⚠️ Google OAuth not configured - missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET');
}

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
