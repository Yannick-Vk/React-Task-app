export interface Task {
    id: number;
    name: string;
    status: TaskType;
}

export enum TaskType {
    READY = "Ready",
    IN_PROGRESS = "In Progress",
    COMPLETED = "Completed"
}