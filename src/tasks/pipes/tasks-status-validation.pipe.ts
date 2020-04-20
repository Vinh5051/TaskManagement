import {PipeTransform, NotAcceptableException, ArgumentMetadata} from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatus = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE,
    ];
    transform(value: any) {
        value = value.toUpperCase();

        if (!this.isStatusInvalid(value)) {
            throw new NotAcceptableException(`"${value}" is an invalid status.`);
        }
        return value;
    }

    private isStatusInvalid(status: any) {
        const index = this.allowedStatus.indexOf(status);
        return index !== -1;
    }
}
