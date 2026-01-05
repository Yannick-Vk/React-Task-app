import {useState} from "react";
import Button from "~/components/Button";
import Table from "~/components/Table";

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
                <Table
                    columns={[
                        {key: "id", header: "Id"},
                        {key: "name", header: "Name"},
                        {key: "age", header: "Age"}]}
                    data={[
                        {id: 1, name: "Alice", age: 30},
                        {id: 2, name: "Bob", age: 25},
                        {id: 3, name: "Charlie", age: 35},
                        {id: 4, name: "Alice", age: 20},
                        {id: 5, name: "Bob", age: 39},
                        {id: 6, name: "Charlie", age: 51},
                    ]}/>
            </div>
        </main>
    );
}
