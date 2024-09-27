import React, {
  createContext, useContext, useState, useEffect, useMemo,
} from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

const defaultUser = {
  model: 'llama2',
  temp: '1',
  sysPrompt: 'You are an assistant.',
  queryHistory: '',
  RAG: {
    chunkSize: 3,
    chunkOffset: 1,
    fileName: '',
    type: '',
    status: null,
    content: '',
    new: false,
  },
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  // Load user data from localStorage when the component mounts
  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          setUser(defaultUser);
        }
      } catch (error) {
        console.error('Failed to load user from localStorage', error);
        setUser(defaultUser);
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  const updateUser = ({ data }) => setUser(data);

  const deleteUser = () => {
    localStorage.removeItem('user');
    setUser(defaultUser);
  };

  const value = useMemo(() => ({
    loading,
    user,
    updateUser,
    deleteUser,
  }), [loading, user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAuth() {
  return useContext(AuthContext);
}
