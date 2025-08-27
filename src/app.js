import express from "express";
import cors from "cors";

import routes from "./router/school.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", routes);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

export { app };
