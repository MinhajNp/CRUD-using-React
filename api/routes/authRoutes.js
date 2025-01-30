import express from 'express';
import  {signin, signup, signout, 
         adminSignIn, 
}  from '../controllers/authController.js';


const router = express.Router();

router.post("/signup", signup)
router.post("/signin", signin)
router.post("/signout", signout)

router.post("/adminSignIn", adminSignIn)


export default router