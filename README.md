# Tipicos Delivery - Ravn Challenge V2

Welcome to Tipicos Delivery.

## Getting Started

### Requirements
- PostgreSQL
- Docker
- Node.js (v16 or higher)
- NestJS
- Prisma
- Typescript
- Jest (for testing)
- Prettier & ESLint (for code formatting)
- Swagger (for API documentation)
- Github repository: https://github.com/jramaya/Ravn-Challenge-V2-EdgarAmaya

### Setting up the project

1. **Clone the repository**

   ```bash
   git clone https://github.com/jramaya/Ravn-Challenge-V2-EdgarAmaya.git
   cd Ravn-Challenge-V2-EdgarAmaya
   ```

   #### TIP: Run with a single command

   ```bash
   cp .env.example .env; docker compose -f docker-compose.yml up
   ```

2. **Install dependencies**

   Using npm:

   ```bash
   npm install
   ```

   Using yarn:

   ```bash
   yarn install
   ```

3. **Set up the PostgreSQL database with Docker**

   The project uses Docker to run PostgreSQL. Use the provided `docker-compose.db.yml` file to spin up the database.

   ```bash
   docker-compose -f docker-compose.db.yml up -d
   ```

4. **Create the `.env` file**

   Copy the `.env.example` file and rename it to `.env`.

   ```bash
   cp .env.example .env
   ```

   Update the variables in the `.env` file according to your PostgreSQL setup:

   ```env
   POSTGRES_USER=<your_postgres_user>
   POSTGRES_PASSWORD=<your_postgres_password>
   POSTGRES_DB=<your_database_name>
   DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB}?schema=public
   ```

5. **Run Prisma migrations**

   To set up the database schema, run the Prisma migrations:

   ```bash
   npx prisma migrate dev
   ```

   Alternatively, if you want to customize the migration SQL file:

   ```bash
   npx prisma migrate dev --create-only
   ```

6. **Generate Prisma Client**

   After running the migration, generate the Prisma Client for database interaction:

   ```bash
   npx prisma generate
   ```

7. **Seed the database**

   Run the seeding script to populate the database with some initial data:

   ```bash
   npm run seed
   ```

8. **Start the NestJS server**

   For development mode with hot reload:

   ```bash
   npm run start:dev
   ```

   For production mode:

   ```bash
   npm run start:prod
   ```

   For debugging with VSCode:

   ```bash
   npm run start:debug
   ```

9. **Access the API**

   The REST API documentation is available via Swagger at:

   ```
   http://localhost:3000/api
   ```

   GraphQL Playground can be accessed at:

   ```
   http://localhost:3000/graphql
   ```

## Features

- **Authentication Endpoints**
  - Signup
  - Signin
  - Signout (by deleting jwt on client)
- **Product Management**
  - List products with pagination
  - Search products by category
  - Add, update, delete, and disable products (for managers)
- **User Roles**
  - Manager: Full control over products, view client orders
  - Client: Browse products, see details, buy products
<!-- - **Shopping Cart**
  - Add and remove products from the cart
  - Proceed to checkout
- **Orders**
  - Clients can view their orders
  - Managers can see all client orders
- **Email Notifications**
  - Email is sent when stock is low or when password is changed
  -->
- **Testing**
  - Unit tests with Jest (aiming for 80% coverage)
- **Linting**
  - Use `npm run lint`

## Next Steps

- Finish implementing CRUD for Cart and Order
- like products
- Implement extra features for bonus points, including:
  - E2E testing
  - Forgot password functionality
  - Email notifications for product stock
  - Deployment on Heroku

## Checklist

- [x] Authentication endpoints (sign up, sign in, sign out)
- [x] List products with pagination
- [x] Search products by category
- [x] Manager role functionality (create, update, delete, disable products, view orders)
- [x] Client role functionality (view products, product details, like products, buy products)
- [ ] Cart functionality (CRUD operations for cart)
- [ ] Order functionality (CRUD operations for orders)
- [ ] Email notifications
- [x] Swagger documentation
- [x] Unit tests
- [ ] Extra features (e2e testing, stock notifications, password reset)
- [ ] Deploy to Heroku

## Notes

This project uses the template from [nestjs-prisma-starter](https://github.com/notiz-dev/nestjs-prisma-starter) for initial setup.
