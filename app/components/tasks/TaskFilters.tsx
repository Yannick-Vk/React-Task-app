import FilterPrioritySelect from "~/components/tasks/FilterPrioritySelect";
import {Priority} from "~/GraphQL/generated";
import {twMerge} from "tailwind-merge";
import {useState} from "react";

export interface Props {
    className?: string;
}

export default function TaskFilters(props: Props) {
    const [selectedPriority, setSelectedPriority] = useState<Priority | "ALL">(Priority.None);

    const handlePriorityChange = (value: Priority | "ALL") => {
        setSelectedPriority(value);
    }

    return (
        <>
            <div>
                {/* Task Filters Component */}
                <FilterPrioritySelect value={selectedPriority} onChange={handlePriorityChange} error={undefined}
                                      className={twMerge("bg-slate-800", props.className)}></FilterPrioritySelect>
            </div>
        </>
    );
}