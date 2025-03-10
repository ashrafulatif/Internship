# Task CRUD

Task CRUD is a web application that allows users to create, read, update, and delete tasks. It is built using modern web technologies and provides a simple and intuitive user interface.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Socket.IO](#socketio)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Dev Dependencies](#dev-dependencies)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Task CRUD is a task management application that helps users organize and manage their tasks efficiently. It provides a user-friendly interface to perform CRUD operations on tasks.

## Features

- Create new tasks
- View existing tasks
- Update task details
- Delete tasks
- Real-time updates using Socket.IO
- Form validation with React Hook Form and Zod
- Notifications with React Toastify

## Installation

To get started with the project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/ashrafulatif/Internship.git
   cd Internship/task-crud
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up the environment variables (if any are required).

## Usage

To start the development server, run the following command:

```bash
npm run dev
```

This will start the server and the Next.js application. You can access the application at `http://localhost:3000`.

## Project Structure

The project has the following directory structure:

```plaintext
task-crud/
├── .next/                  # Next.js build output
├── node_modules/           # Node.js modules
├── public/                 # Public assets
├── prisma/                 # Prisma database schema and migration files
│   ├── migrations/         # Migration files
│   └── schema.prisma       # Prisma schema file
├── src/                    # Source code
│   ├── actions/            # Server-side actions
│   │   ├── sendmail.js     # Email sending logic
│   ├── app/                # Next.js app directory
│   │   ├── (auth)/         # Authentication pages
│   │   │   └── login/      # Login page
│   │   │       └── page.jsx
│   │   ├── add/            # Add task page
│   │   │   └── page.jsx
│   │   ├── admindashboard/ # Admin dashboard pages
│   │   │   └── page.jsx    # Admin chat page
│   │   ├── api/            # API routes
│   │   │   └── users/
│   │   │       └── login/
│   │   │           └── route.js
│   │   ├── dashboard/      # Dashboard page for normal user
│   │   │   └── page.jsx
│   │   ├── layout.jsx      # Layout component
│   │   └── page.jsx        # Main page
│   ├── components/         # Reusable React components
│   │   ├── Chat/           # Chat components
│   │   │   └── ChatView.jsx
│   │   ├── create/         # Create components
│   │   │   └── CreateProduct.jsx
│   │   ├── Footer.jsx      # Footer component
│   │   ├── Navbar.jsx      # Navbar component
│   ├── data/               # Data files
│   │   └── qaData.json     # Sample Q&A data
│   ├── lib/                # Library files
│   │   └── prisma.js       # Prisma client setup
│   ├── server/             # Server-side code
│   │   └── socket.js       # Socket.IO server
│   ├── theme/              # Theme configuration
│   │   └── theme.js        # MUI theme configuration
│   └── utils/              # Utility functions
│       ├── contactFormSchema.js
│       └── productSchema.js
├── .gitignore              # Git ignore file
├── README.md               # Project README file
├── eslint.config.mjs       # ESLint configuration file
├── jsconfig.json           # JavaScript project configuration
├── next.config.mjs         # Next.js configuration file
├── package-lock.json       # NPM lock file
├── package.json            # NPM package configuration
├── postcss.config.mjs      # PostCSS configuration file
└── tailwind.config.mjs     # Tailwind CSS configuration file
```

## Socket.IO

The application uses Socket.IO for real-time Chat. Ensure that the server is running to enable real-time communication between the client and server.

### File Structure

The Socket.IO server is set up in the `src/server/socket.js` file. Below is an overview of the file structure:

- `createServer`: Creates an HTTP server.
- `Server`: Creates a new Socket.IO server.
- `io.on("connection")`: Listens for new client connections.
  - `socket.on("register-buyer")`: Registers a buyer and joins the "buyers" room.
  - `socket.on("register-admin")`: Registers an admin and joins the "admins" room.
  - `socket.on("message")`: Handles incoming messages and forwards them to the appropriate room.
  - `socket.on("disconnect")`: Handles client disconnections.

### API

The following events are handled by the Socket.IO server:

- `register-buyer`: Registers a client as a buyer and adds them to the "buyers" room.
- `register-admin`: Registers a client as an admin and adds them to the "admins" room.
- `message`: Handles incoming messages and forwards them based on the sender type (buyer or admin).
  - If the sender is a buyer, the message is forwarded to all admins.
  - If the sender is an admin, the message is forwarded to the specific buyer.
- `disconnect`: Logs when a user disconnects from the server.

To start the Socket.IO server, ensure that the server is running on port 3000:

```bash
node src/server/socket.js
```

## Scripts

The following scripts are available in the project:

- `dev`: Starts the development server with Socket.IO and Next.js
- `build`: Generates Prisma client and builds the Next.js application
- `start`: Starts the Next.js application
- `lint`: Runs ESLint to lint the codebase

## Dependencies

The project uses the following main dependencies:

- `@emotion/react`: ^11.14.0
- `@emotion/styled`: ^11.14.0
- `@hookform/resolvers`: ^4.1.0
- `@mui/icons-material`: ^6.4.4
- `@mui/material`: ^6.4.4
- `@prisma/client`: ^6.4.1
- `axios`: ^1.7.9
- `cookie`: ^1.0.2
- `cors`: ^2.8.5
- `next`: ^15.1.7
- `nodemailer`: ^6.10.0
- `prisma`: ^6.4.1
- `react`: ^19.0.0
- `react-dom`: ^19.0.0
- `react-hook-form`: ^7.54.2
- `react-simple-typewriter`: ^5.0.1
- `react-toastify`: ^11.0.3
- `socket.io`: ^4.8.1
- `socket.io-client`: ^4.8.1
- `zod`: ^3.24.2

## Dev Dependencies

The project uses the following development dependencies:

- `@eslint/eslintrc`: ^3
- `eslint`: ^9
- `eslint-config-next`: ^15.1.7
- `postcss`: ^8
- `tailwindcss`: ^3.4.1

## Contributing

Contributions are welcome! If you have any suggestions or improvements, feel free to create a pull request or open an issue.

## License

This project is licensed under the MIT License.
