import express from "express"
import type { Request, Response } from "express"
import noteRoutes from "./routes/noteRoutes.ts"
import { connectDB } from "./config/db.ts"
import rateLimiter from "./middleware/rateLimiter.ts";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(rateLimiter);
app.use("/api/notes", noteRoutes)

app.get("/ping", (_: Request, res: Response) => {
  res.send("pong");
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}`);
  });
});
