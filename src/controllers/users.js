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
exports.UserController = void 0;
const server_1 = require("../server");
exports.UserController = {
    signin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = req.body;
        const user = yield server_1.prismaClient.user.findFirst({
            where: {
                email: {
                    equals: data.email
                }
            }
        });
        if (user === null || user === void 0 ? void 0 : user.id) {
            return res.status(409);
        }
        const createdUser = yield server_1.prismaClient.user.create({
            data
        });
        if (createdUser) {
            return res.json(createdUser).status(201);
        }
        return res.status(400);
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = req.body;
        const user = yield server_1.prismaClient.user.findFirst({
            where: {
                AND: [{
                        email: {
                            equals: data.email
                        },
                        password: {
                            equals: data.password
                        }
                    }]
            }
        });
        if (user === null || user === void 0 ? void 0 : user.id) {
            return res.json(user);
        }
        return res.status(401).json({ message: 'Credenciais inválidas!' });
    }),
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    }),
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    }),
    recoverPassword: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    }),
};
//# sourceMappingURL=users.js.map