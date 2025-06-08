import auth from '../middlewares/auth.middlewares.js';
import { login, signup, logout, getProfile, updateProfile, deleteProfile } from '../controllers/user.controllers.js';

import { Router } from 'express';
const router = Router();



router.route('/login').post(login)
router.route('/signup').post(signup)
router.route('/logout').post(auth, logout)
router.route('/update-profile').post(auth, updateProfile)
router.route('/get-profile').get(auth, getProfile)
router.route('/delete-profile').post(auth, deleteProfile)












export default router