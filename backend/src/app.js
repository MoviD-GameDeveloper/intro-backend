import express from "express";

const app = express(); // create a express app

app.use(express.json());

import useRouter from './routes/user.route.js';

app.use("/api/v1/users", useRouter)

export default app;