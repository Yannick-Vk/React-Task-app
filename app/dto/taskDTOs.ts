import {Priority, Status} from "~/GraphQL/generated";
import type {Option} from "~/lib/util";
import type {DateTime} from "luxon";

export interface UpdateTaskDTO {
    id: string;
    name: Option<string>,
    status: Option<Status>,
    description: Option<string>,
    priority: Option<Priority>,
    dueDate: Option<DateTime>,
}

export interface AddTaskDTO {
    name: string,
    status: Option<Status>,
    description: Option<string>,
    priority: Option<Priority>,
    dueDate: Option<DateTime>,
}