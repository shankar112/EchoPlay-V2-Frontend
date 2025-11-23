# EchoPlay-V2-Frontend

This is the frontend for EchoPlay v2, a music sharing platform for indie artists. It's a React application built with Vite that allows users to upload, discover, and play music.

## Features

- **User Authentication:** Secure login and registration.
- **Music Upload:** Upload your own tracks and share them with the community.
- **Global Feed:** Discover new music from other artists.
- **Personal Library:** Manage your own uploaded tracks.
- **Music Player:** A global music player to listen to tracks seamlessly across the application.
- **Responsive Design:** A clean and modern UI that works on all devices.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/your-username/echoplay-v2-frontend.git
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```
3.  Start the development server
    ```sh
    npm run dev
    ```

The application will be available at `http://localhost:5173`.

## Backend API

This frontend application requires a running instance of the EchoPlay v2 backend. The backend API is expected to be running at `https://echoplay-v2-backend.onrender.com`.

You can find the backend repository [here](https://github.com/shankar112/EchoPlay-V2-Backend).

## Project Structure

-   `src/api/axiosConfig.js`: Axios configuration for making API requests.
-   `src/components`: Reusable React components.
-   `src/context/AuthContext.js`: Manages user authentication state.
-   `src/pages`: Application pages (e.g., Home, Login, Register).
-   `src/App.jsx`: Main application component with routing and global state.
-   `src/main.jsx`: Entry point of the application.

## Available Scripts

In the project directory, you can run:

-   `npm run dev`: Runs the app in the development mode.
-   `npm run build`: Builds the app for production to the `dist` folder.
-   `npm run lint`: Lints the code using ESLint.
-   `npm run preview`: Serves the production build locally.