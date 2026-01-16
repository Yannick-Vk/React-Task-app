import Table from "~/components/ui/Table";
import Button from "~/components/ui/Button";
import {type Maybe, Priority, Status, type Task} from "~/GraphQL/generated"
import React from "react";
import TaskStatusSelectBox from "~/components/tasks/TaskStatusSelectBox";
import Modal from "~/components/ui/Modal";
import {matchOption, type Result, truncateString} from "~/lib/util";
import {useEditTaskModal} from "~/hooks/useEditTaskModal";
import {DateTime} from "luxon"
import Badge, {BadgeVariant} from "~/components/ui/Badge";
import Tooltip from "~/components/ui/Tooltip";
import EditTask from "~/components/tasks/EditTask";

export interface Props {
    data: Task[];
    removeTask: (id: string) => void;
    changeStatus: (id: string, status: Status) => void;
    updateTask: (task: Task) => Promise<Result<Task, Error>>;
}

export default function TaskTable(props: Props) {
    const {
        isModalOpen,
        selectedTask,
        error,
        originalTask,
        openModal,
        closeModal,
        onNameChange,
        onStatusChange,
        reset,
        updateTask,
    } = useEditTaskModal({
        updateTaskCallback: props.updateTask
    }); // Pass the update function into the hook

    const mapPriorityToVariant = (priority: Priority): BadgeVariant => {
        switch (priority) {
            case Priority.High:
                return BadgeVariant.error;
            case Priority.Low:
                return BadgeVariant.gray;
            case Priority.Medium:
                return BadgeVariant.warning;
            case Priority.None:
                return BadgeVariant.gray;
        }
    }

    const dateTooltip = (optionalDate: string | undefined): React.ReactNode => {
        return matchOption(optionalDate,
            (date) => (
                <Tooltip content={DateTime.fromISO(date).toLocaleString()}>
                    {DateTime.fromISO(date).toRelative()}
                </Tooltip>
            ),
            () => (<span className="cursor-default">-</span>),
        );
    }

    const descriptionTooltip = (optionalDescription: Maybe<string> | undefined): React.ReactNode => {
        return matchOption(optionalDescription,
            (desc) => {
                const truncated = truncateString(desc, 40);

                return (
                    <Tooltip content={desc} className="text-lg">
                        <span className="cursor-default">{truncated}</span>
                    </Tooltip>
                )
            },
            () => (<span className="cursor-default">-</span>),
        );
    }

    return (
        <>
            <Table columns={[
                {key: "title", header: "Title"},
                {key: "status", header: "Status"},
                {key: "priority", header: "Priority"},
                {key: "description", header: "Description"},
                {key: "due-date", header: "Due Date"},
                {key: "created", header: "Created at"},
                {key: "updated", header: "Last updated at"},
                {key: "actions", header: "Actions"},
            ]}>
                {props.data.map((item) => (
                    <tr className={"bg-gray-200 even:bg-gray-300 text-black hover:bg-pink-200"} key={item.id}>
                        <td className={"p-3 text-center"}> {item.name} </td>
                        <td className={"p-3 text-center"}>
                            <TaskStatusSelectBox name={item.name} value={item.status} className={"bg-slate-200"}
                                                 error={undefined}
                                                 onChange={(e) => props.changeStatus(item.id, e)}></TaskStatusSelectBox>
                        </td>
                        <td className={"p-3 text-center"}><Badge
                            variant={mapPriorityToVariant(item.priority)}>{item.priority}</Badge></td>
                        <td className={"p-3 text-center"}>
                            {descriptionTooltip(item.description)}
                        </td>
                        <td className={"p-3 text-center"}>
                            {dateTooltip(item.dueDate)}
                        </td>
                        <td className={"p-3 text-center"}>
                            {dateTooltip(item.created)}
                        </td>
                        <td className={"p-3 text-center"}>
                            {dateTooltip(item.updated)}
                        </td>
                        <td className={"flex flex-row gap-3 justify-center p-3 text-center"}>
                            <Button onClick={() => props.removeTask(item.id)}>Remove task</Button>
                            <Button onClick={() => openModal(item)}>Edit task</Button>
                        </td>
                    </tr>
                ))}
            </Table>
            <Modal title={`Edit task: '${originalTask?.current?.name}'`} isOpen={isModalOpen} onClose={closeModal}>
                <EditTask error={error} selectedTask={selectedTask} onNameChange={onNameChange}
                          onStatusChange={onStatusChange}
                          updateTask={updateTask} reset={reset} />
            </Modal>
        </>
    );
}