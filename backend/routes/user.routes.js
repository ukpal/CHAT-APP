import express from 'express';
import { getUsersForSidebar } from '../controllers/user.controller.js';
import protectedRoute from '../middlewares/protectedRoute.js';
const router = express.Router();

// router.post('/send/:id', protectedRoute, sendMessage)
router.get('/', protectedRoute, getUsersForSidebar)

export default router