import { Request, Response, NextFunction } from 'express';

async function usernameV(req: Request, res: Response, next: NextFunction): Promise<void> {
  const bodyValues = req.body;

  if (!bodyValues.username) {
    res.status(400).json({ message: '"username" and "password" are required' });
  } else {
    next();
  }
}

async function passwordV(req: Request, res: Response, next: NextFunction): Promise<void> {
  const bodyValues = req.body;

  if (!bodyValues.password) {
    res.status(400).json({ message: '"username" and "password" are required' });
  } else {
    next();
  }
}

export default {
  usernameV,
  passwordV,
};
