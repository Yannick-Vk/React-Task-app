# GraphQL Tasks API

This repository contains the backend API for a modern Tasks/TODO application. It's built with .NET, ASP.NET Core, and GraphQL (using Hot Chocolate). The entire application is containerized, allowing it to run with a single command. It is designed to be consumed by a frontend application, such as one written in React.

## Features

- **Fully Containerized:** The entire application (API and database) runs in Docker.
- **GraphQL API:** A complete and strongly-typed GraphQL API for all task management operations.
- **Automatic Database Migrations:** The database schema is automatically created and updated on application startup.
- **Create Tasks:** Add new tasks with a name and status.
- **Read Tasks:** Fetch a list of all existing tasks.
- **Update Tasks:** Modify a task's name and/or status.
- **Delete Tasks:** Remove tasks from the database.
- **Database Persistence:** Uses Entity Framework Core with a PostgreSQL database.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Docker Desktop](https://www.docker.com/products/docker-desktop)

*Note: To develop and add new migrations, you will also need the [.NET SDK](https://dotnet.microsoft.com/download).*

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <repository-folder>
    ```

2.  **Launch the application:**
    Use Docker Compose to build the API image, start the containers, and automatically apply database migrations.
    ```bash
    docker-compose up --build
    ```
    The API will be running and accessible at `http://localhost:5095`. The first time you run this, it will take a few minutes to download the .NET images and build the application.

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
