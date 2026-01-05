export default interface Task {
    id: number;
    title: string;
    status: TaskType;
}

export enum TaskType {
    READY = "ready",
    IN_PROGRESS = "in progress",
    COMPLETED = "completed"
}