import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/Users.js';

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  const { First_Name, Last_Name, Role, District, Institution_Name, Email, Password } = req.body;
  try {
    let user = await User.findOne({ Email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({ First_Name, Last_Name, Role, District, Institution_Name, Email, Password });

    const salt = await bcrypt.genSalt(10);
    user.Password = await bcrypt.hash(Password, salt);

    await user.save();
    res.status(200).send('User registered successfully');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { Email, Password } = req.body;
  try {
    const user = await User.findOne({ Email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.Role
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, role: user.Role, name: user.First_Name });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router;
