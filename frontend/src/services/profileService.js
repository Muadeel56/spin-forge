const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

/**
 * Get authorization header for API requests
 */
const getAuthHeader = () => {
  const token = localStorage.getItem('access_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * Get current user's profile
 */
export const getMyProfile = async () => {
  const response = await fetch(`${API_BASE_URL}/profiles/me/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.detail || 'Failed to get profile');
  }

  return data;
};

/**
 * Update current user's profile
 */
export const updateMyProfile = async (profileData) => {
  const response = await fetch(`${API_BASE_URL}/profiles/me/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify(profileData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.detail || 'Failed to update profile');
  }

  return data;
};

/**
 * Get public profile by username
 */
export const getPublicProfile = async (username) => {
  const response = await fetch(`${API_BASE_URL}/profiles/${username}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.detail || 'Failed to get profile');
  }

  return data;
};
