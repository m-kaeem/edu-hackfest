const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/connect');

exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, district, preferredLang } = req.body;

    // Check if farmer exists
    const existing = await db.query(
      'SELECT * FROM farmers WHERE email = $1',
      [email]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'Farmer already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into database
    const result = await db.query(
      `INSERT INTO farmers (name, email, password, phone, district, preferred_lang) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, name, email`,
      [name, email, hashedPassword, phone, district, preferredLang || 'bn']
    );

    const farmer = result.rows[0];

    // Create token
    const token = jwt.sign(
      { id: farmer.id, email: farmer.email },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.status(201).json({
      message: 'Registration successful',
      farmer,
      token
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find farmer
    const result = await db.query(
      'SELECT * FROM farmers WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const farmer = result.rows[0];

    // Check password
    const isMatch = await bcrypt.compare(password, farmer.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign(
      { id: farmer.id, email: farmer.email },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({
      message: 'Login successful',
      farmer: {
        id: farmer.id,
        name: farmer.name,
        email: farmer.email,
        district: farmer.district
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};