import {Status, type Task} from "~/GraphQL/generated";

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

export const compareTask = (a: Task | null | undefined, b: Task | null | undefined) => {
    if (!a || !b) return false;
    return a.name === b.name && a.status === b.status;
}

export type Result<T, E> = { success: true, data: T } | { success: false, error: E };

export const Ok = <T, E = never>(data: T): Result<T, E> => ({
    success: true, data,
});

export const Err = <E, T = never>(error: E): Result<T, E> => ({
    success: false, error,
});
