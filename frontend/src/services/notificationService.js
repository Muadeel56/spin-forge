const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

import { getAuthHeader } from './authService';

/**
 * Get paginated list of notifications
 */
export const getNotifications = async (page = 1) => {
  const response = await fetch(`${API_BASE_URL}/notifications/?page=${page}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.detail || 'Failed to get notifications');
  }

  return data;
};

/**
 * Get count of unread notifications
 */
export const getUnreadCount = async () => {
  const response = await fetch(`${API_BASE_URL}/notifications/unread-count/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.detail || 'Failed to get unread count');
  }

  return data.count;
};

/**
 * Mark a single notification as read
 */
export const markAsRead = async (notificationId) => {
  const response = await fetch(`${API_BASE_URL}/notifications/${notificationId}/read/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.detail || 'Failed to mark notification as read');
  }

  return data;
};

/**
 * Mark all notifications as read
 */
export const markAllAsRead = async () => {
  const response = await fetch(`${API_BASE_URL}/notifications/mark-all-read/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.detail || 'Failed to mark all as read');
  }

  return data;
};
