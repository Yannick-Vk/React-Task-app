import {Priority, Status} from "~/GraphQL/generated";
import type {Option} from "~/lib/util";

export interface UpdateTaskDTO {
    name: Option<string>,
    status: Option<Status>,
    description: Option<string>,
    priority: Option<Priority>,
    dueDate: Option<Date>,
}