# What was done

- Frontend with NextJS and Backend with NestJS

# How to run backend

In the root dir run:

- docker compose up -d

After the mongodb container is up access the backend dir and replace .env.example to .env

Then run into the backend dir:

- pnpm install
- pnpm seed
- pnpm dev

If you have not changed .env values it will be running on localhost:3001

# How to run frontend

Access the frontend dir and replace .env.example to .env

Then run into the frontend dir:

- pnpm install
- pnpm dev

If you have not changed .env values it will be running on localhost:3000

# How to run tests

Access the backend dir and run:

- pnpm test
- pnpm test:e2e
