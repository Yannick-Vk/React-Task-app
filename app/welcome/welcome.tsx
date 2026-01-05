import {useState} from "react";
import Button from "~/components/Button";
import ToDoTable from "~/components/ToDoTable";
import {TodoType} from "../../types/Todo";

export function Welcome() {

    const [clicks, setClicks] = useState(0);
    const increment = () => setClicks(clicks + 1);
    const decrement = () => {
        if (clicks > 0) setClicks(clicks - 1)
    };

    return (
        <main className="w-11/12 m-auto flex items-center justify-center pt-16 pb-4">
            <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
                <h1>React counter example!</h1>
                <p className={"text-xl"}>Count: {clicks}</p>
                <div className="flex flex-row items-center gap-16 min-h-0">
                    <Button onClick={increment} name="Increase count"/>
                    <Button onClick={decrement} name="Decrease count"/>
                </div>
                <ToDoTable
                    data={[
                        {id: 1, title: "Alice", status: TodoType.READY},
                        {id: 2, title: "Bob", status: TodoType.READY},
                        {id: 3, title: "Charlie", status: TodoType.READY},
                        {id: 4, title: "Alice", status: TodoType.READY},
                        {id: 5, title: "Bob", status: TodoType.READY},
                        {id: 6, title: "Charlie", status: TodoType.READY},
                    ]}/>
            </div>
        </main>
    );
}
