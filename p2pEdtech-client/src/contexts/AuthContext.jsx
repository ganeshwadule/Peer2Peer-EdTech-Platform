import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Initialize axios defaults
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('/api/users/me');
          setUser(response.data);
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } catch (error) {
          localStorage.removeItem('token');
          delete axios.defaults.headers.common['Authorization'];
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      const response = await axios.post('/api/users/login', {
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Fetch user details
      const userResponse = await axios.get('/api/users/me');
      setUser(userResponse.data);
      navigate('/');
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during login');
      return false;
    }
  };

  const register = async (registerData) => {
    try {
      setError(null);
      const response = await axios.post('/api/users/register', registerData);
      const { token } = response.data;
      
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Set user data
      setUser(response.data.user);
      navigate('/');
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during registration');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    navigate('/login');
  };

  const updateProfile = async (profileData) => {
    try {
      setError(null);
      const response = await axios.put(`/api/users/${user.id}`, profileData);
      setUser(response.data);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while updating profile');
      return false;
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    clearError,
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export default AuthProvider;


