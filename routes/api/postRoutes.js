import express from 'express';
import PostCtrl from '../../controllers/postController.js';

const router = express.Router();

router.route('/')
    .get(PostCtrl.getPosts)
    .post(PostCtrl.addPost)

router.route('/:_id')
    .get(PostCtrl.getPost)
    .put(PostCtrl.updatePost)
    .delete(PostCtrl.deletePost)

export default router;