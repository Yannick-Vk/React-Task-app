import type {Task} from "~/GraphQL/generated";

export const compareTask = (a: Task | null | undefined, b: Task | null | undefined) => {
    if (!a || !b) return false;
    return a.id === b.id &&
        a.name === b.name &&
        a.status === b.status &&
        a.dueDate === b.dueDate &&
        a.priority === b.priority &&
        a.description === b.description;
}