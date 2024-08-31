import { Post } from "../models/index.js";

export default class LikeCtrl {
    static async addRemoveLike (req, res) {
        const { body: { user }, params } = req;
        const limKeys = { user };

        try {
            const post = await Post.findOne(params);

            if (!post) return res.status(200).json({ message: 'Sorry, no posts found' });

            const likeIndex = post.likes.findIndex(like => like.user.toString() === user);

            if (likeIndex === -1) post.likes.push(limKeys)
            else post.likes.splice(likeIndex, 1);

            const postUpdate = await post.save();

            res.status(200).json(postUpdate);

        } catch (error) {
            console.log(error)
            res.status(400).json(error);
        }
    }
}