import {useState} from "react";

export function Welcome() {

    const [clicks, setClicks] = useState(0);
    function onClick() {
        setClicks(clicks + 1);
    }

    return (
        <main className="flex items-center justify-center pt-16 pb-4">
            <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
                <h1>Hello!</h1>
                <p>Count: {clicks}</p>
                <button onClick={onClick}> Increase count </button>
            </div>
        </main>
    );
}
