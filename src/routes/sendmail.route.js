import express from 'express';
const router = express.Router();

import {sendMailJob} from '../controllers/user.controller.js';

router.post('/send-bulk-email', sendMailJob);

export default router;