import express from "express";
import { routes } from "./routes";
import cors from "cors";
const app = express();
const port = 8080;
app.use(cors());
app.use(routes);
const server = app.listen(port, () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  console.log(`listening on port ${port} 🚀`);
});

export { server };
