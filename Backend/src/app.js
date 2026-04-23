import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: ["https://dek-nek-xnee.vercel.app","http://localhost:5174"],
    credentials: true
}))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send("working")
})

import userRouter from "./routes/user.routers.js";
import postRouter from "./routes/post.routers.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);

export default app;