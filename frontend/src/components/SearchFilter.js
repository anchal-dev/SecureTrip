// src/components/SearchFilter.js
import React, { useState } from 'react';
import './SearchFilter.css';

function SearchFilter({ onFilter }) {
  const [filters, setFilters] = useState({
    search: '',
    severity: 'all',
    status: 'all',
    type: 'all',
    dateRange: 'all'
  });

  const handleChange = (e) => {
    const newFilters = {
      ...filters,
      [e.target.name]: e.target.value
    };
    setFilters(newFilters);
    if (onFilter) {
      onFilter(newFilters);
    }
  };

  const handleReset = () => {
    const resetFilters = {
      search: '',
      severity: 'all',
      status: 'all',
      type: 'all',
      dateRange: 'all'
    };
    setFilters(resetFilters);
    if (onFilter) {
      onFilter(resetFilters);
    }
  };

  return (
    <div className="search-filter-container">
      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          name="search"
          value={filters.search}
          onChange={handleChange}
          placeholder="Search by tourist name, location, or description..."
        />
      </div>

      <div className="filters-row">
        <div className="filter-group">
          <label>Severity</label>
          <select name="severity" value={filters.severity} onChange={handleChange}>
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Status</label>
          <select name="status" value={filters.status} onChange={handleChange}>
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="acknowledged">Acknowledged</option>
            <option value="resolved">Resolved</option>
            <option value="false_alarm">False Alarm</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Type</label>
          <select name="type" value={filters.type} onChange={handleChange}>
            <option value="all">All Types</option>
            <option value="SOS">SOS</option>
            <option value="theft">Theft</option>
            <option value="medical">Medical</option>
            <option value="harassment">Harassment</option>
            <option value="lost_item">Lost Item</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Date Range</label>
          <select name="dateRange" value={filters.dateRange} onChange={handleChange}>
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>

        <button className="reset-btn" onClick={handleReset}>
          🔄 Reset
        </button>
      </div>
    </div>
  );
}

export default SearchFilter;
