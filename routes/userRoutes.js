import express from "express";
import { getAllUsers, deleteUser } from "../controllers/userControllers.js"

const router = express.Router();

router.get("/", getAllUsers);
router.delete("/delete/:id", deleteUser);


export default router;
