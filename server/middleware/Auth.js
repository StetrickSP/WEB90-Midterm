import User from "../models/User.js";

const authMiddleWare = async (req, res, next) => {
    const { apiKey } = req.query;
    if (!apiKey) {return res.status(401).json({error: "apiKey required"})};

    const user = await User.findOne({ apiKey });
    if (!user) {return res.status(401).json({error: "Invalid apiKey"})}

    req.user = user;
    next()
}

export default authMiddleWare;