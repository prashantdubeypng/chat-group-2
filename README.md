# Chat Group Application

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Node.js CI](https://github.com/prashantdubeypng/chat-group-2/actions/workflows/node.js.yml/badge.svg)

## Overview

A robust full-stack chat application supporting real-time messaging, user authentication, and passcode-protected chat rooms. This project demonstrates scalable architecture using modern web and backend technologies.

## Features

- User authentication with JWT
- Real-time chat (WebSockets/Socket.io)
- Passcode-protected chat rooms
- Reliable message queuing with Kafka
- PostgreSQL database (Prisma ORM)
- Dockerized database setup
- Modular code structure

## Architecture

### System Flow Diagram

```mermaid
flowchart TD
    A[User]
    B[Frontend (Next.js/React)]
    C[Backend (Express.js/TypeScript)]
    D[WebSocket (Socket.io)]
    E[Database (PostgreSQL/Prisma)]
    F[Message Queue (Kafka Broker)]
    G[Docker (PostgreSQL Container)]

    A -- HTTP/WebSocket --> B
    B -- REST API --> C
    B -- WebSocket --> D
    D -- WebSocket --> C

    C -- Prisma ORM --> E
    C -- Kafka Producer/Consumer --> F

    E -- Dockerized --> G
```

**Flow Description**
- Users interact via browser/mobile with the Next.js frontend.
- Frontend sends REST API calls and WebSocket events to the backend.
- Backend manages authentication, chat rooms, messaging, and queues messages in Kafka.
- Messages and user data are persisted in PostgreSQL via Prisma ORM.
- Database runs in a Docker container for consistency.

## Tech Stack

- **Frontend:** Next.js (React)
- **Backend:** Express.js (TypeScript)
- **Database:** PostgreSQL (Prisma ORM)
- **Real-Time:** Socket.io
- **Message Queue:** Kafka
- **Containerization:** Docker

## Project Structure

```
├── my-app/          # Frontend (Next.js)
│   ├── src/app/     # Pages and components
│   ├── src/lib/     # Utility functions
│   └── public/      # Static assets
├── server/          # Backend (Express.js)
│   ├── src/config/  # Configuration files
│   ├── src/controller/ # API logic
│   ├── src/routes/  # API routes
│   ├── src/socket.ts   # WebSocket setup
│   └── prisma/     # Database schema
└── docker-compose.yml  # Docker config
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- Docker & Docker Compose
- pnpm (package manager)

### Installation & Setup

1. **Clone the repository**
    ```bash
    git clone https://github.com/prashantdubeypng/chat-group-2.git
    cd chat-group-2
    ```

2. **Environment variables**  
   Create a `.env` file in `server`:
    ```env
    DATABASE_URL=postgresql://postgres:password@localhost:5432/chat_db
    KAFKA_BROKER=localhost:9092
    KAFKA_USERNAME=your-username
    KAFKA_PASSWORD=your-password
    JWT_SECRET=your-secret-key
    PORT=3001
    ```

3. **Start PostgreSQL with Docker**
    ```bash
    docker-compose up -d
    ```

4. **Install dependencies**
    ```bash
    # Backend
    cd server
    pnpm install

    # Frontend
    cd ../my-app
    pnpm install
    ```

5. **Database migrations**
    ```bash
    cd server
    pnpm prisma migrate dev
    ```

6. **Run development servers**
    ```bash
    # Backend
    cd server
    pnpm run dev

    # Frontend
    cd ../my-app
    pnpm run dev
    ```

## Usage

- Backend runs on `http://localhost:3001`
- Frontend runs on `http://localhost:3000`
- Register and log in to join chat rooms
- Create passcode-protected rooms

## Scripts

### Backend
- `pnpm run dev` – Start dev server
- `pnpm run build` – Build backend
- `pnpm run start` – Start production server
- `pnpm prisma studio` – Prisma Studio UI

### Frontend
- `pnpm run dev` – Start dev server
- `pnpm run build` – Build frontend
- `pnpm run start` – Start production server

## Troubleshooting

- **Kafka Connection**: Check `KAFKA_BROKER`, `KAFKA_USERNAME`, and `KAFKA_PASSWORD` in `.env`
- **Database Issues**: Ensure Docker is running and `DATABASE_URL` is correct
- **WebSocket Issues**: Confirm backend and frontend are running and accessible

## Contributing

Pull requests and issues are welcome!  
1. Fork the repo  
2. Create your feature branch (`git checkout -b feature/YourFeature`)  
3. Commit your changes  
4. Open a pull request

Please follow established coding standards and include appropriate tests.

## License

MIT License. See [LICENSE](LICENSE) for details.

## Maintainers & Contact

- [prashantdubeypng](https://github.com/prashantdubeypng)

---

*For questions or suggestions, open an issue or contact the maintainer.*