// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router';

const Sidebar = ({ todos }) => {
  // Helper function to simulate date based on ID
  const generateDate = (id) => {
    const baseDate = new Date(2022, 0, 1); // starting from January 1, 2022
    baseDate.setDate(baseDate.getDate() + (id % 365)); // Simulating a "createdAt" by incrementing days
    return {
      year: baseDate.getFullYear(),
      month: baseDate.getMonth(), // 0-indexed month
      week: Math.ceil(baseDate.getDate() / 7), // Simplified week calculation (1st, 2nd, etc.)
    };
  };

  // Group todos by year, month, and week
  const groupedByYear = todos.reduce((acc, todo) => {
    const { year, month, week } = generateDate(todo.id);
    
    if (!acc[year]) acc[year] = {};
    if (!acc[year][month]) acc[year][month] = {};
    if (!acc[year][month][week]) acc[year][month][week] = [];
    
    acc[year][month][week].push(todo);
    return acc;
  }, {});

  const renderTree = (year, months) => {
    return (
      <div key={year}>
        <h3>{year}</h3>
        {Object.keys(months).map((month) => renderMonth(year, month, months[month]))}
      </div>
    );
  };

  const renderMonth = (year, month, weeks) => {
    return (
      <div key={month}>
        <h4>{new Date(0, month).toLocaleString('default', { month: 'long' })}</h4>
        {Object.keys(weeks).map((week) => renderWeek(year, month, week, weeks[week]))}
      </div>
    );
  };

  const renderWeek = (year, month, week, todos) => {
    return (
      <div key={week}>
        <h5>Week {week}</h5>
        {todos.map((todo) => (
          <div key={todo.id}>
            {/* Link to the dynamic route for this todo */}
            <Link to={`/todoer/${todo.id}`}>{todo.title}</Link>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="sidebar">
      {Object.keys(groupedByYear).map((year) => renderTree(year, groupedByYear[year]))}
    </div>
  );
};

export default Sidebar;
