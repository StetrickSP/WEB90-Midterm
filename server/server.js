/// * Packages: express, mongoose, bcrypt, uuid, nodemon, cors
/// imports
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { loginUser, registerUser } from "./controllers/userController.js";
import { createPost, updatePost } from "./controllers/postController.js";
import authMiddleWare from "./middleware/Auth.js";

const uri = "mongodb+srv://stetricksp_db_user:y6Hx4a55WKT8jFJd@cluster0.rcrm5eu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const port = 3000;

const app = express();

app.use(express.json()); 
app.use(cors());

/// Connect to MongoDB using mongoose with ClientOptions
try {
    mongoose.connection.on("connected", () => console.log("Database connected"));
    await mongoose.connect(uri);
} catch (error) {
    console.log(error.message)
}

/// APIs
// Users API
app.post("/users/register", registerUser);
app.post("/users/login", loginUser);
// Posts API
app.post("/posts", authMiddleWare, createPost);
app.put("/posts/:id", authMiddleWare, updatePost);

/// npm run server
app.listen(port, () => console.log(`Server is running on localhost:${port}!`))
