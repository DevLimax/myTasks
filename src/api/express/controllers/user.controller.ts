import type { Request, Response } from "express";

import { UserRepositoryPrisma } from "../../../repositories/user/prisma/user.repository.prisma";

import prisma from "../../../repositories/prisma";
import { UserServiceImplementation } from "../../../services/user/implementation/user.service.implementation";
import { userUpdateSchema } from "../../../models/schemas/user.schemas";

export class UserController {
    private constructor() {};

    public static build() {
        return new UserController();
    };

    public async save(req: Request, res: Response) {
        const {username, email, password} = req.body;

        const aRepository = UserRepositoryPrisma.build(prisma);
        const aService = UserServiceImplementation.build(aRepository);

        try {
            const output = await aService.save(username, email, password);
            const data = {
                id: output.id,
                username,
                email,
                lastLogin: output.lastLogin
            }
            res.status(201).json(data).send();
        } catch (e: any) {
            res.status(400).json({message: e.message}).send();
        }
    }

    public async list(req: Request, res: Response) {
        const aRepository = UserRepositoryPrisma.build(prisma);
        const aService = UserServiceImplementation.build(aRepository);

        const output = await aService.list();
        const data = {
            users: output.users
        };
        res.status(200).json(data).send();
    }

    public async find(req: Request, res: Response) {
        const {id} = req.params;

        const aRepository = UserRepositoryPrisma.build(prisma);
        const aService = UserServiceImplementation.build(aRepository);

        const output = typeof id === 'string' ? await aService.find(id) : null;
        if(!output) {
            res.status(404).send(`user not found`);
            return
        }

        const data = {
            id: id,
            username: output?.username,
            email: output?.email,
            lastLogin: output?.lastLogin
        }
        res.status(200).json(data).send();
    }

    public async updatePassword(req: Request, res: Response) {
        const {id} = req.params;
        if(typeof id != 'string') return res.status(400).send('Invalid ID');

        const aRepository = UserRepositoryPrisma.build(prisma);
        const aService = UserServiceImplementation.build(aRepository);

        const validator = userUpdateSchema.safeParse(req.body);
        if(!validator.success) {
            const message = validator.error.issues[0]?.message
            res.status(400).json({message: message}).send();
            return
        }

        const {password} = validator.data;
        if(!password) {
            res.status(400).send('new password is required')
            return
        }
        try{
            const user = await aService.updatePassword(id, password);
            res.status(200).json(user);
        } catch (e: any) {
            res.status(500).json({message: e.message});
        }
    }

    public async edit(req: Request, res: Response) {
        const {id} = req.params;
        if(typeof id != 'string') return res.status(400).send('Invalid ID');

        const aRepository = UserRepositoryPrisma.build(prisma);
        const aService = UserServiceImplementation.build(aRepository);

        const validator = userUpdateSchema.safeParse(req.body);
        if(!validator.success) {
            const message = validator.error.issues[0]?.message
            res.status(400).json({message: message}).send();
            return
        }

        const {username, email} = validator.data;
        try {
            const user = await aService.update(id, {newUsername: username, newEmail: email});
            res.status(200).json(user).send();
        } catch (e: any) {
            res.status(500).json({message: e.message});
        };
    }

    public async delete(req: Request, res: Response) {
        const {id} = req.params;
        if(typeof id != 'string') {
            res.status(400).send('invalid ID')
            return
        }

        const aRepository = UserRepositoryPrisma.build(prisma);
        const aService = UserServiceImplementation.build(aRepository);

        const aUser = await aService.find(id);

        if(!aUser) {
            res.status(404).send("user not found");
            return
        }

        try{
            await aService.delete(id);
            res.status(204).send();
        } catch(e: any) {
            res.status(400).json({message: e.message});
        }
    }
}
