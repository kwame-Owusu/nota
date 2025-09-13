import type { Request, Response} from "express";

export function getAllNotes(_: Request, res: Response ){
  res.status(200).send("you just fetched the notes");
}

export function createNote(_: Request, res: Response ){
  res.status(201).json({message: "Note created successfully!"});
}

export function updateNote(req: Request, res: Response ){
  const id = req.params.id;
  res.status(200).json({message: "Note updated successfully"});
}

export function deleteNote(req: Request, res: Response ){
  const id = req.params.id;
  res.status(200).json({message: "Note deleted successfully"});
}