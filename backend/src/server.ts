import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import type { Request, Response } from "express"
import noteRoutes from "./routes/noteRoutes.ts"
import { connectDB } from "./config/db.ts"
import rateLimiter from "./middleware/rateLimiter.ts"
dotenv.config()

const app = express();
const PORT = process.env.PORT;
const CLIENT_BASE_URL = process.env.CLIENT_BASE_URL

app.use(express.json());
app.use(cors({
  origin: CLIENT_BASE_URL,
}));
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
