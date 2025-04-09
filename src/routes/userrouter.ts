import * as userController from "../controllers/userController";
import express from "express";

const router = express.Router();

router.post('/signup',userController.createUser);
router.get("/notes/:id",userController.getNotesfromUser)
// router.post("/notes/:id", noteController.createNoteForUser)
router.get("/", userController.getAllUser);
router.get("/login/:username", userController.login);

export default router