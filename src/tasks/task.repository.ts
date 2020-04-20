import {Repository, EntityRepository, DeleteResult} from 'typeorm';
import {Task} from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import {TaskStatus} from './task-status.enum';
import { NotFoundException } from '@nestjs/common';
import { GettasksFilterDto } from './dto/get-tasks-filter.dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async getTasks(getTasksFilterDto: GettasksFilterDto): Promise<Task[]> {
        const {status, search} = getTasksFilterDto;

        const query = await this.createQueryBuilder('task');

        if (status) {
            query.andWhere('task.status LIKE :status', {status});
        }

        if (search) {
            query.orWhere('task.tittle LIKE :search OR task.description LIKE :search', {search: `%${search}%`});
        }

        const tasks = await query.getMany();
        return tasks;
    }

    async getTaskById(id: number): Promise<Task> {
        const found = await this.findOne(id);
        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" was not found!`);
        }
        return found;
    }

    async createTasks(createTaskDto: CreateTaskDto): Promise<Task> {
        const {title, description} = createTaskDto;
        const task = new Task();
        task.tittle = title;
        task.description = description;
        task.status = TaskStatus.OPEN;

        return await task.save();
    }

    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
        // return await this.createQueryBuilder('task')
        //                     .update('task.status')
        //                     .set(status)
        //                     .where('task.id LIKE :keyWord', {keyWord: id})
        //                     .execute();
        const task = await this.getTaskById(id);
        task.status = status;
        task.save();
        return task;
    }

    async removeTask(id: number): Promise<DeleteResult> {
        const task = await this.createQueryBuilder('task')
                            .delete()
                            .from(Task)
                            .where('task.id = :id', {id})
                            .execute();
        if (task.affected === 0) {
                throw new NotFoundException(`Task with ID "${id}" was not found!`);
        }

        return task;
    }

}
