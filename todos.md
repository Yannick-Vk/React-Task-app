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
        - [x] Update the `addTask` function to pass the new task data.
        - [ ] Update the `updateTaskHandler` to pass the updated task data.
    - [ ] **Frontend UI Components:**
        - [ ] **`CreateTask.tsx`:**
            - [x] Add form inputs for `description`, `priority`, and `dueDate`.
            - [x] Update component state and submission logic.
        - [ ] **`TaskTable.tsx`:**
            - [x] Add new columns to display `priority`, `dueDate`, etc.
            - [ ] **UI/UX Enhancements:**
                - [x] Create a reusable `Badge.tsx` component for displaying priority.
                - [x] Create a reusable `Tooltip.tsx` component for displaying full text on hover.
                - [x] Integrate `Badge.tsx` to display task priorities visually.
                - [x] Integrate `Tooltip.tsx` to show the full date on `created`, `updated`, and `dueDate` fields.
                - [x] Integrate `Tooltip.tsx` to show the full `description` on hover, while truncating the text in the
                  cell.
        - [ ] **Edit Task Modal (from `useEditTaskModal.ts`):**
            - [ ] Add form inputs to edit the new fields.
            - [ ] Update the modal's state and submission logic.
- [ ] Filter tasks by status/prioriy/due-date
- [ ] Add search
- [x] Create a confirm delete modal
- [ ] create a disabled state when a task is being deleted