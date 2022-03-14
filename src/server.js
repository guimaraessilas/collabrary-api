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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaClient = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const body_parser_1 = __importDefault(require("body-parser"));
const books_1 = require("./controllers/books");
const server = (0, express_1.default)();
server.use(body_parser_1.default.json());
server.use(body_parser_1.default.urlencoded({ extended: false }));
server.use(express_1.default.json());
server.use((0, cors_1.default)());
server.get("/", (req, res) => {
    return res.send("server up");
});
server.get("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield books_1.BooksController.findAll(req, res);
    return response.send();
}));
server.post("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield books_1.BooksController.create(req, res);
    return response.send();
}));
server.get("/books/:search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield books_1.BooksController.search(req, res);
    return response.send();
}));
exports.prismaClient = new client_1.PrismaClient();
exports.default = server;
//# sourceMappingURL=server.js.map