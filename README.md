# API Webchat - TDD, DDD, SOLID - Prisma Setup

Welcome to the API Webchat project! This API provides a room-based webchat system built using the principles of TDD (Test-Driven Development), DDD (Domain-Driven Design), and SOLID. It empowers users to effortlessly create, manage, and exchange messages within chat rooms through a RESTful interface.

## Prerequisites

Before getting started, make sure you have the following tools and services in place:

- Node.js
- NPM
- PostgreSQL

## Installation

1. Clone this repository to your local environment.
2. Navigate to the project directory using your terminal.
3. Run the command `npm install` to install all required dependencies.


## Configuration

1. Create a `.env` file based on the `.env.example` template, and provide necessary environment variables.


## Prisma Setup

1. Install Prisma globally by running the following command:

```bash
npm install -g prisma
```

2. Configure your database connection in the `schema.prisma` file located in the "prisma" folder.

3. Create your database schema using Prisma Migrate:

```bash
npx prisma migrate dev
```

## Running Tests

Quality assurance is integral to this project. To run the test suite, execute the following command:

```bash
npm run test
```

## Running in Development Mode

During development, you can take advantage of the development mode with automatic restarts. Use the following command to run the project in development mode:

```bash
npm run dev
```

## Contribution

Contributions are encouraged and welcome! Whether it's bug fixes, enhancements, or new features, feel free to submit pull requests.

---

By focusing on code quality, adherence to TDD, DDD, and SOLID principles, we aim to deliver a reliable and scalable API for seamless web-based chat experiences. Thank you for being a part of this project!


Certainly, here's the modified "Prisma Setup" section without the `npx prisma init` step, since the "prisma" folder already exists in the repository: