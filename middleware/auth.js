// middleware/auth.js
import jwt from 'jsonwebtoken';
import User from '../models/Users.js';

const auth = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.user.id);
    
    if (!user) {
      throw new Error();
    }
    
    req.user = user;  // Attach user to the request object
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Please authenticate' });
  }
};

export default auth;
