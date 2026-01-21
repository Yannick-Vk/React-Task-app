import {Priority} from "~/GraphQL/generated";
import type {SelectOption} from "~/components/ui/GenericSelectBox";

export type PriorityWithAll = Priority | "ALL";

export const PriorityLabels: Record<Priority, string> = {
    [Priority.None]: "None",
    [Priority.Low]: "Low",
    [Priority.Medium]: "Medium",
    [Priority.High]: "High",
}

export const PriorityDisplayOrder: Priority[] = [Priority.None, Priority.Low, Priority.Medium, Priority.High];

export const PriorityOptions: SelectOption[] = PriorityDisplayOrder.map(p => ({
    label: PriorityLabels[p],
    value: p,
}));

export const PriorityOptionsWithAll: SelectOption[] = [...PriorityOptions, {label: "All", value: "ALL"}];