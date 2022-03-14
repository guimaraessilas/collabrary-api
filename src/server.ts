import express, { Request, Response } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";
import { BooksController } from "./controllers/books";

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  return res.send("server up");
});

server.get("/books", async (req: Request, res: Response) => {
  const response = await BooksController.findAll(req, res);
  return response.send();
});

server.post("/books", async (req: Request, res: Response) => {
  const response = await BooksController.create(req, res);
  return response.send();
});

server.get("/books/:search", async (req: Request, res: Response) => {
  const response = await BooksController.search(req, res);
  return response.send();
});

export const prismaClient = new PrismaClient();
export default server;
