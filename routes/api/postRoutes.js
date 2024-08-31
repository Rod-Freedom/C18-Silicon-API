import express from 'express';
import PostCtrl from '../../controllers/postController.js';

const router = express.Router();

router.route('/')
    .get(PostCtrl.getPosts)
    .post(PostCtrl.addPost)

export default router;