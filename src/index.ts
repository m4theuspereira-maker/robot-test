import express from "express";
import { routes } from "./routes";
import cors from "cors";
import "../src/config/dotenv.config";
import { PORT } from "./config/envoiriment.consts";

const app = express();
app.use(cors());
app.use(routes);
const server = app.listen(PORT, () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  console.log(`listening on port ${PORT as string} 🚀`);
});

export { server };
