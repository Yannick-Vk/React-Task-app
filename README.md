# GraphQL Tasks API

This repository contains the backend API for a modern Tasks/TODO application. It's built with .NET 10, ASP.NET Core, 
and GraphQL (using Hot Chocolate). It is designed to be consumed by a frontend application, 
such as one written in React.

## Features

- **GraphQL API:** A complete and strongly-typed GraphQL API for all task management operations.
- **Create Tasks:** Add new tasks with a name and status.
- **Read Tasks:** Fetch a list of all existing tasks.
- **Update Tasks:** Modify a task's name and/or status.
- **Delete Tasks:** Remove tasks from the database.
- **Database Persistence:** Uses Entity Framework Core with a PostgreSQL database.
- **Containerized Database:** The development database is easily managed with Docker Compose.

## Prerequisites

Before you begin, ensure you have the following installed:
- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0)
- [Docker](https://www.docker.com/products/docker-desktop)

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <repository-folder>
    ```

2.  **Start the database:**
    Launch the PostgreSQL database using Docker Compose. This will start a container and create the necessary database and volumes.
    ```bash
    docker-compose up -d
    ```

3.  **Apply Database Migrations:**
    You'll need to apply the Entity Framework migrations to set up the database schema.
    ```bash
    dotnet ef database update --project GraphQLTasks
    ```

4.  **Run the application:**
    ```bash
    dotnet run --project GraphQLTasks
    ```
    The API will be running and accessible at `http://localhost:5095`.

## GraphQL Endpoint

The GraphQL IDE and endpoint are available at: **`http://localhost:5095/graphql`**

You can use the built-in Banana Cake Pop IDE to explore the schema and test queries and mutations.

### API Operations

Here is a list of the primary operations available through the GraphQL API.

#### Queries

- **`tasks`**: Fetches a list of all tasks.
    ```graphql
    query GetTasks {
      tasks {
        id
        name
        status
      }
    }
    ```

#### Mutations

- **`addTask`**: Creates a new task.
    - `name` (String!): The name or description of the task.
    - `status` (Status): The initial status (`Ready`, `InProgress`, `Done`). Defaults to `Ready` if not provided.
    ```graphql
    mutation AddTask {
      addTask(name: "My new task", status: Ready) {
        id
        name
        status
      }
    }
    ```

- **`updateTask`**: Updates an existing task.
    - `updatedTask` (UpdateTaskDtoInput!): An object containing the task's `id` and the fields to be updated (`name`, `status`).
    ```graphql
    mutation UpdateTask {
      updateTask(updatedTask: { id: "your-task-id", name: "An updated name" }) {
        id
        name
        status
      }
    }
    ```

- **`removeTask`**: Deletes a task by its ID.
    - `id` (UUID!): The unique identifier of the task to remove.
    ```graphql
    mutation RemoveTask {
      removeTask(id: "your-task-id") {
        id
        name
      }
    }
    ```
