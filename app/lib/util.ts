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

export const matchResult = <T, E, U>(
    result: Result<T, E>,
    onOk: (data: T) => U,
    onErr: (error: E) => U,
): U => {
    return result.success ? onOk(result.data) : onErr(result.error);
};

export type Option<T> =
    | { some: true; value: T }
    | { some: false; }

export const Some = <T>(value: T): Option<T> => ({
    some: true, value,
});
export const None: Option<never> = {some: false};

export const matchOption = <T, U>(
    option: Option<T>,
    onSome: (value: T) => U,
    onNone: () => U,
): U => {
    return option.some ? onSome(option.value) : onNone();
}