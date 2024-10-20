# A URL Shortener Server

## Overview

This project is an Node.js server using ExpressJS, Typescript and Sequelize with PostgreSQL. It provides an API for managing URL. This README provides instructions on how to set up and run the application.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (>= 14.x)
- npm (>= 6.x)
- PostgreSQL database

## Installation

To install and run the application, follow these steps:

1.  Clone the repository:

    ```bash
    git clone <repository_url>
    ```

2.  Install Dependencies:

    ```bash
    npm install
    ```

3.  Configuration:

    ```bash
    cp .env.example .env
    ```

    Add your database configuration in .env file, ensure that your PostgreSQL server is running and create a new database.

4.  Run the Application:

    For Production

    ```bash
    npm run start
    ```

## Project Structure

    .
    ├── src
    │ ├── config
    │ │ └── database.ts
    │ ├── controller
    | | └──dto
    │ │ └── UrlController.ts
    │ ├── error
    │ │ └── customError.ts
    │ ├── middleware
    │ │ └── asyncHandler.ts
    │ ├── models
    │ │ └── index.ts
    │ │ └── url.ts
    │ ├── routes
    │ │ └── index.ts
    │ │ └── UrlRoute.ts
    │ ├── service
    │ │ └── UrlService.ts
    │ └── index.ts
    ├── .env.example
    ├── package.json
    ├── README.md
    └── tsconfig.json

## Troubleshooting

If you encounter any issues, please check the following:

- Ensure PostgreSql is running and the credentials in the .env file are correct.
- Verify that you have created the database specified in the .env file.
- Check the logs for any error messages.