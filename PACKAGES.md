# Package Requirements for Supply Chain Management System

This document lists all the packages, dependencies, and software required to run the full-stack application.

## System Requirements

### Operating System
- Windows 10/11, macOS 10.15+, or Linux (Ubuntu 18.04+)
- At least 8GB RAM (16GB recommended)
- At least 2GB free disk space

## Frontend Dependencies (React)

### Required Software
- **Node.js**: Version 16.0.0 or higher
  - Download from: https://nodejs.org/
  - Includes npm (Node Package Manager)

### NPM Packages (automatically installed via `npm install`)
```json
{
  "dependencies": {
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.6.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  }
}
```

### Installation Commands
```bash
# Install Node.js (if not already installed)
# Download from https://nodejs.org/

# Verify installation
node --version
npm --version

# Install frontend dependencies
cd frontend
npm install
```

## Backend Dependencies (Spring Boot)

### Required Software
- **Java JDK**: Version 17 or higher (LTS recommended)
  - Download from: https://adoptium.net/ or https://www.oracle.com/java/technologies/
  - Set JAVA_HOME environment variable

- **Maven**: Version 3.6.0 or higher
  - Download from: https://maven.apache.org/download.cgi
  - Add to PATH environment variable

- **MongoDB**: Version 6.0 or higher
  - Community Server: https://www.mongodb.com/try/download/community
  - Or use MongoDB Atlas (cloud): https://www.mongodb.com/atlas

### Maven Dependencies (automatically managed via pom.xml)
```xml
<dependencies>
    <!-- Spring Boot Starters -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-mongodb</artifactId>
    </dependency>
    
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>
    
    <!-- Development Tools -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-devtools</artifactId>
    </dependency>
    
    <!-- MongoDB Driver -->
    <dependency>
        <groupId>org.mongodb</groupId>
        <artifactId>mongodb-driver-sync</artifactId>
    </dependency>
</dependencies>
```

### Installation Commands
```bash
# Install Java JDK 17+
# Download and install from https://adoptium.net/

# Verify Java installation
java --version
javac --version

# Install Maven
# Download from https://maven.apache.org/download.cgi
# Extract and add to PATH

# Verify Maven installation
mvn --version

# Install MongoDB
# Download from https://www.mongodb.com/try/download/community
# Or use MongoDB Atlas cloud service

# Build backend project
cd backend
mvn clean install
```

## Database Setup

### MongoDB Local Installation
1. Download MongoDB Community Server
2. Install and start MongoDB service
3. Create database: `supply_chain_db`
4. Update `application.properties`:
   ```properties
   spring.data.mongodb.host=localhost
   spring.data.mongodb.port=27017
   spring.data.mongodb.database=supply_chain_db
   ```

### MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/atlas
2. Create cluster
3. Get connection string
4. Update `application.properties`:
   ```properties
   spring.data.mongodb.uri=mongodb+srv://username:password@cluster.mongodb.net/supply_chain_db?retryWrites=true&w=majority
   ```

## Development Tools (Optional but Recommended)

### Code Editors
- **VS Code**: https://code.visualstudio.com/
- **IntelliJ IDEA**: https://www.jetbrains.com/idea/
- **Eclipse**: https://www.eclipse.org/

### Database Tools
- **MongoDB Compass**: https://www.mongodb.com/products/compass
- **Studio 3T**: https://studio3t.com/

### API Testing
- **Postman**: https://www.postman.com/
- **Insomnia**: https://insomnia.rest/

## Environment Variables

### Frontend (.env file in frontend directory)
```bash
REACT_APP_API_BASE_URL=http://localhost:8080
```

### Backend (application.properties)
```properties
server.port=8080
spring.data.mongodb.host=localhost
spring.data.mongodb.port=27017
spring.data.mongodb.database=supply_chain_db
```

## Port Configuration

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8080
- **MongoDB**: localhost:27017

## Quick Start Commands

```bash
# 1. Start MongoDB (local installation)
# Start MongoDB service or run mongod

# 2. Start Backend
cd backend
mvn spring-boot:run

# 3. Start Frontend (in new terminal)
cd frontend
npm start

# 4. Access Application
# Frontend: http://localhost:3000
# Backend API: http://localhost:8080/api/hello
```

## Troubleshooting Common Issues

### Frontend Issues
- **Port 3000 in use**: React will automatically suggest alternative port
- **Dependencies**: Delete `node_modules` and run `npm install`
- **Backend connection**: Ensure backend is running on port 8080

### Backend Issues
- **Java version**: Ensure Java 17+ is installed and JAVA_HOME is set
- **Maven**: Verify Maven installation and PATH configuration
- **MongoDB**: Check if MongoDB is running and accessible
- **Port 8080 in use**: Change port in `application.properties`

### Database Issues
- **Connection refused**: Check if MongoDB service is running
- **Authentication**: Verify username/password for MongoDB Atlas
- **Network**: Check firewall settings and network connectivity
