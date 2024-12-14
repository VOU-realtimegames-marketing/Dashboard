## Overview

Stacks:

- Framework - [Next.js 14](https://nextjs.org/13)
- Language - [TypeScript](https://www.typescriptlang.org)
- Styling - [Tailwind CSS](https://tailwindcss.com)
- Components - [Shadcn-ui](https://ui.shadcn.com)
- Schema Validations - [Zod](https://zod.dev)
- State Management - [Zustand](https://zustand-demo.pmnd.rs)
- Search params state manager - [Nuqs](https://nuqs.47ng.com/)
- Auth - [Auth.js](https://authjs.dev/)
- Tables - [Tanstack Tables](https://ui.shadcn.com/docs/components/data-table)
- Forms - [React Hook Form](https://ui.shadcn.com/docs/components/form)
- Command+k interface - [kbar](https://kbar.vercel.app/)
- Linting - [ESLint](https://eslint.org)
- Pre-commit Hooks - [Husky](https://typicode.github.io/husky/)
- Formatting - [Prettier](https://prettier.io)

## Engine Requirements

- node version 20

## Getting Started

### Manual
Follow these steps to clone the repository and start the development server:

- `npm install`
- Create a `.env.local` file by copying the example environment file:
  `cp env.example.txt .env.local`
- Follow steps in .env.local to generate NEXTAUTH_SECRET
- Add the required environment variables to the `.env.local` file.
- `npm run dev`

- Youtube start: https://youtu.be/AH6slYVf18k

### Using docker

- clone project
- open terminal (ctrl + `)
- run "docker-compose up -d --build"
- After edit file, then saved, docker will auto rebuild by hot-reload

### Docker check:
- Cd to container: "docker exec -it nextjs-app sh"
- Check logs: "docker-compose logs -f"
- Stop container: "docker-compose stop"
- Start again (not build again): "docker-compose start"

