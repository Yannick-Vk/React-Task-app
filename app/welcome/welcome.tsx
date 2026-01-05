import {useState} from "react";

export function Welcome() {

    const [clicks, setClicks] = useState(0);
    const increment = () => setClicks(clicks + 1);
    const decrement = () => {
        if (clicks > 0) setClicks(clicks - 1)
    };

    return (
        <main className="flex items-center justify-center pt-16 pb-4">
            <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
                <h1>Hello!</h1>
                <p>Count: {clicks}</p>
                <button onClick={increment} className={"border-2 border-amber-200"}>Increase count</button>
                <button onClick={decrement} className={"border-2 border-cyan-300"}>Decrease count</button>
            </div>
        </main>
    );
}
