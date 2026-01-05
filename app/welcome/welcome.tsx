import {useState} from "react";
import Button from "~/components/Button";

export function Welcome() {

    const [clicks, setClicks] = useState(0);
    const increment = () => setClicks(clicks + 1);
    const decrement = () => {
        if (clicks > 0) setClicks(clicks - 1)
    };

    return (
        <main className="flex items-center justify-center pt-16 pb-4">
            <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
                <h1>React counter example!</h1>
                <p className={"text-xl"}>Count: {clicks}</p>
                <div className="flex flex-row items-center gap-16 min-h-0">
                    <Button onClick={increment} name="Increase count"/>
                    <Button onClick={decrement} name="Decrease count"/>
                </div>
            </div>
        </main>
    );
}
