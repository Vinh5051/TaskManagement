import { TaskStatus } from './task-status.enum';
import { GettasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { DeleteResult } from 'typeorm';
export declare class TasksService {
    private taskRepository;
    constructor(taskRepository: TaskRepository);
    getTasks(getTaskFilterDto: GettasksFilterDto): Promise<Task[]>;
    getTaskById(id: number): Promise<Task>;
    createTasks(createTaskDto: CreateTaskDto): Promise<Task>;
    removeTask(id: number): Promise<DeleteResult>;
    updateTaskStatus(id: number, status: TaskStatus): Promise<Task>;
}
