import express from 'express';
import { test } from '../controllers/userController.js';


const router = express.Router();

 //test api (interaction with backend test)
router.get('/test', test);
export default router;