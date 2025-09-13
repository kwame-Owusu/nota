import type { Request, Response } from "express"
import Note from "../models/Note.ts"

export async function getAllNotes(_: Request, res: Response) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });//show newest note first

    return res.status(200).json(notes);
  } catch (err) {
    console.error("Error occurred fetching notes, ", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}


export async function getNoteByID(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    return res.json(note);
  } catch (err) {
    console.error("Error occurred finding note,", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function createNote(req: Request, res: Response) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    const savedNoted = await newNote.save();

    return res.status(201).json(savedNoted);
  } catch (err) {
    console.error("Error occurred creating note,", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateNote(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(id, { title, content }, { new: true });
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    return res.status(200).json({ message: "Note updated successfully" });
  } catch (err) {
    console.error("Error occurred updating note,", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteNote(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    return res.status(200).json({ message: "Note deleted successfully" });
  } catch (err) {
    console.error("Error occurred deleting note,", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}