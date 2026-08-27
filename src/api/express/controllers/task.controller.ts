import type { Request, Response } from "express";
import type { TaskInputDto, TaskService, TaskUpdateInputDto } from "../../../services/task/task.service";
import type { TaskFilters } from "../../../repositories/task/task.repository";


export class TaskController {
    private constructor(private service: TaskService) {}

    public static build(service: TaskService) {
        return new TaskController(service);
    }

    public save = async (req: Request, res: Response) => {
        const {userId, title, description, status, priority} = req.body;
        const data: TaskInputDto = {
            userId,
            title,
            description,
            status,
            priority
        };
        try{
            const newTask = await this.service.save(data);
            res.status(201).json(newTask);
        } catch(e: any) {
            res.status(400).json({message: e.message});
        }
    }

    public list = async (req: Request, res: Response) => {
        const {userId, status, priority} = req.query;
        const filters: TaskFilters = {
            userId,
            status,
            priority
        };
        console.log(filters)
        const tasks = await this.service.list(filters);
        res.status(200).json(tasks);
    }

    public find = async (req: Request, res: Response) => {
        const {id} = req.params;
        const task = await this.service.find(id);
        if(!task) {
            res.status(404).send('task not found');
        } else {
            res.status(200).json(task);
        }
    }

    public update = async (req: Request, res: Response) => {
        const {id} = req.params;
        const {title, description, status, priority} = req.body;
        const data: TaskUpdateInputDto = {
            title,
            description,
            status,
            priority
        }
        try{
            const taskUpdated = await this.service.update(id, data);
            res.status(200).json(taskUpdated);
        } catch(e: any) {
            res.status(400).json({message: e.message});
        }
    }

    public delete = async (req: Request, res: Response) => {
        const {id} = req.params;
        try{
            await this.service.delete(id);
            res.status(204).send();
        } catch(e: any) {
            res.status(400).json({message: e.message});
        }
    }
}