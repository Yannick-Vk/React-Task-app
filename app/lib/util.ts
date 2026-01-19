import {type Task} from "~/GraphQL/generated";
import {ZodError} from "zod";

export const compareTask = (a: Task | null | undefined, b: Task | null | undefined) => {
    if (!a || !b) return false;
    return a.id === b.id &&
        a.name === b.name &&
        a.status === b.status &&
        a.dueDate === b.dueDate &&
        a.priority === b.priority &&
        a.description === b.description;
}

export const truncateString = (str: string, maxLength: number): string => {
    return str.length > maxLength
        ? str.slice(0, maxLength) + "..."
        : str;
}

/// Result type
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

/// Option type
export type Option<T> = Some<T> | None;

interface OptionBase<T> {
    some: boolean;
    value: T | undefined;
    toVanilla: () => T | undefined;
    orDefault: (defaultValue: T) => T;
    map: <U>(fn: (val: T) => U) => Option<U>;

    matchMap<U>(matcher: {
        onSome: (val: T) => U,
        onNone: () => U,
    }): U;

    match<U>(onSome: (val: T) => U, onNone: () => U): U;
}

export interface Some<T> extends OptionBase<T> {
    some: true;
    value: T;
    toVanilla: () => T;
    orDefault: (defaultValue: T) => T;
    map: <U>(fn: (val: T) => U) => Some<U>;

    match<U>(onSome: (val: T) => U, onNone: () => U): U;
}

export interface None extends OptionBase<never> {
    some: false;
    value: undefined;
    toVanilla: () => undefined;
    orDefault: <T>(defaultValue: T) => T;
    map: <U>(fn: (val: never) => U) => None;

    match<U>(onSome: (val: never) => U, onNone: () => U): U;
}

export const Some = <T>(value: T): Some<T> => {
    return {
        some: true, value,
        toVanilla: () => value,
        orDefault: () => value,
        map: <U>(fn: (val: T) => U): Some<U> => Some(fn(value)),
        matchMap: <U>(matcher: {
            onSome: (val: T) => U;
            onNone: () => U;
        }): U => {
            return matcher.onSome(value);
        },
        match: <U>(onSome: (val: T) => U, onNone: () => U): U => {
            return onSome(value);
        }
    };
}

export const None = (): None => {
    return {
        some: false, value: undefined,
        toVanilla: () => undefined,
        orDefault: <T>(defaultValue: T) => defaultValue,
        map: <U>(fn: (val: never) => U): None => None(),
        matchMap: <U>(matcher: {
            onSome: (val: never) => U;
            onNone: () => U;
        }): U => {
            return matcher.onNone();
        },
        match: <U>(onSome: (val: never) => U, onNone: () => U): U => {
            return onNone();
        }
    };
}

// Converts a value that may be undefined or null into an Option type
// Falsy values like 0, "" or false are considered valid Some values
export const toOption = <T>(value: T | null | undefined): Option<T> => {
    return (value !== null && value !== undefined) ? Some(value as T) : None();
}

/// Errors
export const strToErr = <T = never>(str: string): Result<T, Error> =>
    Err(new Error(str))

export const toError = (err: unknown): Error => {
    return (err instanceof Error) ? err : new Error(String(err));
};

export const toErr = (err: unknown): Result<never, Error> => {
    return Err(toError(err));
};

// Transforms an error or zodError into a zodError
export const toZodError = (err: ZodError | Error, name: string): ZodError => {
    return err instanceof ZodError ? err : new ZodError([{
        code: "custom",
        path: [name],
        message: err.message || "An unknown error occurred."
    }]);
}

// Transforms an error or zodError into a some
export const toZodSome = (err: ZodError | Error, name: string): Option<ZodError> => {
    return (err instanceof ZodError) ? Some(err) : Some(toZodError(err, name));
}