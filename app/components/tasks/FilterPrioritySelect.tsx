import GenericSelectBox from "~/components/ui/GenericSelectBox";
import {twMerge} from "tailwind-merge";
import {PriorityOptionsWithAll, type PriorityWithAll} from "~/lib/util/Tasks";

export interface Props {
    className?: string;
    value: PriorityWithAll;
    onChange: (value: PriorityWithAll) => void;
    error: string[] | undefined;
}

export default function FilterPrioritySelect(props: Props) {
    return (
        <>
            <GenericSelectBox name={"priority"} value={props.value} label={"Priority"}
                              onChange={(newValue) => props.onChange(newValue as PriorityWithAll)}
                              className={twMerge(props.className)}
                              required={false} error={props.error} options={PriorityOptionsWithAll}>

            </GenericSelectBox>
        </>
    );
}