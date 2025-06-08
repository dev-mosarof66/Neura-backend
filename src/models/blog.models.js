import mongoose, { Schema } from "mongoose";


const blogSchema = new Schema({
    fileName: {
        type: String,
        required: true,
        trim: true,
        default: "Untitled"
    },
    title: {
        type: String,
        required: true,
        default: ""
    },
    content: {
        type: String,
        required: true,
        default: "",
    },
    image:{
        type:String,
        default:""
    }
}, { timestamps: true })

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;