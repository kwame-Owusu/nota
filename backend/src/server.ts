import express from "express";
import type { Request, Response} from "express";

const app = express();
const PORT = 3000;

app.get("/", (_: Request, res: Response) => {
  res.send("hello world");
});

app.get("/ping", (_: Request, res: Response) => {
  res.send("pong")
});

app.get("/api/notes", (_: Request, res: Response) => {
  res.send("you have got 5 notes");
});

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
});
