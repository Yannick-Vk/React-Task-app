import FilterPrioritySelect from "~/components/tasks/FilterPrioritySelect";
import {twMerge} from "tailwind-merge";
import type {PriorityWithAll} from "~/lib/util";

export interface Props {
    className?: string;
    value: PriorityWithAll;
    onChange: (value: PriorityWithAll) => void;
}

export default function TaskFilters(props: Props) {
    return (
        <>
            <div>
                {/* Task Filters Component */}
                <FilterPrioritySelect value={props.value} onChange={props.onChange} error={undefined}
                                      className={twMerge("bg-slate-800", props.className)}></FilterPrioritySelect>
            </div>
        </>
    );
}