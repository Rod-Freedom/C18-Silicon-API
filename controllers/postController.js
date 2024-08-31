import { User, Post } from "../models/index.js";

export default class PostCtrl {
    static async getPosts (req, res) {
        try {
            const posts = await Post.find()
                .select('-__v')
                .populate('user likes', 'username');
            
            if (!posts || posts.length === 0) res.status(200).json({ message: 'Sorry, no posts yet!' })
            else res.status(200).json(posts)

        } catch (error) {
            res.status(400).json(error);
        }
    }
    
    static async getPost (req, res) {
        const { params } = req;

        try {
            const posts = await Post.findOne(params)
                .select('-__v')
                .populate('user likes', 'username');
            
            if (!posts || posts.length === 0) return res.status(200).json({ message: 'Sorry, no posts yet!' })
            else res.status(200).json(posts)

        } catch (error) {
            console.log(error)
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
            user.posts.push(newPost._id.toString());

            const userUpdate = await user.save();
            
            res.status(200).json({ post: newPost, user: userUpdate });

        } catch (error) {
            const { message } = error;
            console.log(error)
            res.status(400).json({ message });
        }
    }

    static async updatePost (req, res) {
        const { body: { content, title }, params } = req;
        
        try {
            const limUpdate = { content, title };

            const updatedPost = await Post.findOneAndUpdate(params, limUpdate, { new: true });

            res.status(200).json(updatedPost);

        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    }
    
    static async deletePost (req, res) {
        const { params, params: { _id: postID } } = req;
        
        try {
            const deletedPosts = await Post.findOneAndDelete(params);
            const query = { _id: deletedPosts.user.toString() };
            
            const user = await User.findOne(query);
            const postIndex = user.posts.indexOf(postID);
            user.posts.splice(postIndex, 1);

            const userUpdate = await user.save();
            
            res.status(200).json({ deletedPosts, userUpdate });

        } catch (error) {
            const { message } = error;
            console.log(error)
            res.status(400).json({ message });
        }
    }
    
}