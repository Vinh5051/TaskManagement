import { BaseEntity } from 'typeorm';
import { TaskStatus } from './task-status.enum';
export declare class Task extends BaseEntity {
    id: number;
    tittle: string;
    description: string;
    status: TaskStatus;
}
