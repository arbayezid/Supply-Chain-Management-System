# 🚀 Supply Chain Management System - Installation Guide

## 📋 Prerequisites

### System Requirements
- **Operating System**: Windows 10/11, macOS 10.15+, or Linux (Ubuntu 18.04+)
- **RAM**: Minimum 8GB, Recommended 16GB
- **Storage**: Minimum 10GB free space
- **Network**: Internet connection for package downloads

### Required Software
1. **Node.js** (v18.0.0 or higher)
   - Download from: https://nodejs.org/
   - Verify: `node --version` and `npm --version`

2. **Java Development Kit** (JDK 17 or higher)
   - Download from: https://adoptium.net/ or https://www.oracle.com/java/technologies/
   - Verify: `java --version` and `javac --version`

3. **Maven** (v3.8.0 or higher)
   - Download from: https://maven.apache.org/download.cgi
   - Verify: `mvn --version`
   - **Note**: The project includes Maven wrapper, so global Maven is optional

4. **MongoDB** (v6.0 or higher)
   - **Local Installation**: https://docs.mongodb.com/manual/installation/
   - **Cloud Option**: MongoDB Atlas (free tier available)

## 🛠️ Installation Steps

### Step 1: Clone the Repository
```bash
git clone <your-repository-url>
cd supply-chain-management-system
```

### Step 2: Install Frontend Dependencies
```bash
cd frontend
npm install
```

**Expected Output**: 
- Dependencies installed successfully
- No critical vulnerabilities
- `node_modules` folder created

**Troubleshooting**:
- If you get permission errors: `npm install --unsafe-perm`
- If you get network errors: `npm config set registry https://registry.npmjs.org/`

### Step 3: Install Backend Dependencies
```bash
cd ../backend
# Using Maven wrapper (recommended)
./mvnw clean install

# Or using global Maven
mvn clean install
```

**Expected Output**:
- Dependencies downloaded
- Project compiled successfully
- `target` folder created

**Troubleshooting**:
- If Maven wrapper fails: `chmod +x mvnw` (Linux/Mac) or ensure `mvnw.cmd` is executable (Windows)
- If you get Java version errors, ensure you're using JDK 17+

### Step 4: Configure MongoDB

#### Option A: Local MongoDB
1. **Start MongoDB Service**:
   ```bash
   # Windows (as Administrator)
   net start MongoDB
   
   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

2. **Verify Connection**:
   ```bash
   mongosh
   # Should connect to localhost:27017
   ```

#### Option B: MongoDB Atlas (Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create free account and cluster
3. Get connection string
4. Update `backend/src/main/resources/application.properties`

### Step 5: Configure Environment

#### Frontend Configuration
```bash
cd frontend
# Create environment file (optional)
cp .env.example .env
# Edit .env with your backend URL
```

#### Backend Configuration
```bash
cd backend
# Edit application.properties
nano src/main/resources/application.properties
```

**Key Settings**:
```properties
# MongoDB Connection
spring.data.mongodb.uri=mongodb://localhost:27017/supply_chain_db

# Server Port
server.port=8080

# CORS (for frontend communication)
# Already configured in CorsConfig.java
```

## 🚀 Running the Application

### Start Backend Server
```bash
cd backend
./mvnw spring-boot:run
```

**Expected Output**:
```
Started SupplyChainApplication in X.XXX seconds
```

**Access**: http://localhost:8080

### Start Frontend Development Server
```bash
cd frontend
npm start
```

**Expected Output**:
```
Local:            http://localhost:3000
On Your Network:  http://192.168.x.x:3000
```

**Access**: http://localhost:3000

## 🧪 Testing the Installation

### Backend Health Check
```bash
curl http://localhost:8080/api/health
# Expected: {"status":"UP","timestamp":"..."}
```

### Frontend Test
1. Open http://localhost:3000
2. Navigate through different pages
3. Check if Material-UI components render properly
4. Verify charts and data grids load

### Database Test
```bash
# Using MongoDB Compass or mongosh
mongosh supply_chain_db
# Should connect and show collections
```

## 📊 Available Features

### ✅ Implemented
- **Dashboard**: Statistics, charts, recent activity
- **Inventory Management**: CRUD operations, Data Grid, low stock alerts
- **Revenue Analytics**: Financial metrics, charts, product performance
- **Modern UI**: Material-UI components, responsive design
- **Navigation**: Sidebar, top bar, routing

### 🚧 Coming Soon
- **Order Management**: Order lifecycle, tracking
- **Customer Management**: Customer profiles, relationships
- **Reports**: Advanced analytics, exports
- **Settings**: User preferences, system configuration
- **Authentication**: Login, registration, user management

## 🔧 Development Commands

### Frontend
```bash
cd frontend
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run eject      # Eject from Create React App (irreversible)
```

### Backend
```bash
cd backend
./mvnw spring-boot:run    # Run application
./mvnw test               # Run tests
./mvnw clean              # Clean build artifacts
./mvnw package            # Create JAR file
```

## 🐛 Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :8080
kill -9 <PID>
```

#### 2. MongoDB Connection Failed
```bash
# Check if MongoDB is running
# Windows
sc query MongoDB

# macOS/Linux
sudo systemctl status mongod
```

#### 3. Node Modules Issues
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

#### 4. Maven Build Failed
```bash
cd backend
./mvnw clean
./mvnw install -X  # Verbose output for debugging
```

#### 5. CORS Issues
- Ensure backend is running on port 8080
- Check `CorsConfig.java` configuration
- Verify frontend proxy setting in `package.json`

### Performance Issues
- **Frontend**: Check browser console for errors, clear cache
- **Backend**: Monitor memory usage, check logs
- **Database**: Ensure proper indexing, monitor query performance

## 📱 Mobile Development

### Responsive Design
- The application is fully responsive
- Test on different screen sizes
- Use browser dev tools for mobile simulation

### Progressive Web App
- Installable on mobile devices
- Offline capabilities (coming soon)
- Push notifications (planned)

## 🔒 Security Considerations

### Development Environment
- Never commit sensitive data
- Use environment variables for secrets
- Keep dependencies updated

### Production Deployment
- Enable HTTPS
- Implement proper authentication
- Use environment-specific configurations
- Regular security updates

## 📈 Next Steps

### Immediate
1. **Test all features** thoroughly
2. **Customize theme** and branding
3. **Add sample data** for testing

### Short Term
1. **Implement authentication** system
2. **Add order management** functionality
3. **Create customer management** features

### Long Term
1. **Advanced analytics** and reporting
2. **Mobile app** development
3. **API documentation** and testing
4. **Performance optimization**

## 🆘 Getting Help

### Documentation
- Check this README first
- Review component documentation
- Check Material-UI docs: https://mui.com/

### Support
- Create GitHub issue for bugs
- Check existing issues for solutions
- Review error logs and console output

### Community
- Stack Overflow for general questions
- GitHub Discussions for project-specific help
- Material-UI community for UI issues

---

**🎉 Congratulations!** Your Supply Chain Management System is now running with advanced features from the smart inventory system.

**Next**: Explore the dashboard, test inventory management, and start customizing for your needs!
