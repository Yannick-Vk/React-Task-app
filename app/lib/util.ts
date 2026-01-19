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
export type Option<T> =
    | { some: true; value: T, toVanilla: () => T; }
    | { some: false; toVanilla: () => undefined; }
    ;

// Converts a value that may be undefined or null into an Option type
// Falsy values like 0, "" or false are considered valid Some values
export const fromUndefined = <T>(value: T | undefined | null): Option<T> => {
    return (value !== null && value !== undefined) ? Some(value) : None;
};

export const Some = <T>(value: T): Option<T> => ({
    some: true, value, toVanilla: () => value,
});
export const None: Option<never> = {
    some: false, toVanilla: () => undefined,
};

export const matchOption = <T, U>(
    option: Option<T> | T | undefined | null,
    onSome: (value: T) => U,
    onNone: () => U,
): U => {
    if (option && typeof option === "object" && 'some' in option) {
        return option.some ? onSome(option.value) : onNone();
    } else {
        return option ? onSome(option as T) : onNone();
    }
}

export const optionOrDefault = <T>(option: Option<T> | T | undefined | null, defaultValue: T): T => {
    return matchOption(option,
        (val) => val,
        () => defaultValue
    );
}

// Apply a function to the value inside the option if it exists
export const mapOption = <T, U>(option: Option<T>, fn: (value: T) => U): Option<U> => {
    return matchOption(option,
        (val) => Some(fn(val)),
        () => None
    );
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