import Post from "../models/Post.js";

// POST Create post
export const createPost = async (req, res) => {
    try {
        const { content } = req.body;
        if (!content) {return res.status(400).json({ error: "Content required"})}

        const post = new Post({
            userId: req.user._id,
            content,
        });
        await post.save();

        res.status(201).json(post)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
// PUT Update post
export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;

        const post = await Post.findById(id);
        if (!post) {return res.status(404).json({ error: "Post not found"})};

        if (content) {post.content = content};
        post.updatedAt = new Date();
        await post.save();

        res.json(post)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}