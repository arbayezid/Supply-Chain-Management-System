import React from 'react';

const Home = () => {
  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Welcome to Supply Chain Management System</h1>
        <div className="page-content">
          <div className="card">
            <h2>System Overview</h2>
            <p>
              This is a comprehensive supply chain management system that helps businesses
              track inventory, manage suppliers, and optimize their supply chain operations.
            </p>
            <p>
              The system provides real-time visibility into your supply chain, enabling
              better decision-making and improved efficiency.
            </p>
          </div>
          
          <div className="card">
            <h2>Key Features</h2>
            <ul>
              <li>Inventory Management</li>
              <li>Supplier Management</li>
              <li>Order Tracking</li>
              <li>Analytics & Reporting</li>
              <li>Real-time Updates</li>
            </ul>
          </div>
          
          <div className="card">
            <h2>Getting Started</h2>
            <p>
              Navigate to the Items page to start managing your inventory, or visit the
              About page to learn more about the system.
            </p>
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <a href="/items" className="btn">Manage Items</a>
              <a href="/about" className="btn btn-secondary" style={{ marginLeft: '1rem' }}>Learn More</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
