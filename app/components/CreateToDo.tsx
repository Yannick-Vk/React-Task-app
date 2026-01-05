import React from "react";
import Button from "~/components/Button";

export interface Props {
}

export default function CreateToDo(props: Props) {

    const [name, setName] = React.useState("");
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log(name);
    }

    const handleNameChange = (e: { target: { value: React.SetStateAction<string>; }; }) => setName(e.target.value);

    return (
        <>
            <form>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">ToDo Name</label>
                <input onChange={handleNameChange} type="text" name="name" id="name"
                       className={"rounded-sm border border-gray-300 text-gray-300 p-3"}/>
                <Button onClick={handleSubmit} name={"New ToDo"} className="block mt-3"></Button>
            </form>
        </>
    );
}