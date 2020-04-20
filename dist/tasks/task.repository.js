"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const task_entity_1 = require("./task.entity");
const task_status_enum_1 = require("./task-status.enum");
const common_1 = require("@nestjs/common");
let TaskRepository = class TaskRepository extends typeorm_1.Repository {
    async getTasks(getTasksFilterDto) {
        const { status, search } = getTasksFilterDto;
        const query = await this.createQueryBuilder('task');
        if (status) {
            query.andWhere('task.status LIKE :status', { status });
        }
        if (search) {
            query.orWhere('task.tittle LIKE :search OR task.description LIKE :search', { search: `%${search}%` });
        }
        const tasks = await query.getMany();
        return tasks;
    }
    async getTaskById(id) {
        const found = await this.findOne(id);
        if (!found) {
            throw new common_1.NotFoundException(`Task with ID "${id}" was not found!`);
        }
        return found;
    }
    async createTasks(createTaskDto) {
        const { title, description } = createTaskDto;
        const task = new task_entity_1.Task();
        task.tittle = title;
        task.description = description;
        task.status = task_status_enum_1.TaskStatus.OPEN;
        return await task.save();
    }
    async updateTaskStatus(id, status) {
        const task = await this.getTaskById(id);
        task.status = status;
        task.save();
        return task;
    }
    async removeTask(id) {
        const task = await this.createQueryBuilder('task')
            .delete()
            .from(task_entity_1.Task)
            .where('task.id = :id', { id })
            .execute();
        if (task.affected === 0) {
            throw new common_1.NotFoundException(`Task with ID "${id}" was not found!`);
        }
        return task;
    }
};
TaskRepository = __decorate([
    typeorm_1.EntityRepository(task_entity_1.Task)
], TaskRepository);
exports.TaskRepository = TaskRepository;
//# sourceMappingURL=task.repository.js.map