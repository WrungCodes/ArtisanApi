import express from 'express';
import { Profile } from '../controllers';
import { validateToken } from '../middleware'

const router = express.Router();

router.get('/getprofile', validateToken, Profile.getProfile);
router.post('/editprofile', validateToken, Profile.updateProfile);

export default router;