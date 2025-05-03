# Gamdom - Online Betting Dashboard

A full-stack application for managing and placing sports betting events.

## Project Structure

```
gamdom/
├── frontend-gamdom/                  # React + TypeScript frontend
├── backend-gamdom/                   # Node.js + TypeScript backend
├── gamdom.postman_collection.json    # Postman collection
└── docker-compose.yml                # Docker configuration
```

## Features

- View available sports betting events
- Place bets on events
- User-friendly interface

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- React Query
- Styled Components
- React Router
- Jest for testing

### Backend
- Node.js
- TypeScript
- Express
- TypeORM
- PostgreSQL
- Jest for testing

## Getting Started

### Prerequisites

- Node.js (v20 or later)
- Docker and Docker Compose
- PostgreSQL (if running locally)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd gamdom
```

2. Install dependencies:
```bash
# Frontend
cd frontend-gamdom
npm install

# Backend
cd backend-gamdom
npm install
```

### Running with Docker

1. Build and start all services:
```bash
docker compose up --build
```

This will start:
- Frontend on http://localhost:5173
- Backend on http://localhost:5000
- PostgreSQL on port 5432

2. Stop all services:
```bash
docker compose down
```

### Running Locally
#### Database Migrations

The project uses TypeORM migrations to manage database schema changes. Here are the available migration commands:

1. **Generate a new migration** (based on entity changes):

   ```bash
   cd backend-gamdom
   npm run migration:generate src/migrations/MigrationName
   ```

2. **Run pending migrations**:

   ```bash
   cd backend-gamdom
   npm run migration:run
   ```

3. **Revert the last migration**:
   ```bash
   cd backend-gamdom
   npm run migration:revert
   ```

    Run the above commands after runing this command - `npm run build` \
    Note: Always run migrations in development first and test them before applying to production.

#### Seeding the Database:

You can populate the database with initial demo/test data using the seed script:

1. **Run the seed script**:
    ```bash
    npm run seed
    ```

   This will insert sample sport events into your database.

#### Start the backend
    cd backend-gamdom
    npm run dev
#### Start the frontend
    cd frontend-gamdom
    npm run dev

## Testing

### Frontend Tests

```bash
cd frontend-gamdom
npm test
```

### Backend Tests
```bash
cd backend-gamdom
npm test
```

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
```

### Backend (.env)
```
NODE_ENV=development
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=gamdom
```

## Database Migrations

The backend uses TypeORM for database migrations:

```bash
# Generate a new migration
npm run migration:generate

# Run migrations
npm run migration:run

# Revert last migration
npm run migration:revert
```

## Docker Configuration

### Frontend Container
- Node.js 22
- Vite development server

### Backend Container
- Node.js 22
- TypeScript compilation
- Automatic migration running
- Database seeding

### PostgreSQL Container
- PostgreSQL 15 Alpine
- Persistent volume for data storage

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication
Currently, the API does not require authentication.

### Endpoints

#### Sport Events

##### ``` GET /api/events ```
Returns a list of all available betting events.

##### ``` GET /api/events/:id ```
Returns details for a specific event.

**Request Body**
```json
{
  "eventName": "string",
  "odds": number,
}
```

##### ``` PUT /api/events/:id ```
Update an existing sport event.

**Parameters**
- `id` (path parameter): The unique identifier of the event

**Request Body**
```json
{
  "eventName": "string",
  "odds": number,
}
```

##### ``` DELETE /api/events/:id ```
Delete a sport event.

**Parameters**
- `id` (path parameter): The unique identifier of the event