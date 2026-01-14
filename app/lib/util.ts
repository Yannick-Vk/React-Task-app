import {Status} from "~/GraphQL/generated";

export function MapStatusEnum(value: Status): string {
    switch (value) {
        case Status.Done:
            return "Done";
        case Status.InProgress:
            return "In Progress";
        case Status.Ready:
            return "Ready";
        default:
            return value;
    }
}

export type Result<T, E> = { success: true, data: T } | { success: false, error: E };