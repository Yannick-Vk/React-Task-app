import {ZodError} from "zod";
import {Err, type Result} from "./Result";
import {type Option, Some} from "~/lib/util/Option";

export const strToErr = <T = never>(str: string): Result<T, Error> =>
    Err(new Error(str))

export const toError = (err: unknown): Error => {
    return (err instanceof Error) ? err : new Error(String(err));
};

export const toErr = <T>(err: unknown): Result<T, Error> => {
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