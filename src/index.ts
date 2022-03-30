import express from "express";
import { routes } from "./routes";
import cors from "cors";
import "./infrastructure/dotenv.config";
import { PORT } from "./infrastructure/environment.consts";

const app = express();
app.use(cors());
app.use(routes);
const server = app.listen(PORT, () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  console.log(`listening on port ${PORT as string} 🚀`);
});

export { server };
