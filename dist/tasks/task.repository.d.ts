import { Repository, DeleteResult } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GettasksFilterDto } from './dto/get-tasks-filter.dto';
export declare class TaskRepository extends Repository<Task> {
    getTasks(getTasksFilterDto: GettasksFilterDto): Promise<Task[]>;
    getTaskById(id: number): Promise<Task>;
    createTasks(createTaskDto: CreateTaskDto): Promise<Task>;
    updateTaskStatus(id: number, status: TaskStatus): Promise<Task>;
    removeTask(id: number): Promise<DeleteResult>;
}
