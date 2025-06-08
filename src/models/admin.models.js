import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'
const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'admin'
    }
});



adminSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            id: this._id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

const Admin = mongoose.model('Admin', adminSchema);




export default Admin;
