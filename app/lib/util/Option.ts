export type Option<T> = Some<T> | None;

interface OptionBase<T> {
    isSome: boolean;
    isNone: boolean;
    value: T | undefined;
    toVanilla: () => T | undefined;
    orDefault: (defaultValue: T) => T;
    map: <U>(fn: (val: T) => U) => Option<U>;
    expect: (message: string) => T;
    unwrapOrElse: (fn: () => T) => T;

    matchMap<U>(matcher: {
        onSome: (val: T) => U,
        onNone: () => U,
    }): U;

    match: <U>(onSome: (val: T) => U, onNone: () => U) => U;
}

export interface Some<T> extends OptionBase<T> {
    isSome: true;
    value: T;
    toVanilla: () => T;
    orDefault: (defaultValue: T) => T;
    map: <U>(fn: (val: T) => U) => Some<U>;

    match<U>(onSome: (val: T) => U, onNone: () => U): U;
}

export interface None extends OptionBase<never> {
    isSome: false;
    value: undefined;
    toVanilla: () => undefined;
    orDefault: <T>(defaultValue: T) => T;
    map: <U>(fn: (val: never) => U) => None;

    match<U>(onSome: (val: never) => U, onNone: () => U): U;
}

export const Some = <T>(value: T): Some<T> => {
    return {
        isSome: true, value, isNone: false,
        toVanilla: () => value,
        orDefault: () => value,
        map: <U>(fn: (val: T) => U): Some<U> => Some(fn(value)),
        matchMap: <U>(matcher: {
            onSome: (val: T) => U;
            onNone: () => U;
        }): U => {
            return matcher.onSome(value);
        },
        match: <U>(onSome: (val: T) => U, _onNone: () => U): U => {
            return onSome(value);
        },
        expect: (_message: string) => value,
        unwrapOrElse: (_fn: () => T) => value,
    };
}

export const None = (): None => {
    return {
        isSome: false, value: undefined, isNone: true,
        toVanilla: () => undefined,
        orDefault: <T>(defaultValue: T) => defaultValue,
        map: <U>(_fn: (val: never) => U): None => None(),
        matchMap: <U>(matcher: {
            onSome: (val: never) => U;
            onNone: () => U;
        }): U => {
            return matcher.onNone();
        },
        match: <U>(_onSome: (val: never) => U, onNone: () => U): U => {
            return onNone();
        },
        expect: message => {throw new Error(message);},
        unwrapOrElse: (fn: () => never) => fn(),
    };
}

// Converts a value that may be undefined or null into an Option type
// Falsy values like 0, "" or false are considered valid Some values
export const toOption = <T>(value: T | Option<T> | null | undefined): Option<T> => {

    if (value && typeof value === 'object' && 'isSome' in value) {
        return value as Option<T>;
    }

    return (value !== null && value !== undefined) ? Some(value as T) : None();
}