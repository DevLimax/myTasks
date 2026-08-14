import type { NextFunction, Request, Response } from "express";
import { userCreateSchema, userUpdateSchema } from "../../../models/schemas/user.schemas";

export async function validateFieldUserCreate(req: Request, res: Response, next: NextFunction) {
    const result = userCreateSchema.safeParse(req.body);
    if(!result.success) {
        const message = result.error.issues[0]?.message
        return res.status(400).json({message: message}).send();
    }
    next();
}