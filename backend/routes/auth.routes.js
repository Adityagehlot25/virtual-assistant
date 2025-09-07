import express from 'express';
import { signUp, login, logout } from '../controllers/auth.controllers.js';
const userRouter = express.Router();

userRouter.post('/signup', signUp);
userRouter.post('/login', login);
userRouter.post('/logout', logout);

export default userRouter;