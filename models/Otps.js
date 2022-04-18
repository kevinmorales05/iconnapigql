const mongoose = require("mongoose");
const OtpSchema = new mongoose.Schema(
    {
        email:{
            type: String,
            required: true,
            trim:true
        },
        status:{
            type: Boolean,
            default: true,
        },
        number:{
            type: Number,
            required: true
        },
        creationDate:{
            type: String,
            required: true,
        },
        validUntil:{
            type: String,
            required: true,
        },
    }
);
module.exports = mongoose.model("Otp", OtpSchema)