import express from 'express';
import userRoutes from './userRoutes.js';
import postRoutes from './postRoutes.js';
import likeRoutes from './likeRoutes.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/likes', likeRoutes);

export default router;