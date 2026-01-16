const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

/**
 * Get authorization header for API requests
 */
const getAuthHeader = () => {
  const token = localStorage.getItem('access_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * Format timestamp to human-readable format
 */
const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) {
    return 'just now';
  }
  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  }
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  }
  if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  }
  return date.toLocaleDateString();
};

/**
 * Mock data for development
 */
const mockPosts = [
  {
    id: 1,
    author: {
      username: 'tabletennis_pro',
      display_name: 'Alex Chen',
      avatar: null,
      playing_level: 'Advanced',
    },
    post_type: 'achievement',
    content: 'Improved serve accuracy today! Hit 8 out of 10 serves exactly where I wanted. The practice is paying off!',
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    comments: [
      {
        id: 1,
        author: {
          username: 'pingpong_master',
          display_name: 'Sarah Kim',
          avatar: null,
        },
        content: 'Great work! Keep it up!',
        created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      },
    ],
  },
  {
    id: 2,
    author: {
      username: 'spin_king',
      display_name: 'Mike Johnson',
      avatar: null,
      playing_level: 'Intermediate',
    },
    post_type: 'struggle',
    content: 'Backhand block feels weak. Any tips on improving backhand technique? I keep missing easy shots.',
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    comments: [
      {
        id: 2,
        author: {
          username: 'tabletennis_pro',
          display_name: 'Alex Chen',
          avatar: null,
        },
        content: 'Try focusing on your wrist position and follow through. Practice with a partner doing slow, controlled blocks.',
        created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 3,
        author: {
          username: 'pingpong_master',
          display_name: 'Sarah Kim',
          avatar: null,
        },
        content: 'I had the same issue! What helped me was keeping my paddle angle more closed and moving my body into the shot.',
        created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      },
    ],
  },
  {
    id: 3,
    author: {
      username: 'racket_warrior',
      display_name: 'Emma Davis',
      avatar: null,
      playing_level: 'Beginner',
    },
    post_type: 'achievement',
    content: 'Won my first local club match today! So excited to keep improving.',
    created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    comments: [],
  },
  {
    id: 4,
    author: {
      username: 'pingpong_master',
      display_name: 'Sarah Kim',
      avatar: null,
      playing_level: 'Advanced',
    },
    post_type: 'struggle',
    content: 'Confused about legal serve rules. When exactly does the ball need to be visible to the opponent?',
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    comments: [
      {
        id: 4,
        author: {
          username: 'tabletennis_pro',
          display_name: 'Alex Chen',
          avatar: null,
        },
        content: 'The ball must be visible at all times during the serve. You cannot hide it with your body, arm, or paddle. The ball should be thrown at least 16cm high and struck on the way down.',
        created_at: new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString(),
      },
    ],
  },
];

/**
 * Get feed posts
 * TODO: Replace with actual API call when backend is ready
 */
export const getFeedPosts = async (page = 1, limit = 10) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Format timestamps for mock data
  const formattedPosts = mockPosts.map((post) => ({
    ...post,
    formatted_timestamp: formatTimestamp(post.created_at),
    comments: post.comments.map((comment) => ({
      ...comment,
      formatted_timestamp: formatTimestamp(comment.created_at),
    })),
  }));

  return {
    posts: formattedPosts,
    has_more: false,
    page,
    total: formattedPosts.length,
  };
};

/**
 * Create a new post
 * TODO: Replace with actual API call when backend is ready
 */
export const createPost = async (postData) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const newPost = {
    id: mockPosts.length + 1,
    author: {
      username: 'current_user', // This would come from auth context
      display_name: 'Current User',
      avatar: null,
      playing_level: 'Intermediate',
    },
    post_type: postData.post_type,
    content: postData.content,
    created_at: new Date().toISOString(),
    comments: [],
    formatted_timestamp: 'just now',
  };

  mockPosts.unshift(newPost);

  return newPost;
};

/**
 * Add a comment to a post
 * TODO: Replace with actual API call when backend is ready
 */
export const addComment = async (postId, commentData) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const post = mockPosts.find((p) => p.id === postId);
  if (!post) {
    throw new Error('Post not found');
  }

  const newComment = {
    id: (post.comments[post.comments.length - 1]?.id || 0) + 1,
    author: {
      username: 'current_user', // This would come from auth context
      display_name: 'Current User',
      avatar: null,
    },
    content: commentData.content,
    created_at: new Date().toISOString(),
    formatted_timestamp: 'just now',
  };

  post.comments.push(newComment);

  return newComment;
};

/**
 * Get a single post by ID
 * TODO: Replace with actual API call when backend is ready
 */
export const getPostById = async (postId) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const post = mockPosts.find((p) => p.id === postId);
  if (!post) {
    throw new Error('Post not found');
  }

  return {
    ...post,
    formatted_timestamp: formatTimestamp(post.created_at),
    comments: post.comments.map((comment) => ({
      ...comment,
      formatted_timestamp: formatTimestamp(comment.created_at),
    })),
  };
};
