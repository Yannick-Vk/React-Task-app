I have containerized the application by creating a `Dockerfile` and updating your `docker-compose.yml`.

You can now build and run your entire application stack (the .NET API and the PostgreSQL database) with a single command:

```bash
docker-compose up --build
```

The API will be available at `http://localhost:5095/graphql` as before. I've also updated the compose file to wait for the database to be healthy before starting the API to ensure a smooth startup.
