import express from 'express';
import LikeCtrl from '../../controllers/likeController.js';

const router = express.Router();

router.route('/:_id').put(LikeCtrl.addRemoveLike);

export default router;