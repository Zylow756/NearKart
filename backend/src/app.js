import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import routes from "./routes/index.js";
import requestId from "./middlewares/requestId.js";
import notFound from "./middlewares/notFound.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(requestId);

// Routes
app.use("/api/v1", routes);

// 404 Handler
app.use(notFound);

// Error Handler
app.use(errorMiddleware);

export default app;