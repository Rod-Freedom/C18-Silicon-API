import express from 'express';
import apiRoutes from './api/apiRoutes.js';

const router = express.Router();

router.use('/api', apiRoutes);
router.use((req, res) => res.json({ message: 'Try a different route!' }));

export default router;