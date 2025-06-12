import mongoose, { Schema } from "mongoose";


const blogSchema = new Schema({
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