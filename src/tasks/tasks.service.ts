import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import {GettasksFilterDto} from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { DeleteResult } from 'typeorm';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) {}

    async getTasks(getTaskFilterDto: GettasksFilterDto): Promise<Task[]> {
        return await this.taskRepository.getTasks(getTaskFilterDto);
    }

    async getTaskById(id: number): Promise<Task> {
        return await this.taskRepository.getTaskById(id);
    }

    async createTasks(createTaskDto: CreateTaskDto): Promise<Task> {
        return await this.taskRepository.createTasks(createTaskDto);
    }

    async removeTask(id: number): Promise<DeleteResult> {
        return await this.taskRepository.removeTask(id);
    }

    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
        return await this.taskRepository.updateTaskStatus(id, status);
    }

}
