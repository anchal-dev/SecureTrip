// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { authAPI } from '../services/api';
import LanguageSwitcherSimple from '../components/LanguageSwitcherSimple';
import './Auth.css';

function Login() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.login(formData);
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      if (user.role === 'tourist') {
        navigate('/tourist/dashboard');
      } else if (user.role === 'authority' || user.role === 'admin') {
        navigate('/authority/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1>🛡️ SecureTrip</h1>
          <LanguageSwitcherSimple />
        </div>
        <h2>{t('login')}</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{t('email')}</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t('email')}
              required
            />
          </div>

          <div className="form-group">
            <label>{t('password')}</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={t('password')}
              required
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? t('loading') : t('login')}
          </button>
        </form>

        <p className="auth-link">
          {t('dont_have_account')} <Link to="/register">{t('register_here')}</Link>
        </p>

        <div className="demo-credentials">
          <h4>Demo Credentials:</h4>
          <p><strong>{t('tourist')}:</strong> john@test.com / password123</p>
          <p><strong>{t('authority')}:</strong> officer@police.com / police123</p>
        </div>
      </div>
    </div>
  );
}

export default Login;