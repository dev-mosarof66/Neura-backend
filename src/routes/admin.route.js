import { Router } from "express";
import { signup, login, logout, getProfile, updateProfile, deleteProfile, createBlog } from '../controllers/admin.controllers.js'
import auth from '../middlewares/auth.middlewares.js'
import upload from "../middlewares/multer.middleares.js";

const router = Router()


router.route('/login').post(login)
router.route('/signup').post(signup)
router.route('/logout').post(auth, logout)
router.route('/update-profile').post(auth, updateProfile)
router.route('/get-profile').get(auth, getProfile)
router.route('/delete-profile').post(auth, deleteProfile)

router.route('/create-blog').post(auth, upload.single('thumbnail'), createBlog)

export default router; 