# ToDo List

- [ ] Upgrade Task with more properties
- [ ] Filter tasks by status/prioriy/due-date
- [ ] Add search

## Expand Tasks

- [x] Update backend GraphQL `Task` type with `description`, `priority`, `created`, and `dueDate`.
- [x] Update backend mutations (`addTask`, `updateTask`) to handle new fields.
- [x] Update `getTasks.graphql`, `addTask.graphql`, and `updateTask.graphql` to include new fields in queries and
  mutations.
- [x] Regenerate TypeScript types via `bun run gql:codegen`.
- [ ] **Frontend Service Layer (`app/services/TaskService.ts`):**
  - [ ] Update the Zod validation schema to include the new fields.
  - [ ] Update the `addNewTask` function signature and logic.
  - [ ] Refactor and update the `updateTask` function to handle partial updates with the new fields.
- [ ] **Frontend Hooks (`app/hooks/useTaskManager.ts`):**
  - [ ] Update the `addTask` function to pass the new task data.
  - [ ] Update the `updateTaskHandler` to pass the updated task data.
- [ ] **Frontend UI Components:**
  - [ ] **`CreateTask.tsx`:**
    - [ ] Add form inputs for `description`, `priority`, and `dueDate`.
    - [ ] Update component state and submission logic.
  - [ ] **`TaskTable.tsx`:**
    - [ ] Add new columns to display `priority`, `dueDate`, etc.
    - [ ] Implement a way to show the `description` (e.g., in a tooltip or an expandable row).
  - [ ] **Edit Task Modal (from `useEditTaskModal.ts`):**
    - [ ] Add form inputs to edit the new fields.
    - [ ] Update the modal's state and submission logic.