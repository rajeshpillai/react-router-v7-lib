// src/components/Dashboard.jsx
import React from 'react';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div>
        <h2>Todo Statistics</h2>
        <p>Total Todos: 50</p>
        <p>Completed: 30</p>
        <p>Pending: 20</p>
      </div>
      <div>
        <h3>Todo Completion Chart</h3>
        {/* You can add chart components here */}
      </div>
    </div>
  );
};

export default Dashboard;
