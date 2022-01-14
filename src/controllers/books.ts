import { books, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { prismaClient as prisma } from "../server";

export const BooksController = {
  create: async (req: Request, res: Response) => {
    let data = req.body;

    console.log(req.body);

    const book = await prisma.books.findFirst({
      where: {
        FormattedKey: {
          equals: data.FormattedKey,
        },
      },
    });

    if (book?.id) {
      return res.status(409);
    }

    const createdBook = await prisma.books.create({
      data,
    });

    if (createdBook.id) {
      return res.json(createdBook).status(201);
    }
    return res.status(400);
  },
  findAll: async (req: Request, res: Response) => {
    const bookList = await prisma.books.findMany();
    return res.json(bookList);
  },
};
