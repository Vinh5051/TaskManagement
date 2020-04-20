"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const task_status_enum_1 = require("../task-status.enum");
class TaskStatusValidationPipe {
    constructor() {
        this.allowedStatus = [
            task_status_enum_1.TaskStatus.OPEN,
            task_status_enum_1.TaskStatus.IN_PROGRESS,
            task_status_enum_1.TaskStatus.DONE,
        ];
    }
    transform(value) {
        value = value.toUpperCase();
        if (!this.isStatusInvalid(value)) {
            throw new common_1.NotAcceptableException(`"${value}" is an invalid status.`);
        }
        return value;
    }
    isStatusInvalid(status) {
        const index = this.allowedStatus.indexOf(status);
        return index !== -1;
    }
}
exports.TaskStatusValidationPipe = TaskStatusValidationPipe;
//# sourceMappingURL=tasks-status-validation.pipe.js.map