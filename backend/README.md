# Supply Chain Management System - Backend

This is the Spring Boot backend for the Supply Chain Management System.

## Prerequisites

- Java JDK 17 or higher
- Maven 3.6 or higher
- MongoDB (local or cloud)

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Build the project:
```bash
mvn clean install
```

## Running the Application

### Development Mode
```bash
mvn spring-boot:run
```

### Production Mode
```bash
mvn clean package
java -jar target/supply-chain-management-0.0.1-SNAPSHOT.jar
```

The application will start on [http://localhost:8080](http://localhost:8080)

## Project Structure

```
src/main/java/com/supplychain/
├── SupplyChainApplication.java    # Main application class
├── config/                       # Configuration classes
│   └── CorsConfig.java          # CORS configuration
├── controller/                   # REST controllers
│   ├── HelloController.java     # Health check controller
│   └── ItemController.java      # Item CRUD operations
├── model/                       # Entity models
│   └── Item.java               # Item entity
├── repository/                  # Data access layer
│   └── ItemRepository.java     # Item repository interface
└── service/                     # Business logic layer
    ├── ItemService.java         # Item service interface
    └── impl/
        └── ItemServiceImpl.java # Item service implementation
```

## API Endpoints

### Health Check
- `GET /api/hello` - Simple hello message
- `GET /api/health` - Health status

### Items Management
- `GET /api/items` - Get all items
- `GET /api/items/{id}` - Get item by ID
- `POST /api/items` - Create new item
- `PUT /api/items/{id}` - Update item
- `DELETE /api/items/{id}` - Delete item

### Search Operations
- `GET /api/items/search/name?name={name}` - Search by name
- `GET /api/items/search/supplier?supplier={supplier}` - Search by supplier
- `GET /api/items/low-stock` - Find low stock items
- `GET /api/items/search/price-range?minPrice={min}&maxPrice={max}` - Search by price range

### Utility Operations
- `PATCH /api/items/{id}/quantity?quantity={qty}` - Update quantity
- `GET /api/items/exists?name={name}&supplier={supplier}` - Check if item exists

## Database Configuration

### Local MongoDB
Update `application.properties`:
```properties
spring.data.mongodb.host=localhost
spring.data.mongodb.port=27017
spring.data.mongodb.database=supply_chain_db
```

### MongoDB Atlas (Cloud)
Update `application.properties`:
```properties
spring.data.mongodb.uri=mongodb+srv://username:password@cluster.mongodb.net/supply_chain_db?retryWrites=true&w=majority
```

## CORS Configuration

CORS is configured to allow requests from the React frontend at `http://localhost:3000`.

## Features

- **RESTful API**: Full CRUD operations for items
- **Data Validation**: Bean validation for request data
- **Error Handling**: Comprehensive error responses
- **Search Functionality**: Multiple search criteria
- **MongoDB Integration**: Spring Data MongoDB with custom queries
- **CORS Support**: Cross-origin resource sharing enabled

## Testing

Run tests with:
```bash
mvn test
```

## Logging

Logging is configured for debugging. Check console output for:
- Application startup messages
- Database connection status
- API request/response logs

## Troubleshooting

1. **MongoDB Connection Issues**: Ensure MongoDB is running and accessible
2. **Port Conflicts**: Change port in `application.properties` if 8080 is in use
3. **Java Version**: Ensure you're using Java 17 or higher
4. **Maven Issues**: Try `mvn clean` and rebuild if you encounter build problems
