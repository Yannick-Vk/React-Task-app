import {Priority, Status} from "~/GraphQL/generated";
import type {Option} from "~/lib/util";

export interface UpdateTaskDTO {
    name: string,
    status: Status,
    description: Option<string>,
    priority: Option<Priority>,
    dueDate: Option<Date>
}