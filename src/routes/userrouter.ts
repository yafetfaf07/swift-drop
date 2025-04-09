import * as noteController from "../controllers/userController";
import express from "express";

const router = express.Router();

router.post('/signup',noteController.createUser);
router.get("/notes/:id",noteController.getNotesfromUser)
// router.post("/notes/:id", noteController.createNoteForUser)
router.get("/", noteController.getAllUser);
router.get("/login/:username", noteController.login);

export default router