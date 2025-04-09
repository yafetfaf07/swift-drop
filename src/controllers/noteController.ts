import { RequestHandler } from 'express';
import notes from '../models/notes';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    //   throw Error("Something happened")
    const note = await notes.find().exec();
    res.status(200).json(note);
    res.end();
  } catch (error) {
    next(error);
  }
};

export const getNotesById: RequestHandler = async (req, res, next) => {
  const noteId = req.params.id;

  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, 'Invalid id');
    }
    if(!noteId) {
        throw createHttpError(404, "Id not found")
    }

    const singleNote = await notes.findById(noteId);
    if(!singleNote) {
        throw createHttpError(404, "Note not found")
    }
    res.status(200).json(singleNote);
    res.end();
  } catch (error) {
    next(error);
  }
};
interface createNotes {
  title?: string;
  text?: string;
}
/*Based on this example there is no response body, no query params & no specific paths
 just only the request body  */
export const createNotes: RequestHandler<
  unknown,
  unknown,
  createNotes,
  unknown
> = async (req, res, next) => {
  const title = req.body.title;
  const text = req.body.text;

  try {
    if (!title) {
      throw createHttpError(400, 'A title is required');
    }
    const newNote = await notes.create({
      title: title,
      text: text,
    });
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};
interface updateNotes {
  title?: string;
  text?: string;
}
interface updateNotesId {
  id: string;
}

export const updateNotes: RequestHandler<
  updateNotesId,
  unknown,
  updateNotes,
  unknown
> = async (req, res, next) => {
    const noteId = req.params.id;
    const newTitle = req.body.title;
    const newText = req.body.text;

    try {
        if(!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid Id");
          }
          if(!newTitle) {
            throw createHttpError(400, "Note must have a title")
          }
            const findNote = await notes.findById(noteId).exec();
        
            if(!findNote) {
                throw createHttpError(404, "Note not found");
            }
        findNote.text=newText;
        findNote.title=newTitle;

        const savedNote = await findNote.save();
        res.status(200).json(savedNote);

    }
    catch(error) {
        next(error);
    }

    
    // findNote.updateOne()
};

export const deleteNote:RequestHandler = async(req,res,next) => {
    const id = req.params.id;
    try {
        if(!id) {
            throw createHttpError(404, "Id not found");
        }
    const getNote = await notes.findById(id).exec();

        if(!getNote) {
            throw createHttpError(404, "Note not found");
        }
        await getNote.deleteOne();

        res.status(204)
        res.end();
    }
      
catch(error) {
    next(error);
}


}
