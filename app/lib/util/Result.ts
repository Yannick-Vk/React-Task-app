export type Result<T, E> = OkResult<T, E> | ErrResult<T, E>;

interface ResultBase<T, E> {
    isOk: boolean;
    isErr: boolean;
    match: <U>(onOk: (data: T) => U, onErr: (error: E) => U) => U;
    mapOk: <U>(fn: (data: T) => U) => Result<U, E>;
    mapErr: <F>(fn: (error: E) => F) => Result<T, F>;
    andThen: <U>(fn: (data: T) => Result<U, E>) => Result<U, E>;
}

interface OkResult<T, E> extends ResultBase<T, E> {
    isOk: true;
    isErr: false;
    data: T;
    expect: (message: string) => T;
    unwrapOrElse: (fn: () => T) => T;
}

interface ErrResult<T, E> extends ResultBase<T, E> {
    isOk: false;
    isErr: true;
    error: E;
}

export const Ok = <T, E = never>(data: T): Result<T, E> => {
    return {
        isOk: true,
        isErr: false,
        data,
        match: <U>(onOk: (data: T) => U, onErr: (error: E) => U): U => {
            return onOk(data);
        },
        mapOk: <U>(fn: (data: T) => U): Result<U, E> => {
            return Ok(fn(data));
        },
        mapErr: <F>(fn: (error: E) => F): Result<T, F> => {
            return Ok(data);
        },
        andThen: <U>(fn: (data: T) => Result<U, E>): Result<U, E> => {
            return fn(data);
        },
        expect: (message: string): T => {
            return data;
        },
        unwrapOrElse: (fn: () => T): T => {
            return data;
        },
    }
};

export const Err = <E, T = never>(error: E): Result<T, E> => {
    return {
        isOk: false,
        isErr: true,
        error,
        match: <U>(onOk: (data: T) => U, onErr: (error: E) => U): U => {
            return onErr(error);
        },
        mapOk: <U>(fn: (data: T) => U): Result<U, E> => {
            return Err(error);
        },
        mapErr: <F>(fn: (error: E) => F): Result<T, F> => {
            return Err(fn(error));
        },
        andThen: <U>(fn: (data: T) => Result<U, E>): Result<U, E> => {
            return Err(error);
        },
    }
};