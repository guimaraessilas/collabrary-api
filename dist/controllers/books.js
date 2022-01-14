"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BooksController = void 0;

const server_1 = require("../server");

exports.BooksController = {
  create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = req.body;
    console.log(req.body);
    const book = yield server_1.prismaClient.books.findFirst({
      where: {
        FormattedKey: {
          equals: data.FormattedKey
        }
      }
    });

    if (book === null || book === void 0 ? void 0 : book.id) {
      return res.status(409);
    }

    const createdBook = yield server_1.prismaClient.books.create({
      data
    });

    if (createdBook.id) {
      return res.json(createdBook).status(201);
    }

    return res.status(400);
  }),
  findAll: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookList = yield server_1.prismaClient.books.findMany();
    return res.json(bookList);
  })
};