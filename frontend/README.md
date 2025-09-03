# Supply Chain Management System - Frontend

This is the React frontend for the Supply Chain Management System.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## Development

The app will run on [http://localhost:3000](http://localhost:3000) in development mode.

The page will reload when you make changes to the code.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Navbar.js       # Navigation component
├── pages/              # Page components
│   ├── Home.js         # Home page
│   ├── About.js        # About page
│   └── Items.js        # Items management page
├── services/           # API service functions
│   └── itemService.js  # Item-related API calls
├── utils/              # Utility functions and constants
│   └── constants.js    # Application constants
├── App.js              # Main App component
├── App.css             # App-specific styles
├── index.js            # Application entry point
└── index.css           # Global styles
```

## Features

- **Responsive Design**: Mobile-friendly interface
- **Navigation**: React Router for page navigation
- **API Integration**: Axios for backend communication
- **State Management**: React hooks for local state
- **Form Handling**: Controlled components with validation
- **Error Handling**: User-friendly error messages

## API Endpoints

The frontend communicates with the backend API at `http://localhost:8080`:

- `GET /api/hello` - Health check
- `GET /api/items` - Get all items
- `POST /api/items` - Create new item
- `PUT /api/items/{id}` - Update item
- `DELETE /api/items/{id}` - Delete item

## Configuration

The app is configured to proxy API requests to the backend during development. This is set in `package.json`:

```json
{
  "proxy": "http://localhost:8080"
}
```

## Building for Production

To create a production build:

```bash
npm run build
```

This creates an optimized build in the `build` folder.

## Troubleshooting

1. **Backend Connection Issues**: Ensure the Spring Boot backend is running on port 8080
2. **Port Conflicts**: If port 3000 is in use, React will automatically suggest an alternative port
3. **Dependencies**: If you encounter dependency issues, try deleting `node_modules` and running `npm install` again
