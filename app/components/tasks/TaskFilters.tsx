import FilterPrioritySelect from "~/components/tasks/FilterPrioritySelect";
import {twMerge} from "tailwind-merge";
import type {PriorityWithAll} from "~/lib/util";
import Button from "~/components/ui/Button";

export type Filter<T> = {
    value: T;
    onChange: (value: T) => void;
}

export interface Props {
    className?: string;
    priorityFilter: Filter<PriorityWithAll>;
    onReset: () => void;
}

export default function TaskFilters(props: Props) {
    return (
        <>
            <div className={"flex flex-row justify-center gap-3"}>
                {/* Task Filters Component */}
                <FilterPrioritySelect value={props.priorityFilter.value} onChange={props.priorityFilter.onChange}
                                      error={undefined}
                                      className={twMerge("bg-slate-800", props.className)} />

                <Button className={""} onClick={props.onReset}>Reset</Button>
            </div>
        </>
    );
}