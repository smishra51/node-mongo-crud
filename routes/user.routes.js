import express from 'express';
import UserController from '../controller/user.controller.js';

let user = new UserController();
const router = express.Router();

router.post('/register', (req,res) => {
    return user.register(req,res)
});


export default router;