import express from "express";
import type { Request, Response} from "express";
import noteRoutes from "./routes/noteRoutes"

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api/notes", noteRoutes)

app.get("/ping", (_: Request, res: Response) => {
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
});
