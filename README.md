# Supply Chain Management System

A comprehensive, modern web application for managing supply chain operations with advanced features for inventory, orders, suppliers, and analytics.

## 🚀 Features

### Core Modules

#### 1. **Dashboard**
- Real-time supply chain overview
- Key performance indicators (KPIs)
- Interactive charts and visualizations
- Quick access to all modules
- Recent activity alerts and notifications

#### 2. **Inventory Management**
- Stock level tracking and monitoring
- Low stock alerts and notifications
- Category-based organization
- SKU management
- Stock adjustments and transfers
- Inventory value calculations
- Multi-location support

#### 3. **Order Management**
- Complete order lifecycle management
- Customer order processing
- Order status tracking (Pending, Processing, Shipped, Delivered)
- Payment status monitoring
- Order history and analytics
- Multi-item order support

#### 4. **Supplier Management**
- Vendor relationship management
- Performance tracking and ratings
- Contract management
- Payment terms tracking
- Supplier evaluation metrics
- Performance analytics

#### 5. **Customer Management**
- Customer database and profiles
- Order history tracking
- Customer segmentation
- Communication management

#### 6. **Shipment & Logistics**
- Real-time shipment tracking
- Delivery status updates
- Shipping rate management
- Route optimization
- Carrier management

#### 7. **Financial Management**
- Revenue tracking and analytics
- Expense management
- Invoice generation
- Payment processing
- Financial reporting

#### 8. **Analytics & Reports**
- Performance dashboards
- Custom report generation
- Data visualization
- Trend analysis
- Export capabilities

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Material-UI (MUI)** - Professional UI component library
- **React Router** - Client-side routing
- **ApexCharts** - Interactive charts and visualizations
- **React Hook Form** - Form handling and validation

### Backend
- **Node.js** - Server-side JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication and authorization

### Development Tools
- **ESLint** - Code linting and quality
- **Prettier** - Code formatting
- **Git** - Version control

## 📁 Project Structure

```
supply-chain-management/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Main application pages
│   │   ├── hooks/          # Custom React hooks
│   │   ├── utils/          # Utility functions
│   │   └── App.js          # Main application component
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
├── backend/                 # Node.js backend server
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API endpoints
│   │   ├── middleware/     # Custom middleware
│   │   └── server.js       # Server entry point
│   └── package.json        # Backend dependencies
└── README.md               # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/supply-chain-management.git
   cd supply-chain-management
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../backend
   npm install
   ```

4. **Environment Setup**
   Create `.env` files in both frontend and backend directories:
   
   **Backend (.env)**
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/supply-chain
   JWT_SECRET=your-secret-key
   NODE_ENV=development
   ```
   
   **Frontend (.env)**
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

5. **Start the application**
   
   **Backend (Terminal 1)**
   ```bash
   cd backend
   npm run dev
   ```
   
   **Frontend (Terminal 2)**
   ```bash
   cd frontend
   npm start
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📊 Key Features in Detail

### Dashboard Analytics
- **Real-time Metrics**: Live updates of inventory levels, order statuses, and financial data
- **Interactive Charts**: Visual representation of supply chain performance
- **Quick Actions**: One-click access to common tasks
- **Alert System**: Proactive notifications for critical issues

### Inventory Management
- **Smart Alerts**: Automatic notifications for low stock and out-of-stock items
- **Category Management**: Organized product classification
- **Stock Tracking**: Real-time inventory levels across locations
- **Value Analytics**: Total inventory value and cost analysis

### Order Processing
- **Workflow Management**: Streamlined order processing pipeline
- **Status Tracking**: Real-time order status updates
- **Customer Communication**: Automated notifications and updates
- **Payment Integration**: Multiple payment method support

### Supplier Performance
- **Rating System**: Comprehensive supplier evaluation
- **Performance Metrics**: On-time delivery, quality scores, cost effectiveness
- **Contract Management**: Contract lifecycle tracking
- **Analytics**: Supplier performance trends and insights

## 🔧 Configuration

### Database Configuration
The system uses MongoDB with the following collections:
- `users` - User accounts and authentication
- `inventory` - Product and stock information
- `orders` - Customer orders and transactions
- `suppliers` - Vendor information and performance
- `customers` - Customer profiles and history
- `shipments` - Shipping and logistics data

### API Endpoints
- `GET /api/dashboard` - Dashboard data and metrics
- `GET /api/inventory` - Inventory management
- `GET /api/orders` - Order management
- `GET /api/suppliers` - Supplier management
- `GET /api/customers` - Customer management
- `GET /api/shipments` - Shipment tracking

## 🚀 Deployment

### Production Build
```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
npm run build
```

### Environment Variables
Set production environment variables:
```env
NODE_ENV=production
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-secret
PORT=5000
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation wiki

## 🔮 Roadmap

### Upcoming Features
- **AI-Powered Analytics**: Machine learning for demand forecasting
- **Mobile Application**: React Native mobile app
- **Advanced Reporting**: Custom report builder
- **Integration APIs**: Third-party system integrations
- **Real-time Notifications**: Push notifications and alerts
- **Advanced Security**: Role-based access control and audit logs

### Version History
- **v2.0.0** - Enhanced dashboard and analytics
- **v1.5.0** - Supplier performance tracking
- **v1.0.0** - Core inventory and order management

---

**Built with ❤️ for modern supply chain operations**
