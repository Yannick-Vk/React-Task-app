import type {Task} from "~/GraphQL/generated";
import type {UpdateTaskDTO} from "~/dto/taskDTOs";
import {type Option} from "~/lib/util/Option";
import {DateTime} from "luxon";

const dateTimeEqual = (dateA: any, dateB: any): boolean => {
    const a = getVanilla(dateA);
    const b = getVanilla(dateB);

    if (a === b) return true;
    if (a === null || a === undefined) return false;
    if (b === null || b === undefined) return false;

    const dtA = a instanceof DateTime ? a : DateTime.fromISO(a as string);
    const dtB = b instanceof DateTime ? b : DateTime.fromISO(b as string);

    if (!dtA.isValid || !dtB.isValid) return false;

    return dtA.equals(dtB);
}

const getVanilla = <T>(field: T | Option<T> | null | undefined): T | null | undefined => {
    return field && typeof field === 'object' && 'toVanilla' in field
        ? field.toVanilla()
        : field as T | null | undefined;
}

export const compareTask = (a: Task | UpdateTaskDTO | null | undefined, b: Task | UpdateTaskDTO | null | undefined) => {
    if (!a || !b) return false;

    const A = {
        id: getVanilla(a.id),
        name: getVanilla(a.name),
        status: getVanilla(a.status),
        dueDate: getVanilla(a.dueDate),
        priority: getVanilla(a.priority),
        description: getVanilla(a.description),
    };

    const B = {
        id: getVanilla(b.id),
        name: getVanilla(b.name),
        status: getVanilla(b.status),
        dueDate: getVanilla(b.dueDate),
        priority: getVanilla(b.priority),
        description: getVanilla(b.description),
    };

    return A.id === B.id
        && A.name === B.name
        && A.status === B.status
        && A.priority === B.priority
        && A.description === B.description
        && dateTimeEqual(A.dueDate, B.dueDate);
}