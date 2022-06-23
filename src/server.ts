import http from "http";
import express, { Express, Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import routes from "./routes/posts";
import dotenv from "dotenv";
import { AWSAppSyncProvider } from "@aws-amplify/pubsub";


dotenv.config();
const PORT: any = process.env.PORT ?? 8000;

const app: Express = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
    return res.status(200).json({});
}
next();
});

app.use('/', routes);

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error('Not found')
  return res.status(404).json({
    message: error.message
  })
})


app.listen(PORT, () => {
  console.log(`This server is running on port ${PORT}`);
});
