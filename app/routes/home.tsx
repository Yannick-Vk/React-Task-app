import type {Route} from "./+types/home";
import {Welcome} from "~/welcome/welcome";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "React ToDo App"},
        {name: "description", content: "Welcome to my React ToDo-app!"},
    ];
}

export default function Home() {
    return <Welcome/>;
}
