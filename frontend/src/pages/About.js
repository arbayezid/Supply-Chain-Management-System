import React from 'react';

const About = () => {
  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">About the System</h1>
        <div className="page-content">
          <div className="card">
            <h2>System Information</h2>
            <p>
              The Supply Chain Management System is a modern, full-stack web application
              designed to streamline and optimize supply chain operations for businesses
              of all sizes.
            </p>
            <p>
              Built with cutting-edge technologies, this system provides a robust,
              scalable, and user-friendly solution for managing complex supply chain
              operations.
            </p>
          </div>
          
          <div className="card">
            <h2>Technology Stack</h2>
            <h3>Frontend</h3>
            <ul>
              <li><strong>React 18:</strong> Modern JavaScript library for building user interfaces</li>
              <li><strong>React Router:</strong> Declarative routing for React applications</li>
              <li><strong>Axios:</strong> Promise-based HTTP client for API communication</li>
              <li><strong>CSS3:</strong> Modern styling with responsive design</li>
            </ul>
            
            <h3>Backend</h3>
            <ul>
              <li><strong>Spring Boot 3.2:</strong> Java-based framework for building production-ready applications</li>
              <li><strong>Spring Data MongoDB:</strong> Data access layer for MongoDB</li>
              <li><strong>Maven:</strong> Build automation and dependency management</li>
              <li><strong>Java 17:</strong> Latest LTS version of Java</li>
            </ul>
            
            <h3>Database</h3>
            <ul>
              <li><strong>MongoDB 6.0+:</strong> NoSQL document database for flexible data storage</li>
            </ul>
          </div>
          
          <div className="card">
            <h2>Features & Capabilities</h2>
            <ul>
              <li>Real-time inventory tracking and management</li>
              <li>Supplier relationship management</li>
              <li>Order processing and fulfillment</li>
              <li>Analytics and reporting dashboard</li>
              <li>Multi-user access with role-based permissions</li>
              <li>RESTful API for third-party integrations</li>
              <li>Responsive design for mobile and desktop</li>
              <li>Secure authentication and authorization</li>
            </ul>
          </div>
          
          <div className="card">
            <h2>Development & Deployment</h2>
            <p>
              This system is designed with modern development practices in mind,
              including version control, automated testing, and continuous integration.
              The modular architecture allows for easy maintenance and future enhancements.
            </p>
            <p>
              The application can be deployed on various cloud platforms and is
              designed to scale with your business needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
