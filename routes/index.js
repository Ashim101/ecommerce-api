import express from "express";
import res from "express/lib/response";
import { registercontroller } from "../controllers";
import { logincontroller } from "../controllers";
import auth from "../middlewares/auth";
import authcontroller from '../controllers/auth/authcontroller';
import refreshcontroller from "../controllers/auth/refreshcontroller";
import {productcontroller} from "../controllers";
import admin from "../middlewares/admin";
const router = express.Router();

router.post('/register',registercontroller.register);
router.post('/login',logincontroller.login);
router.get('/me',auth, authcontroller.me);
router.post('/refresh',refreshcontroller.refresh);
router.post('/logout',auth,logincontroller.logout);
router.post('/logout',auth,logincontroller.logout);
router.post('/product',[auth,admin],productcontroller.add);
router.put('/product/:id',[auth,admin],productcontroller.update);
router.delete('/product/:id',[auth,admin],productcontroller.destroy);
router.get('/product',[auth,admin],productcontroller.index);
router.get('/product/:id',[auth,admin],productcontroller.singleindex);










export default router;