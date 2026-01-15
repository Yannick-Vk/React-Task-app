# ToDo List

- [ ] ## Expand Tasks
    - [x] Update backend GraphQL `Task` type with `description`, `priority`, `created`, and `dueDate`.
    - [x] Update backend mutations (`addTask`, `updateTask`) to handle new fields.
    - [x] Update `getTasks.graphql`, `addTask.graphql`, and `updateTask.graphql` to include new fields in queries and
      mutations.
    - [x] Regenerate TypeScript types via `bun run gql:codegen`.
    - [ ] **Frontend Service Layer (`app/services/TaskService.ts`):**
        - [x] Update the Zod validation schema to include the new fields.
        - [x] Update the `addNewTask` function signature and logic.
        - [ ] Refactor and update the `updateTask` function to handle partial updates with the new fields.
    - [ ] **Frontend Hooks (`app/hooks/useTaskManager.ts`):**
        - [ ] Update the `addTask` function to pass the new task data.
        - [ ] Update the `updateTaskHandler` to pass the updated task data.
    - [ ] **Frontend UI Components:**
        - [ ] **`CreateTask.tsx`:**
            - [ ] Add form inputs for `description`, `priority`, and `dueDate`.
            - [ ] Update component state and submission logic.
        - [ ] **`TaskTable.tsx`:**
            - [x] Add new columns to display `priority`, `dueDate`, etc.
            - [ ] **UI/UX Enhancements:**
                - [ ] Create a reusable `Badge.tsx` component for displaying priority.
                - [ ] Create a reusable `Tooltip.tsx` component for displaying full text on hover.
                - [ ] Integrate `Badge.tsx` to display task priorities visually.
                - [ ] Integrate `Tooltip.tsx` to show the full date on `created`, `updated`, and `dueDate` fields.
                - [ ] Integrate `Tooltip.tsx` to show the full `description` on hover, while truncating the text in the
                  cell.
        - [ ] **Edit Task Modal (from `useEditTaskModal.ts`):**
            - [ ] Add form inputs to edit the new fields.
            - [ ] Update the modal's state and submission logic.
- [ ] Filter tasks by status/prioriy/due-date
- [ ] Add search
- [ ]
