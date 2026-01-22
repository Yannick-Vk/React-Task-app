import GenericSelectBox from "~/components/ui/GenericSelectBox";
import {twMerge} from "tailwind-merge";
import {StatusOptionsWithAll, type StatusWithAll} from "~/lib/util/Tasks";

export interface Props {
    className?: string;
    value: StatusWithAll;
    onChange: (value: StatusWithAll) => void;
    error: string[] | undefined;
}

export default function FilterStatusSelect(props: Props) {
    return (
        <>
            <GenericSelectBox name={"status"} value={props.value} label={"Status"}
                              onChange={(newValue) => props.onChange(newValue as StatusWithAll)}
                              className={twMerge(props.className)}
                              required={false} error={props.error} options={StatusOptionsWithAll}>

            </GenericSelectBox>
        </>
    );
}