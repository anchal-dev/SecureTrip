// src/components/AnalyticsDashboard.js
import React from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './AnalyticsDashboard.css';

const COLORS = ['#dc2626', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'];

function AnalyticsDashboard({ stats, alertsByType, alertsBySeverity, alertsOverTime }) {
  // Sample data for demonstration (you'll replace with real data from backend)
  const timelineData = alertsOverTime || [
    { date: 'Mon', alerts: 4 },
    { date: 'Tue', alerts: 7 },
    { date: 'Wed', alerts: 3 },
    { date: 'Thu', alerts: 8 },
    { date: 'Fri', alerts: 5 },
    { date: 'Sat', alerts: 2 },
    { date: 'Sun', alerts: 1 },
  ];

  const severityData = alertsBySeverity || [
    { name: 'Critical', value: 12, color: '#dc2626' },
    { name: 'High', value: 19, color: '#ea580c' },
    { name: 'Medium', value: 15, color: '#f59e0b' },
    { name: 'Low', value: 8, color: '#10b981' },
  ];

  const typeData = alertsByType || [
    { type: 'SOS', count: 25 },
    { type: 'Medical', count: 12 },
    { type: 'Theft', count: 8 },
    { type: 'Lost', count: 6 },
    { type: 'Other', count: 3 },
  ];

  const responseTimeData = [
    { time: '< 5 min', count: 32 },
    { time: '5-10 min', count: 18 },
    { time: '10-15 min', count: 7 },
    { time: '> 15 min', count: 3 },
  ];

  return (
    <div className="analytics-dashboard">
      <h2>📊 Analytics & Insights</h2>

      {/* Key Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">🚨</div>
          <div className="metric-content">
            <h3>{stats?.totalAlerts || 0}</h3>
            <p>Total Alerts</p>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon">⚡</div>
          <div className="metric-content">
            <h3>{stats?.activeAlerts || 0}</h3>
            <p>Active Now</p>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon">✅</div>
          <div className="metric-content">
            <h3>{stats?.resolvedAlerts || 0}</h3>
            <p>Resolved</p>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon">⏱️</div>
          <div className="metric-content">
            <h3>4.2 min</h3>
            <p>Avg Response Time</p>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        {/* Alerts Over Time */}
        <div className="chart-card">
          <h3>📈 Alerts Over Time</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="alerts" stroke="#667eea" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Alerts by Severity */}
        <div className="chart-card">
          <h3>⚠️ Alerts by Severity</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={severityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {severityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Alerts by Type */}
        <div className="chart-card">
          <h3>📋 Alerts by Type</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={typeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#667eea" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Response Time Distribution */}
        <div className="chart-card">
          <h3>⏱️ Response Time Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={responseTimeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="quick-stats">
        <div className="stat-item">
          <span className="stat-label">Peak Alert Hour:</span>
          <span className="stat-value">8:00 PM - 9:00 PM</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Most Common Location:</span>
          <span className="stat-value">Hazratganj Area</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Resolution Rate:</span>
          <span className="stat-value success">94.5%</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Active Officers:</span>
          <span className="stat-value">12</span>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsDashboard;