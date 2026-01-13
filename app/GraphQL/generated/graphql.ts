/* eslint-disable */
import type {TypedDocumentNode as DocumentNode} from '@graphql-typed-document-node/core';

export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string; output: string; }
    String: { input: string; output: string; }
    Boolean: { input: boolean; output: boolean; }
    Int: { input: number; output: number; }
    Float: { input: number; output: number; }
    UUID: { input: any; output: any; }
};

export type Mutation = {
    __typename?: 'Mutation';
    addTask: Task;
    removeTask?: Maybe<Task>;
    updateTask?: Maybe<Task>;
};


export type MutationAddTaskArgs = {
    name: Scalars['String']['input'];
    status?: InputMaybe<Status>;
};


export type MutationRemoveTaskArgs = {
    id: Scalars['UUID']['input'];
};


export type MutationUpdateTaskArgs = {
    updatedTask: UpdateTaskDtoInput;
};

export type Query = {
    __typename?: 'Query';
    tasks: Array<Task>;
};

export enum Status {
    Done = 'DONE',
    InProgress = 'IN_PROGRESS',
    Ready = 'READY'
}

export type Task = {
    __typename?: 'Task';
    id: Scalars['UUID']['output'];
    name: Scalars['String']['output'];
    status: Status;
};

export type UpdateTaskDtoInput = {
    id: Scalars['UUID']['input'];
    name?: InputMaybe<Scalars['String']['input']>;
    status?: InputMaybe<Status>;
};

export type AddTaskMutationVariables = Exact<{
    name: Scalars['String']['input'];
    status?: InputMaybe<Status>;
}>;


export type AddTaskMutation = {
    __typename?: 'Mutation',
    addTask: { __typename?: 'Task', id: any, name: string, status: Status }
};

export type DeleteTaskMutationVariables = Exact<{
    id: Scalars['UUID']['input'];
}>;


export type DeleteTaskMutation = {
    __typename?: 'Mutation',
    removeTask?: { __typename?: 'Task', id: any, name: string, status: Status } | null
};

export type GetTasksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTasksQuery = {
    __typename?: 'Query',
    tasks: Array<{ __typename?: 'Task', id: any, name: string, status: Status }>
};


export const AddTaskDocument = {
    "kind": "Document", "definitions": [{
        "kind": "OperationDefinition",
        "operation": "mutation",
        "name": {"kind": "Name", "value": "AddTask"},
        "variableDefinitions": [{
            "kind": "VariableDefinition",
            "variable": {"kind": "Variable", "name": {"kind": "Name", "value": "name"}},
            "type": {"kind": "NonNullType", "type": {"kind": "NamedType", "name": {"kind": "Name", "value": "String"}}}
        }, {
            "kind": "VariableDefinition",
            "variable": {"kind": "Variable", "name": {"kind": "Name", "value": "status"}},
            "type": {"kind": "NamedType", "name": {"kind": "Name", "value": "Status"}}
        }],
        "selectionSet": {
            "kind": "SelectionSet",
            "selections": [{
                "kind": "Field",
                "name": {"kind": "Name", "value": "addTask"},
                "arguments": [{
                    "kind": "Argument",
                    "name": {"kind": "Name", "value": "name"},
                    "value": {"kind": "Variable", "name": {"kind": "Name", "value": "name"}}
                }, {
                    "kind": "Argument",
                    "name": {"kind": "Name", "value": "status"},
                    "value": {"kind": "Variable", "name": {"kind": "Name", "value": "status"}}
                }],
                "selectionSet": {
                    "kind": "SelectionSet",
                    "selections": [{"kind": "Field", "name": {"kind": "Name", "value": "id"}}, {
                        "kind": "Field",
                        "name": {"kind": "Name", "value": "name"}
                    }, {"kind": "Field", "name": {"kind": "Name", "value": "status"}}]
                }
            }]
        }
    }]
} as unknown as DocumentNode<AddTaskMutation, AddTaskMutationVariables>;
export const DeleteTaskDocument = {
    "kind": "Document",
    "definitions": [{
        "kind": "OperationDefinition",
        "operation": "mutation",
        "name": {"kind": "Name", "value": "deleteTask"},
        "variableDefinitions": [{
            "kind": "VariableDefinition",
            "variable": {"kind": "Variable", "name": {"kind": "Name", "value": "id"}},
            "type": {"kind": "NonNullType", "type": {"kind": "NamedType", "name": {"kind": "Name", "value": "UUID"}}}
        }],
        "selectionSet": {
            "kind": "SelectionSet",
            "selections": [{
                "kind": "Field",
                "name": {"kind": "Name", "value": "removeTask"},
                "arguments": [{
                    "kind": "Argument",
                    "name": {"kind": "Name", "value": "id"},
                    "value": {"kind": "Variable", "name": {"kind": "Name", "value": "id"}}
                }],
                "selectionSet": {
                    "kind": "SelectionSet",
                    "selections": [{"kind": "Field", "name": {"kind": "Name", "value": "id"}}, {
                        "kind": "Field",
                        "name": {"kind": "Name", "value": "name"}
                    }, {"kind": "Field", "name": {"kind": "Name", "value": "status"}}]
                }
            }]
        }
    }]
} as unknown as DocumentNode<DeleteTaskMutation, DeleteTaskMutationVariables>;
export const GetTasksDocument = {
    "kind": "Document",
    "definitions": [{
        "kind": "OperationDefinition",
        "operation": "query",
        "name": {"kind": "Name", "value": "GetTasks"},
        "selectionSet": {
            "kind": "SelectionSet",
            "selections": [{
                "kind": "Field",
                "name": {"kind": "Name", "value": "tasks"},
                "selectionSet": {
                    "kind": "SelectionSet",
                    "selections": [{"kind": "Field", "name": {"kind": "Name", "value": "id"}}, {
                        "kind": "Field",
                        "name": {"kind": "Name", "value": "name"}
                    }, {"kind": "Field", "name": {"kind": "Name", "value": "status"}}]
                }
            }]
        }
    }]
} as unknown as DocumentNode<GetTasksQuery, GetTasksQueryVariables>;