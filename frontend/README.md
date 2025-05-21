# RemindMeLater - Frontend Client

This directory contains the React frontend for the RemindMeLater application, built using Vite.

## Technology Stack

*   React 18+
*   Vite (Build tool and development server)
*   React Router v6 (for client-side routing)
*   Axios (for making API requests)
*   React Context API (for global state management, e.g., authentication)
*   CSS (basic styling)

## Prerequisites

*   Node.js (v16 or higher recommended)
*   npm (usually comes with Node.js) or yarn

## Setup Instructions

1.  **Navigate to the frontend directory:**
    ```bash
    cd path/to/RemindMeLaterFullStack/frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    # yarn install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the `frontend` root directory by copying `.env.example` (if you create one) or by creating it directly.
    Add the following, adjusting if your backend API runs on a different port:
    ```env
    VITE_API_BASE_URL=http://127.0.0.1:8000/api
    ```
    *Note: Vite requires environment variables to be prefixed with `VITE_` to be exposed to the client-side code.*

4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    # yarn dev
    ```
    The application will typically be available at `http://localhost:5173/` (Vite's default port). The server will automatically reload when you make changes to the code.

## Available Scripts

In the project directory, you can run:

*   `npm run dev` or `yarn dev`:
    Runs the app in development mode. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

*   `npm run build` or `yarn build`:
    Builds the app for production to the `dist` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

*   `npm run preview` or `yarn preview`:
    Serves the production build from the `dist` folder locally. This is useful for testing the production build before deployment.

*   `npm run lint` or `yarn lint`:
    Lints the project files using ESLint (if configured).

## Project Structure

*   `public/`: Contains static assets like `index.html` and favicons.
*   `src/`: Contains all the React application code.
    *   `api/`: Modules for interacting with the backend API (e.g., `apiClient.js`, `authService.js`, `reminderService.js`).
    *   `assets/`: Static assets like images, fonts, etc., that are imported into components.
    *   `components/`: Reusable UI components, often categorized (e.g., `Auth/`, `Reminders/`, `Common/`).
    *   `contexts/`: React Context providers for global state (e.g., `AuthContext.jsx`).
    *   `hooks/`: Custom React hooks.
    *   `pages/`: Top-level components that correspond to different routes/views of the application.
    *   `App.jsx`: The main application component that sets up routing and global providers.
    *   `main.jsx`: The entry point of the React application, renders the `App` component.
    *   `index.css`: Global styles.
*   `.env`: Environment variables (not committed to Git).
*   `package.json`: Lists project dependencies and scripts.
*   `vite.config.js`: Vite configuration file.

## Key Features Implemented

*   User login and token management.
*   Protected routes for authenticated users.
*   Dashboard for creating, viewing, and deleting reminders.
*   API interaction for all reminder CRUD operations.
*   Basic form handling and display of API errors.
*   Client-side routing using React Router.
*   Global authentication state using React Context.

## Further Development / TODOs

*   Implement "Edit Reminder" functionality.
*   Implement "Mark as Sent" interaction if not fully done.
*   Add client-side form validation for a better UX.
*   Improve loading states (e.g., per-component spinners, skeleton loaders).
*   Enhance styling and UI/UX (consider a UI library or CSS framework like Tailwind CSS).
*   Implement more sophisticated error handling (e.g., toast notifications).
*   Add unit and integration tests (e.g., using Vitest/Jest and React Testing Library).
*   User registration form and API integration.
*   "Forgot Password" functionality.
*   Accessibility improvements.

## Deployment

To deploy the frontend, run `npm run build`. This will create an optimized static build in the `dist/` folder. This `dist/` folder can then be deployed to any static site hosting service like:
*   Netlify
*   Vercel
*   GitHub Pages
*   AWS S3 + CloudFront
*   Your own server (e.g., Nginx serving the static files).

Ensure your backend API is also deployed and accessible, and that the `VITE_API_BASE_URL` in your frontend's production environment variables points to the deployed API URL. Also, make sure CORS is correctly configured on the backend to allow requests from your frontend's domain.
