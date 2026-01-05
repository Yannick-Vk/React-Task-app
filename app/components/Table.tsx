import React from "react";

export type Column<T> = {
    // key is used to read the value from the item when no accessor is provided
    key: keyof T | string;
    // header label to display in the table head
    header: string;
    // optional accessor to compute the cell value from the row item
    accessor?: (item: T) => React.ReactNode;
    // optional renderer receives the resolved cell value and the whole item
    render?: (value: any, item: T) => React.ReactNode;
    // optional classes
    headerClassName?: string;
    cellClassName?: string;
};

export interface Props<T> {
    columns: Column<T>[];
    // optional function to get a stable row key; falls back to item.id or index
    rowKey?: (item: T, index: number) => string | number;
    children?: React.ReactNode;
}

export default function Table<T extends Record<string, any>>(props: Props<T>) {
    const {columns, rowKey} = props;

    const getRowKey = (item: T, index: number) => {
        if (rowKey) return rowKey(item, index);
        // try id if present
        if ((item as any).id !== undefined) return (item as any).id;
        return index;
    };

    return (
        <>
            <table className="table table-auto w-full border-2 border-slate-600">
                <thead className="table-header-group bg-gray-400 text-black font-bold text-center">
                <tr>
                    {columns.map((col) => (
                        <th key={String(col.key)} className={"p-3 " + (col.headerClassName ?? "")}>{col.header}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {props.children}
                </tbody>
            </table>
        </>
    );
}