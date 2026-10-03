# Library API Frontend

React frontend for a full-stack library management application. The application provides a web interface for managing books, authors, genres, and library members through a REST API.

This project is a personal portfolio project built to demonstrate full-stack development with React and Spring Boot.

## Tech Stack

* React
* TypeScript
* Vite
* React Router
* Docker
* REST API

## Features

The frontend currently provides interfaces for:

* Books
* Authors
* Genres
* Library members

The application communicates with the Library API backend for data retrieval and updates.

## Project Structure

```text
src/
├── api/            # API clients for backend resources
├── components/     # Reusable UI components
├── pages/          # Route-level page components
├── types/          # TypeScript domain types
├── App.tsx         # Application root and routing
└── main.tsx        # React entry point
```

## Development

### Prerequisites

* Node.js
* npm
* Docker (for containerized development)

### Run locally

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The frontend runs on the Vite development server and communicates with the backend API configured for local development.

### Run with Docker

Build the Docker image:

```bash
docker build -t library-api-frontend .
```

The frontend can then be run using the project's Docker configuration.

## Related Project

The frontend is part of a full-stack application with a separate Spring Boot backend.

The backend provides the REST API used by this application, with MySQL used for persistent data storage.

## Project Status

This project is being developed incrementally using a Scrum-style workflow. Functionality and the frontend architecture will continue to evolve as additional library management features are implemented.
