import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import routes from "./routes/index.js";
import { notFoundHandler, errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true, message: "Ball Race API is healthy" });
});

app.use("/api/v1", routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
