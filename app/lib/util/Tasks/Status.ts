import type {Props} from "~/components/tasks/TaskPrioritySelectBox";
import {Status} from "~/GraphQL/generated";
import type {SelectOption} from "~/components/ui/GenericSelectBox";

export type StatusWithAll = Status | "ALL";

export const StatusLabels: Record<Status, string> = {
    [Status.Ready]: "Ready",
    [Status.InProgress]: "In Progress",
    [Status.Done]: "Done",
}

export const statusDisplayOrder: Status[] = [Status.Ready, Status.InProgress, Status.Done];

export const StatusOptions: SelectOption[] = statusDisplayOrder.map(option => ({
    label: StatusLabels[option],
    value: option,
}));

export const StatusOptionsWithAll: SelectOption[] = [...StatusOptions, {label: "All", value: "ALL"}];