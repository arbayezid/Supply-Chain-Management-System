# Supply Chain Management System

A full-stack web application built with React frontend and Spring Boot backend, connected to MongoDB.

## Prerequisites

### Frontend Requirements
- Node.js (v16 or higher)
- npm or yarn

### Backend Requirements
- Java JDK 17 or higher
- Maven 3.6 or higher
- MongoDB (local or cloud)

### Database Setup
1. **Local MongoDB:**
   - Install MongoDB Community Server
   - Start MongoDB service
   - Create database: `supply_chain_db`

2. **Cloud MongoDB (MongoDB Atlas):**
   - Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a cluster
   - Get connection string
   - Update `application.properties` with your connection string

## Project Structure

```
supply-chain-management-system/
├── frontend/                 # React application
│   ├── public/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── utils/          # Utility functions
│   │   └── App.js          # Main App component
│   ├── package.json
│   └── README.md
├── backend/                  # Spring Boot application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/supplychain/
│   │   │   │       ├── controller/
│   │   │   │       ├── model/
│   │   │   │       ├── repository/
│   │   │   │       ├── service/
│   │   │   │       └── SupplyChainApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   └── pom.xml
└── README.md
```

## Quick Start

### 1. Start Backend
```bash
cd backend
mvn spring-boot:run
```
Backend will run on: http://localhost:8080

### 2. Start Frontend
```bash
cd frontend
npm install
npm start
```
Frontend will run on: http://localhost:3000

### 3. Test API
- Backend health check: http://localhost:8080/api/hello
- Frontend: http://localhost:3000

## API Endpoints

- `GET /api/hello` - Health check endpoint
- `GET /api/items` - Get all items
- `POST /api/items` - Create new item
- `GET /api/items/{id}` - Get item by ID
- `PUT /api/items/{id}` - Update item
- `DELETE /api/items/{id}` - Delete item

## Technologies Used

### Frontend
- React 18
- React Router 6
- Axios
- CSS3

### Backend
- Spring Boot 3.2
- Spring Data MongoDB
- Maven
- Java 17

### Database
- MongoDB 6.0+

## Development

### Frontend Development
- Run `npm start` for development server
- Run `npm run build` for production build
- Run `npm test` for running tests

### Backend Development
- Run `mvn spring-boot:run` for development
- Run `mvn clean install` for building
- Run `mvn test` for running tests

## Troubleshooting

1. **MongoDB Connection Issues:**
   - Check if MongoDB is running
   - Verify connection string in `application.properties`
   - Check network connectivity for cloud MongoDB

2. **CORS Issues:**
   - Backend CORS is configured for `http://localhost:3000`
   - Update CORS configuration if using different ports

3. **Port Conflicts:**
   - Backend: Change port in `application.properties`
   - Frontend: Change port in `package.json` scripts
