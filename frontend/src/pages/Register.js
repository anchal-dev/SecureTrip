// src/pages/Register.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import './Auth.css';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'tourist',
    emergencyContact: {
      name: '',
      phone: '',
      relation: ''
    }
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name.startsWith('emergency_')) {
      const field = e.target.name.replace('emergency_', '');
      setFormData({
        ...formData,
        emergencyContact: {
          ...formData.emergencyContact,
          [field]: e.target.value
        }
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.register(formData);
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      if (user.role === 'tourist') {
        navigate('/tourist/dashboard');
      } else {
        navigate('/authority/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box register-box">
        <h1>🛡️ Tourist Safety System</h1>
        <h2>Register</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password (min 6 characters)"
              minLength="6"
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 9876543210"
              required
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="tourist">Tourist</option>
              <option value="authority">Authority/Police</option>
            </select>
          </div>

          {formData.role === 'tourist' && (
            <>
              <h3>Emergency Contact</h3>
              
              <div className="form-group">
                <label>Contact Name</label>
                <input
                  type="text"
                  name="emergency_name"
                  value={formData.emergencyContact.name}
                  onChange={handleChange}
                  placeholder="Emergency contact name"
                />
              </div>

              <div className="form-group">
                <label>Contact Phone</label>
                <input
                  type="tel"
                  name="emergency_phone"
                  value={formData.emergencyContact.phone}
                  onChange={handleChange}
                  placeholder="Emergency contact phone"
                />
              </div>

              <div className="form-group">
                <label>Relation</label>
                <input
                  type="text"
                  name="emergency_relation"
                  value={formData.emergencyContact.relation}
                  onChange={handleChange}
                  placeholder="e.g., Mother, Father, Friend"
                />
              </div>
            </>
          )}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="auth-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;