import express from 'express';
import { sendMessage, getMessages } from '../controllers/message.controller.js';
import protectedRoute from '../middlewares/protectedRoute.js';
const router = express.Router();

router.post('/send/:id', protectedRoute, sendMessage)
router.get('/:id', protectedRoute, getMessages)

export default router