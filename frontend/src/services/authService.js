const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

// Token storage keys
const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

/**
 * Get stored access token
 */
export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

/**
 * Get stored refresh token
 */
export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

/**
 * Store tokens in localStorage
 */
export const setTokens = (accessToken, refreshToken) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

/**
 * Remove tokens from localStorage
 */
export const removeTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

/**
 * Get authorization header for API requests
 */
export const getAuthHeader = () => {
  const token = getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * User signup
 */
export const signup = async (email, username, password, passwordConfirm, firstName = '', lastName = '') => {
  const response = await fetch(`${API_BASE_URL}/auth/signup/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      username,
      password,
      password_confirm: passwordConfirm,
      first_name: firstName,
      last_name: lastName,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.detail || 'Signup failed');
  }

  // Store tokens
  if (data.tokens) {
    setTokens(data.tokens.access, data.tokens.refresh);
  }

  return data;
};

/**
 * User login
 */
export const login = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.detail || 'Login failed');
  }

  // Store tokens
  if (data.tokens) {
    setTokens(data.tokens.access, data.tokens.refresh);
  }

  return data;
};

/**
 * User logout
 */
export const logout = async () => {
  const refreshToken = getRefreshToken();

  if (refreshToken) {
    try {
      await fetch(`${API_BASE_URL}/auth/logout/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
        body: JSON.stringify({
          refresh: refreshToken,
        }),
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  // Remove tokens regardless of API call success
  removeTokens();
};

/**
 * Get current user profile
 */
export const getCurrentUser = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/user/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    if (response.status === 401) {
      // Token expired or invalid, try to refresh
      const refreshed = await refreshToken();
      if (refreshed) {
        // Retry with new token
        return getCurrentUser();
      }
      throw new Error('Authentication failed');
    }
    throw new Error(data.error || data.detail || 'Failed to get user');
  }

  return data;
};

/**
 * Refresh access token
 */
export const refreshToken = async () => {
  const refreshTokenValue = getRefreshToken();

  if (!refreshTokenValue) {
    return false;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refresh: refreshTokenValue,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      removeTokens();
      return false;
    }

    // Update access token
    if (data.access) {
      localStorage.setItem(ACCESS_TOKEN_KEY, data.access);
      return true;
    }

    return false;
  } catch (error) {
    console.error('Token refresh error:', error);
    removeTokens();
    return false;
  }
};
