import {TaskType} from "../../types/Task";

export interface Props {
}

export default function TaskTypesSelectBox(props: Props) {


    return (
        <>
            <select>
                {Object.keys(TaskType).map(
                    (key) => (<option key={key} value={key}>{TaskType[key as keyof typeof TaskType]}</option>)
                )}
            </select>
        </>
    );
}