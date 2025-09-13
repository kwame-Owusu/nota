import express from "express";
import type { Response, Request } from "express";

const router = express.Router();

router.get("/", (_: Request, res: Response) => {
  res.status(200).send("you just fetched the notes");
});

router.post("/", (_: Request, res: Response) => {
  res.status(201).json({message: "note created successfully!"});
});

router.put("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  res.status(200).json({message: "note updated successfully"});
});

router.delete("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  res.status(200).json({message: "note deleted successfully"});
});


export default router