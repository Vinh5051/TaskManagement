import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GettasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { DeleteResult } from 'typeorm';
export declare class TasksController {
    private tasksService;
    constructor(tasksService: TasksService);
    getTasks(filterDto: GettasksFilterDto): Promise<Task[]>;
    createTask(createTaskDto: CreateTaskDto): Promise<Task>;
    getTaskById(id: number): Promise<Task>;
    removeTask(id: number): Promise<DeleteResult>;
    updateTask(id: number, status: TaskStatus): Promise<Task>;
}
