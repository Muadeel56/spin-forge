const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

/**
 * Get authorization header for API requests
 */
const getAuthHeader = () => {
  const token = localStorage.getItem('access_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * Get feed posts with pagination
 */
export const getFeedPosts = async (page = 1, limit = 20) => {
  const response = await fetch(`${API_BASE_URL}/posts/?page=${page}&page_size=${limit}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.detail || 'Failed to fetch posts');
  }

  return {
    posts: data.results || [],
    has_more: !!data.next,
    page: page,
    total: data.count || 0,
  };
};

/**
 * Create a new post
 */
export const createPost = async (postData) => {
  const response = await fetch(`${API_BASE_URL}/posts/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify({
      content: postData.content,
      post_type: postData.post_type,
      related_skill: postData.related_skill || null,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.detail || 'Failed to create post');
  }

  return data;
};

/**
 * Add a comment to a post
 */
export const addComment = async (postId, commentData) => {
  const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify({
      content: commentData.content,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.detail || 'Failed to add comment');
  }

  return data;
};

/**
 * Get a single post by ID with all comments
 */
export const getPostById = async (postId) => {
  const response = await fetch(`${API_BASE_URL}/posts/${postId}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.detail || 'Failed to get post');
  }

  return data;
};

/**
 * Delete a post (author only)
 */
export const deletePost = async (postId) => {
  const response = await fetch(`${API_BASE_URL}/posts/${postId}/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || data.detail || 'Failed to delete post');
  }

  return true;
};

/**
 * Get posts by a specific user
 */
export const getPostsByUser = async (username, page = 1, limit = 20) => {
  const response = await fetch(
    `${API_BASE_URL}/posts/?author=${username}&page=${page}&page_size=${limit}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.detail || 'Failed to fetch user posts');
  }

  return {
    posts: data.results || [],
    has_more: !!data.next,
    page: page,
    total: data.count || 0,
  };
};

/**
 * Get posts by type
 */
export const getPostsByType = async (postType, page = 1, limit = 20) => {
  const response = await fetch(
    `${API_BASE_URL}/posts/?post_type=${postType}&page=${page}&page_size=${limit}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.detail || 'Failed to fetch posts by type');
  }

  return {
    posts: data.results || [],
    has_more: !!data.next,
    page: page,
    total: data.count || 0,
  };
};
