import type {TypedDocumentNode as DocumentNode} from '@graphql-typed-document-node/core';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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
  DateTime: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

export type Mutation = {
  __typename?: 'Mutation';
  addTask: Task;
  removeTask?: Maybe<Task>;
  updateTask?: Maybe<Task>;
};


export type MutationAddTaskArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  priority?: InputMaybe<Priority>;
  status?: InputMaybe<Status>;
};


export type MutationRemoveTaskArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationUpdateTaskArgs = {
  updatedTask: UpdateTaskDtoInput;
};

export enum Priority {
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM',
  None = 'NONE'
}

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
  created: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  dueDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  priority: Priority;
  status: Status;
  updated?: Maybe<Scalars['DateTime']['output']>;
};

export type UpdateTaskDtoInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['UUID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  priority?: InputMaybe<Priority>;
  status?: InputMaybe<Status>;
};

export type AddTaskMutationVariables = Exact<{
  name: Scalars['String']['input'];
  status?: InputMaybe<Status>;
  description?: InputMaybe<Scalars['String']['input']>;
  priority: Priority;
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
}>;


export type AddTaskMutation = {
  __typename?: 'Mutation',
  addTask: {
    __typename?: 'Task',
    id: any,
    name: string,
    status: Status,
    description?: string | null,
    priority: Priority,
    created: any,
    dueDate?: any | null
  }
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
  tasks: Array<{
    __typename?: 'Task',
    id: any,
    name: string,
    status: Status,
    description?: string | null,
    priority: Priority,
    created: any,
    dueDate?: any | null
  }>
};

export type UpdateTaskMutationVariables = Exact<{
  task: UpdateTaskDtoInput;
}>;


export type UpdateTaskMutation = {
  __typename?: 'Mutation',
  updateTask?: {
    __typename?: 'Task',
    id: any,
    name: string,
    status: Status,
    description?: string | null,
    priority: Priority,
    created: any,
    dueDate?: any | null
  } | null
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
    }, {
      "kind": "VariableDefinition",
      "variable": {"kind": "Variable", "name": {"kind": "Name", "value": "description"}},
      "type": {"kind": "NamedType", "name": {"kind": "Name", "value": "String"}}
    }, {
      "kind": "VariableDefinition",
      "variable": {"kind": "Variable", "name": {"kind": "Name", "value": "priority"}},
      "type": {"kind": "NonNullType", "type": {"kind": "NamedType", "name": {"kind": "Name", "value": "Priority"}}}
    }, {
      "kind": "VariableDefinition",
      "variable": {"kind": "Variable", "name": {"kind": "Name", "value": "dueDate"}},
      "type": {"kind": "NamedType", "name": {"kind": "Name", "value": "DateTime"}}
    }],
    "selectionSet": {
      "kind": "SelectionSet", "selections": [{
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
        }, {
          "kind": "Argument",
          "name": {"kind": "Name", "value": "description"},
          "value": {"kind": "Variable", "name": {"kind": "Name", "value": "description"}}
        }, {
          "kind": "Argument",
          "name": {"kind": "Name", "value": "priority"},
          "value": {"kind": "Variable", "name": {"kind": "Name", "value": "priority"}}
        }, {
          "kind": "Argument",
          "name": {"kind": "Name", "value": "dueDate"},
          "value": {"kind": "Variable", "name": {"kind": "Name", "value": "dueDate"}}
        }],
        "selectionSet": {
          "kind": "SelectionSet",
          "selections": [{"kind": "Field", "name": {"kind": "Name", "value": "id"}}, {
            "kind": "Field",
            "name": {"kind": "Name", "value": "name"}
          }, {"kind": "Field", "name": {"kind": "Name", "value": "status"}}, {
            "kind": "Field",
            "name": {"kind": "Name", "value": "description"}
          }, {"kind": "Field", "name": {"kind": "Name", "value": "priority"}}, {
            "kind": "Field",
            "name": {"kind": "Name", "value": "created"}
          }, {"kind": "Field", "name": {"kind": "Name", "value": "dueDate"}}]
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
          }, {"kind": "Field", "name": {"kind": "Name", "value": "status"}}, {
            "kind": "Field",
            "name": {"kind": "Name", "value": "description"}
          }, {"kind": "Field", "name": {"kind": "Name", "value": "priority"}}, {
            "kind": "Field",
            "name": {"kind": "Name", "value": "created"}
          }, {"kind": "Field", "name": {"kind": "Name", "value": "dueDate"}}]
        }
      }]
    }
  }]
} as unknown as DocumentNode<GetTasksQuery, GetTasksQueryVariables>;
export const UpdateTaskDocument = {
  "kind": "Document", "definitions": [{
    "kind": "OperationDefinition",
    "operation": "mutation",
    "name": {"kind": "Name", "value": "updateTask"},
    "variableDefinitions": [{
      "kind": "VariableDefinition",
      "variable": {"kind": "Variable", "name": {"kind": "Name", "value": "task"}},
      "type": {
        "kind": "NonNullType",
        "type": {"kind": "NamedType", "name": {"kind": "Name", "value": "UpdateTaskDtoInput"}}
      }
    }],
    "selectionSet": {
      "kind": "SelectionSet",
      "selections": [{
        "kind": "Field",
        "name": {"kind": "Name", "value": "updateTask"},
        "arguments": [{
          "kind": "Argument",
          "name": {"kind": "Name", "value": "updatedTask"},
          "value": {"kind": "Variable", "name": {"kind": "Name", "value": "task"}}
        }],
        "selectionSet": {
          "kind": "SelectionSet",
          "selections": [{"kind": "Field", "name": {"kind": "Name", "value": "id"}}, {
            "kind": "Field",
            "name": {"kind": "Name", "value": "name"}
          }, {"kind": "Field", "name": {"kind": "Name", "value": "status"}}, {
            "kind": "Field",
            "name": {"kind": "Name", "value": "description"}
          }, {"kind": "Field", "name": {"kind": "Name", "value": "priority"}}, {
            "kind": "Field",
            "name": {"kind": "Name", "value": "created"}
          }, {"kind": "Field", "name": {"kind": "Name", "value": "dueDate"}}]
        }
      }]
    }
  }]
} as unknown as DocumentNode<UpdateTaskMutation, UpdateTaskMutationVariables>;