# Chat Group Application

## Overview
This is a full-stack chat application that supports real-time messaging, user authentication, and passcode-protected chat rooms. The project is built using the following technologies:

- **Frontend**: Next.js (React)
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL (via Prisma ORM)
- **Real-time Communication**: Socket.io
- **Message Queue**: Kafka
- **Containerization**: Docker (for database)

## Features
- User authentication with JWT (JSON Web Tokens)
- Real-time chat functionality using WebSockets
- Passcode-protected chat rooms
- Kafka integration for message queuing
- Prisma ORM for database management
- Dockerized PostgreSQL database

## Prerequisites
Before running the project, ensure you have the following installed:

- Node.js (v16 or higher)
- Docker and Docker Compose
- pnpm (for package management)

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/prashantdubeypng/chat-group-2.git
cd chat-group-2
```

### 2. Set Up Environment Variables
Create a `.env` file in the `server` directory with the following variables:
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/chat_db
KAFKA_BROKER=localhost:9092
KAFKA_USERNAME=your-username
KAFKA_PASSWORD=your-password
JWT_SECRET=your-secret-key
PORT=3001
```

### 3. Start the Database with Docker
Ensure Docker is running, then execute:
```bash
docker-compose up -d
```
This will start a PostgreSQL database container.

### 4. Install Dependencies
Navigate to both the `server` and `my-app` directories and install dependencies:
```bash
# For the backend
cd server
pnpm install

# For the frontend
cd ../my-app
pnpm install
```

### 5. Run Database Migrations
Navigate to the `server` directory and run:
```bash
pnpm prisma migrate dev
```

### 6. Start the Development Servers
Start both the backend and frontend servers:
```bash
# Backend
cd server
pnpm run dev

# Frontend
cd ../my-app
pnpm run dev
```

The backend will run on `http://localhost:3001` and the frontend on `http://localhost:3000`.

## Project Structure

### Backend (`server`)
- `src/config`: Configuration files (e.g., Kafka, database)
- `src/controller`: Controllers for handling API logic
- `src/routes`: API routes
- `src/socket.ts`: WebSocket setup
- `prisma/schema.prisma`: Database schema

### Frontend (`my-app`)
- `src/app`: Next.js pages and components
- `src/lib`: Utility functions (e.g., API calls, socket configuration)
- `public`: Static assets

## Scripts

### Backend
- `pnpm run dev`: Start the development server
- `pnpm run build`: Build the project
- `pnpm run start`: Start the production server
- `pnpm prisma studio`: Open Prisma Studio

### Frontend
- `pnpm run dev`: Start the development server
- `pnpm run build`: Build the project
- `pnpm run start`: Start the production server

## Troubleshooting

### Kafka Connection Issues
Ensure the `KAFKA_BROKER`, `KAFKA_USERNAME`, and `KAFKA_PASSWORD` are correctly set in the `.env` file.

### Database Connection Issues
Ensure the `DATABASE_URL` is correctly set and the Docker container is running.

### WebSocket Issues
Check the backend logs to ensure the WebSocket server is running and accessible.

## License
This project is licensed under the MIT License.
