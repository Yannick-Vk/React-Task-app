# Use the .NET 10 SDK for building the application
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copy solution and project files to restore dependencies
COPY ["GraphQLTasks.sln", "."]
COPY ["GraphQLTasks/GraphQLTasks.csproj", "GraphQLTasks/"]

# Restore dependencies for the project
RUN dotnet restore "GraphQLTasks/GraphQLTasks.csproj"

# Copy the rest of the source code
COPY . .
WORKDIR "/src/GraphQLTasks"

# Publish the application for release
RUN dotnet publish "GraphQLTasks.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Use the .NET 10 ASP.NET runtime image for the final, smaller image
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app

# Copy the published output from the build stage
COPY --from=build /app/publish .

# Set the entrypoint for the container to run the application
ENTRYPOINT ["dotnet", "GraphQLTasks.dll"]
