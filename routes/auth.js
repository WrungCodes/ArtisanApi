import express from 'express';
import { Auth } from '../controllers';

const router = express.Router();

router.post('/signup', Auth.signUp);
router.post('/login', Auth.logIn);
router.post('/verify', Auth.verify);

export default router;

