import React from "react";

export type Column<T> = {
    // key is used to read the value from the item when no accessor is provided
    key: keyof T | string;
    // header label to display in the table head
    header: string;
    // optional classes
    headerClassName?: string;
    cellClassName?: string;
};

export interface Props<T> {
    columns: Column<T>[];
    children?: React.ReactNode;
}

export default function Table<T extends Record<string, any>>(props: Props<T>) {
    const {columns, children} = props;

    return (
        <table className="table table-auto w-full border-2 border-slate-600">
            <thead className="table-header-group bg-gray-400 text-black font-bold text-center">
            <tr>
                {columns.map((col) => (
                    <th key={String(col.key)} className={"p-3 " + (col.headerClassName ?? "")}>{col.header}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {children}
            </tbody>
        </table>
    );
}