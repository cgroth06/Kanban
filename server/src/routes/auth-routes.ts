import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// import dotenv from 'dotenv';
// dotenv.config();

//14/14  14-25activity
export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  const { username , password } = req.body;

  const user = await User.findOne({ 
    where: { username }, 
  });

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const passwordIsValid = await bcrypt.compare(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  const secretKey = process.env.JWT_SECRET_KEY || '';

  const token = jwt.sign({ username }, secretKey as string, { expiresIn: '15s' });
  return res.json({ token });
}

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
