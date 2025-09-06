import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { v4 } from "uuid";

// POST Register user
export const registerUser = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        if (!userName || !email || !password) {return res.status(400).json({error: "Missing required fields"})};

        const existing = await User.findOne({ email });
        if (existing) {return res.status(400).json({error: "Email already exists"})}

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ userName, email, password: hashedPassword });
        await user.save()

        res.json({ userId: user._id, userName: user.userName, email: user.email });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// POST Login user
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {return res.status(400).json({ error: "Missing required fields"})};

        const user = await User.findOne({ email });
        if (!user) {return res.status(404).json({ error: "User not found"})};

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {return res.status(400).json({ error: "Invalid password"})}

        const apiKey = `mern-$${user._id}$-$${user.email}$-$${v4()}$`
        user.apiKey = apiKey;
        await user.save()

        res.json({ apiKey })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}