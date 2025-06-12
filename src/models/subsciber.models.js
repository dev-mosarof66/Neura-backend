import { Schema, model } from "mongoose";

const SubscriberSchema = new Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    messages: [
        {
            type: String,
        }
    ],
}, {
    timestamps: true,
});

const Subscriber = model("Subscriber", SubscriberSchema);

export default Subscriber;
