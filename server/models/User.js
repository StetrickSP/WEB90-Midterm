import mongoose from "mongoose";

const userSchema = new mongoose.Schema({ // userName, email, password là bắt buộc, email là duy nhất
    userName: {type: String, required: true},
    email: {type: String, required: true, unique: true}, 
    password: {type: String, required: true},
    apiKey: {type: String} // apiKey for login
}, {timestamps: true});

const User = mongoose.model("User", userSchema);
export default User;