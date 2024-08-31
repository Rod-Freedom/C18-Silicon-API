import { User, Post } from "../models/index.js";

export default class PostCtrl {
    static async getPosts (req, res) {
        try {
            const posts = await Post.find()
                .select('-__v')
                .populate('likes user', '-__v');
            
            if (!posts || posts.length === 0) res.status(200).json({ message: 'Sorry, no posts yet!' })
            else res.status(200).json(posts)

        } catch (error) {
            res.status(400).json(error);
        }
    }
    
    static async getPosts (req, res) {
        try {
            const posts = await Post.find()
                .select('-__v')
                .populate('likes user', '-__v');
            
            if (!posts || posts.length === 0) return res.status(200).json({ message: 'Sorry, no posts yet!' })
            else res.status(200).json(posts)

        } catch (error) {
            res.status(400).json(error);
        }
    }

    static async addPost (req, res) {
        const { body } = req;
        
        try {
            const newPost = await Post.create(body);
            const query = { _id: newPost.user.toString() };
            
            const user = await User.findOne(query);
            console.log(user.posts)
            user.posts.push(query._id);

            const userUpdate = await user.save();
            
            res.status(200).json({ post: newPost, user: userUpdate });

        } catch (error) {
            const { message } = error;
            console.log(error)
            res.status(400).json({ message });
        }
    }
}