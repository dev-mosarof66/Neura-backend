import User from '../models/user.models.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js'

export const signup = asyncHandler(async (req, res) => {
  const { fullName, email, password, confirmPassword } = req.body;

  if (!fullName) {
    throw new ApiError('Fullname is required', 400);
  }

  if (!email) {
    throw new ApiError('Email is required', 400);
  }

  if (!password) {
    throw new ApiError('Password is required', 400);
  }
  if (!confirmPassword) {
    throw new ApiError('Confirm Password is required', 400);
  }


  if (password != confirmPassword) {
    throw new ApiError('Passwords do not match', 400);
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, 'email already in use.');
  }

  const user = new User({ fullname:fullName, email, password });
  await user.save();

  res.status(201).json({ message: 'User created successfully', user });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const isMatch = await user.isPasswordCorrect(password);
  if (!isMatch) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  res.cookie("accessToken", accessToken);

  user.refreshToken = refreshToken;
  await user.save({
    validateBeforeSave: false
  })

  res.status(200).json({ message: 'Login successful', user });
});

export const logout = asyncHandler(async (req, res) => {
  res.cookie('accessToken', null)
  res.status(200).json({ message: 'Logout successful' });
});

export const getProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const user = await User.findById(userId).select('-password');
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  res.status(200).json({ user });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const updates = req.body;
  if (updates.password) {
    // If password is updated, it should be hashed in the model pre-save hook
  }

  const user = await User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true }).select('-password');
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  res.status(200).json({ message: 'Profile updated successfully', user });
});

export const deleteProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  res.status(200).json({ message: 'User deleted successfully' });
});
