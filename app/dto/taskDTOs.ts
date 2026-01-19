import {Priority, Status} from "~/GraphQL/generated";
import {None, type Option, Some} from "~/lib/util";
import type {DateTime} from "luxon";

export interface UpdateTaskDTO {
    id: string;
    name: Option<string>,
    status: Option<Status>,
    description: Option<string>,
    priority: Option<Priority>,
    dueDate: Option<DateTime>,
}

export interface UpdateStatusDTO {
    id: string;
    status: Status;
}

export const statusUpdateToFullDTO = (task: UpdateStatusDTO): UpdateTaskDTO => {
    return {
        id: task.id,
        name: None(),
        status: Some(task.status),
        description: None(),
        priority: None(),
        dueDate: None(),
    }
}

export interface AddTaskDTO {
    name: string,
    status: Option<Status>,
    description: Option<string>,
    priority: Option<Priority>,
    dueDate: Option<DateTime>,
}