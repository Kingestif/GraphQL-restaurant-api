# Restaurant API

A modern, scalable Restaurant API built with **TypeScript**, **GraphQL**, and **Prisma** using a **Clean Architecture** approach.

---

## Features

- **GraphQL API** for all operations (bookings, menus, orders, users, etc.)
- **TypeScript** for type safety and maintainability
- **Prisma ORM** for database access and migrations
- **PostgreSQL** (or your preferred SQL database)
- **Clean Architecture**: clear separation of concerns (Resolvers, Services, Repositories, Mappers, Validation)
- **Zod** for robust input validation
- **Role-based authentication** (admin, manager, customer)
- **Custom error handling** with extensible error classes
- **Environment configuration** via `.env` and config modules

---

## Tech Stack

- **Language:** TypeScript
- **API:** GraphQL (Apollo Server)
- **Database:** PostgreSQL (via Prisma ORM)
- **Validation:** Zod
- **Authentication:** JWT-based, role-aware
- **Architecture:** Clean Architecture (modular, testable, scalable)

---

## Getting Started

1. **Clone the repo**
2. **Install dependencies**
   ```bash
   npm install
3. **Configure environment**
    Copy .env.example to .env and set your variables (DB connection, JWT secret, etc.)
4. **Run database migrations**
    ```bash 
    npx prisma migrate dev
5. **Start the server**
    npm run dev
6. **Access GraphQL Playground**
    Visit http://localhost:4000/ in your browser


## Key Concepts
GraphQL-first: Only fetch the data you need, with strong typing and introspection.
Clean Architecture: Each layer (resolver, service, repository) has a single responsibility.
Validation: All inputs are validated with Zod before reaching business logic.
Role-based Access: Secure endpoints by user role (admin, manager, customer).
Error Handling: Custom AppError class for consistent error responses.

## Documentation
The GraphQL schema is self-documenting. Use Apollo Studio, GraphiQL, or Playground to explore available queries, mutations, and types.
Code is organized for clarity and extensibility—see comments and folder structure for guidance.

## Contributing
Contributions are welcome! Please open issues or submit pull requests for improvements or bug fixes.

## License
MIT License

