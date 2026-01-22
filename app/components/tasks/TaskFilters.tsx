import FilterPrioritySelect from "~/components/tasks/FilterPrioritySelect";
import {twMerge} from "tailwind-merge";
import type {PriorityWithAll} from "~/lib/util";
import Button from "~/components/ui/Button";

export interface Props {
    className?: string;
    priorityValue: PriorityWithAll;
    onChangePriority: (value: PriorityWithAll) => void;
    onReset: () => void;
}

export default function TaskFilters(props: Props) {
    return (
        <>
            <div className={"flex flex-row justify-center gap-3"}>
                {/* Task Filters Component */}
                <FilterPrioritySelect value={props.priorityValue} onChange={props.onChangePriority} error={undefined}
                                      className={twMerge("bg-slate-800", props.className)} />

                <Button className={""} onClick={props.onReset}>Reset</Button>
            </div>
        </>
    );
}