import { Request, Response } from "express";
import { prismaClient as prisma } from "../server";

export const BooksController = {
  create: async (req: Request, res: Response) => {
    const data = req.body;

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
  findById: async (req: Request, res: Response) => {
    const { id } = req.params;
    const book = await prisma.books.findUnique({
      where: {
        id: Number(id)
      }
    });
    if (book) {
      return res.json(book);
    } else {
      return res.status(404).json({ message: 'Título não encontrado.' });
    }
  },
  search: async (req: Request, res: Response) => {
    const { search } = req.params;
    console.log(search)
    const searchResultList = await prisma.books.findMany({
      where: {
        OR: [
          {
            Title: {
              contains: search
            },
          }, {
            Subject: {
              contains: search
            }
          }, {
            AuthorsStr: {
              contains: search
            }
          },
          {
            FormattedKey: {
              equals: search
            }
          }
        ]

      }
    });
    if (searchResultList) {
      return res.json(searchResultList);
    } else {
      return res.status(404).json({ message: 'Nenhum título encontrado.' });
    }
  },
};
