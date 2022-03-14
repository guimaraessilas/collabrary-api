import { user } from "@prisma/client";
import { Request, Response } from "express";
import { prismaClient as prisma } from "../server";

export const UserController = {
    signin: async (req: Request, res: Response) => {
        const data = req.body as user;
        const user = await prisma.user.findFirst({
            where: {
                email: {
                    equals: data.email
                }
            }
        })
        if (user?.id) {
            return res.status(409);
        }
        const createdUser = await prisma.user.create({
            data
        })
        if (createdUser) {
            return res.json(createdUser).status(201);
        }
        return res.status(400);
    },
    login: async (req: Request, res: Response) => {
        const data = req.body as user;
        const user = await prisma.user.findFirst({
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
        if (user?.id) {
            return res.json(user);
        }
        return res.status(401).json({ message: 'Credenciais inválidas!' });
    },
    update: async (req: Request, res: Response) => {

    },
    delete: async (req: Request, res: Response) => {

    },
    recoverPassword: async (req: Request, res: Response) => {

    },
}