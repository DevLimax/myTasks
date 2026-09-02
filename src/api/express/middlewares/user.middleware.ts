import type { NextFunction, Request, Response } from "express";
import { userCreateSchema, userLoginSchema } from "../../../models/schemas/user.schemas";
import prisma from "../../../repositories/prisma";
import { UserRepositoryPrisma } from "../../../repositories/user/prisma/user.repository.prisma";
import { exportPayload, isTokenExpired } from "../../../utils/token.utils";
import type { JwtPayload } from "jsonwebtoken";

export async function validateFieldUserCreate(req: Request, res: Response, next: NextFunction) {
    const result = userCreateSchema.safeParse(req.body);
    if(!result.success) {
        const message = result.error.issues[0]?.message
        res.status(400).json({message: message}).send();
        return
    }
    next();
}

export async function validateLoginCredentials(req: Request, res: Response, next: NextFunction) {
    const result = userLoginSchema.safeParse(req.body);
    if(!result.success) {
        const message = result.error.issues[0]?.message
        res.status(400).json({message: message}).send();
        return
    }
    next();
}

export async function checkTokenValid(req: Request, res: Response, next: NextFunction) {
    const repository = UserRepositoryPrisma.build(prisma);
    const authToken = req.headers['authorization']?.split(' ')[1];
    if(!authToken) {
        res.status(401).send("you need to log in to perform this action.")
        return
    }
    const payload: JwtPayload = exportPayload(authToken);
    const tokenExpired = isTokenExpired(payload.exp);
    if(tokenExpired) {
        res.status(401).send("you need to log in to perform this action.")
    }
    const result = await repository.find(payload['id']);
    if(!result) {
        res.status(401).send("it is not possible to perform this action.")
        return
    }
    next();
}