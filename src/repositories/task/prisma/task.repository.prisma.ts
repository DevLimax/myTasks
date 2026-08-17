import { type PrismaClient } from "@prisma/client";
import Task from "../../../models/entities/task";
import type { TaskRepository } from "../task.repository";

export class TaskRepositoryPrisma implements TaskRepository {

    private constructor (readonly repository: PrismaClient){}

    public static build(prisma: PrismaClient) {
        return new TaskRepositoryPrisma(prisma);
    }

    public async save(task: Task): Promise<Task> {
        const data = {
            id: task.id,
            userId: task.userId,
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority
        }

        try{
            const instance = await this.repository.task.create({data});
            const {id, userId, title, description, status, priority, created_at, completed_on} = instance;
            const aTask = Task.with(id, userId, title, description, priority, status, created_at, completed_on);
            return aTask;
        } catch (e: any) {
            throw new Error(e.message);
        }
    }

    public async list(): Promise<Task[]> {
        const query = await this.repository.task.findMany();
        const tasks = query.map(task => {
            const {id, userId, title, description, status, priority, created_at, completed_on} = task;
            return Task.with(id, userId, title, description, priority, status, created_at, completed_on);
        });
        return tasks
    }

    public async find(id: string): Promise<Task | null> {
        const query = await this.repository.task.findUnique({where: {id: id}});
        if(!query) {return null};

        const {userId, title, description, status, priority, created_at, completed_on} = query;
        const task = Task.with(id, userId, title, description, priority, status, created_at, completed_on);
        return task;
    }

    public async update(id: string, task: Task): Promise<Task> {
        const data = {
            title: task.title,
            description: task.description,
            status: task.status, 
            priority: task.priority,
            completed_on: task.completed_on
        }
        try{
            await this.repository.task.update({where: {id: id}, data});
            return task
        } catch(e: any) {
            throw new Error(e.message);
        };
    }

    public async delete(id: string): Promise<void> {
        try{
            await this.repository.task.delete({where: {id: id}});
        } catch(e: any) {
            throw new Error(e.message);
        }
    }
}