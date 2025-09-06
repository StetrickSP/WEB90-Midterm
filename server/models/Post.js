import mongoose from "mongoose";

// userId, content là bắt buộc, createdAt và updatedAt mặc định sử dụng thời gian khi tạo.
const postSchema = new mongoose.Schema({ 
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    content: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
}, {timestamps: true});

const Post = mongoose.model("Post", postSchema);
export default Post;