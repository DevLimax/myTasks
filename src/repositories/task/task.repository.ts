import type Task from "../../models/entities/task";

export interface TaskRepository {
    save(task: Task): Promise<Task>;
    list(): Promise<Task[]>;
    find(id: string): Promise<Task | null>;
    update(id: string, task: Task): Promise<Task>;
    delete(id: string): Promise<void>;
}