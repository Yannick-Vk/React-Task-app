export default interface Todo {
    id: number;
    title: string;
    status: TodoType;
}

export enum TodoType {
    READY = "ready",
    IN_PROGRESS = "in progress",
    COMPLETED = "completed"
}