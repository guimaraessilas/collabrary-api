"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksController = void 0;
const server_1 = require("../server");
exports.BooksController = {
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = req.body;
        const book = yield server_1.prismaClient.books.findFirst({
            where: {
                FormattedKey: {
                    equals: data.FormattedKey,
                },
            },
        });
        if (book === null || book === void 0 ? void 0 : book.id) {
            return res.status(409);
        }
        const createdBook = yield server_1.prismaClient.books.create({
            data,
        });
        if (createdBook.id) {
            return res.json(createdBook).status(201);
        }
        return res.status(400);
    }),
    findAll: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const bookList = yield server_1.prismaClient.books.findMany();
        return res.json(bookList);
    }),
    findById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const book = yield server_1.prismaClient.books.findUnique({
            where: {
                id: Number(id)
            }
        });
        if (book) {
            return res.json(book);
        }
        else {
            return res.status(404).json({ message: 'Título não encontrado.' });
        }
    }),
    search: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { search } = req.params;
        console.log(search);
        const searchResultList = yield server_1.prismaClient.books.findMany({
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
        }
        else {
            return res.status(404).json({ message: 'Nenhum título encontrado.' });
        }
    }),
};
//# sourceMappingURL=books.js.map