import {getNotes, createNotes, getNotesById, updateNotes, deleteNote}from "../controllers/noteController";
import express from "express"

const router = express.Router();

router.get('/', getNotes);
router.get("/:id", getNotesById)

router.post("/", createNotes)


router.patch("/:id",updateNotes )

router.delete("/:id",deleteNote)
export default router;