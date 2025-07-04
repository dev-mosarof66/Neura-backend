import Admin from '../models/admin.models.js';
import Blog from '../models/blog.models.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';

export const signup = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
        throw new ApiError(400, 'Admin with this email already exists');
    }

    const admin = new Admin({ username, email, password });
    await admin.save();

    res.status(201).json({ message: 'Admin created successfully', admin });
});

export const login = asyncHandler(async (req, res) => {

    const { username, password } = req.body;
    console.log('admin login data : ', username, password);


    if (!username) {
        throw new ApiError(400, 'Username is required');
    }
    if (!password) {
        throw new ApiError(400, 'Password is required');
    }

    const admin = await Admin.findOne({ username });
    if (!admin) {
        throw new ApiError(401, 'Invalid credentials');
    }

    const isMatch = admin.isPasswordCorrect(password);
    if (!isMatch) {
        throw new ApiError(401, 'Invalid credentials');
    }

    const accessToken = admin.generateAccessToken();
    console.log(accessToken);


    res.cookie('accessToken', accessToken)


    res.status(200).json({
        success: true, message: 'Admin login successful', user: {
            username: admin.username,
            email: admin.email,
            id: admin._id,
        }
    });

});

export const logout = asyncHandler(async (req, res) => {
    res.cookie("token", null)
    res.status(200).json({ message: 'Logout successful' });
});

export const getProfile = asyncHandler(async (req, res) => {
    console.log('inside get profile of admin');

    console.log(req.user);
    const adminId = req.user.id;

    const admin = await Admin.findById(adminId).select('-password');
    if (!admin) {
        throw new ApiError(404, 'Admin not found');
    }

    res.status(200).json({ admin });
});

export const updateProfile = asyncHandler(async (req, res) => {
    const adminId = req.admin.id;

    const updates = req.body;
    if (updates.password) {
        // If password is updated, it should be hashed in the model pre-save hook
    }

    const admin = await Admin.findByIdAndUpdate(adminId, updates, { new: true, runValidators: true }).select('-password');
    if (!admin) {
        throw new ApiError(404, 'Admin not found');
    }

    res.status(200).json({ message: 'Profile updated successfully', admin });
});

export const deleteProfile = asyncHandler(async (req, res) => {
    const adminId = req.admin.id;

    const admin = await Admin.findByIdAndDelete(adminId);
    if (!admin) {
        throw new ApiError(404, 'Admin not found');
    }

    res.status(200).json({ message: 'Admin deleted successfully' });
});


export const createBlog = asyncHandler(async (req, res) => {
    try {
        console.log(req.user);
        const adminId = req.user?.id;
        const { title, content } = req.body;
        // console.log(req.body);

        if (!title) {
            throw new ApiError(400, 'Title is required');
        }
        if (!content) {
            throw new ApiError(400, 'Content is required');
        }

        const blog = await Blog.create({
            title,
            content,
        })

        if (!blog) {
            throw new ApiError(404, 'Blog not created');
        }


        //search admin

        const admin = await Admin.findById(adminId);

        if (!admin) {
            throw new ApiError(404, 'Admin not found');
        }

        console.log(admin);


        admin.blogs.push(blog?._id)

        admin.save({
            validateBeforeSave: false
        })

        res.status(201).json({ message: 'Blog created successfully', blog });
    } catch (error) {
        console.log('Internal Server error', error);
        throw new ApiError('Something went wrong')

    }


})

export const getBlog = asyncHandler(async (req, res) => {

    const adminId = req.user?.id;

    const admin = await Admin.findById(adminId);

    if (!admin) {
        throw new ApiError(404, 'Admin not found');
    }

    const blogId = admin.blogs

    const blogs = []

    for (let itr = 0; itr < blogId.length; itr++) {
        const blog = await Blog.findById(blogId[itr])
        if (blog) {
            blogs.push(blog)
        }
    }

    console.log(blogs);

    res.status(201).json({
        message: "all blogs of admin",
        blogs
    })



})
