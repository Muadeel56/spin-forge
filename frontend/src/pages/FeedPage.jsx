import { useState, useEffect } from 'react';
import BaseLayout from '@/layouts/BaseLayout';
import PageTransition from '@/components/PageTransition';
import Button from '@/components/Button';
import EmptyState from '@/components/EmptyState';
import FeedSkeleton from '@/components/feed/FeedSkeleton';
import PostCard from '@/components/feed/PostCard';
import CreatePostModal from '@/components/feed/CreatePostModal';
import { getFeedPosts, createPost } from '@/services/postService';

function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await getFeedPosts();
      setPosts(response.posts || []);
    } catch (err) {
      setError('Failed to load posts. Please try again.');
      console.error('Error loading posts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePost = async (postData) => {
    setIsSubmitting(true);
    try {
      const newPost = await createPost(postData);
      setPosts((prev) => [newPost, ...prev]);
      setIsModalOpen(false);
    } catch (err) {
      throw new Error(err.message || 'Failed to create post');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCommentAdded = (postId, newComment) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, comments: [...(post.comments || []), newComment] }
          : post
      )
    );
  };

  return (
    <BaseLayout>
      <PageTransition>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Create Post Button */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-primary">Community Feed</h1>
          <Button
            variant="primary"
            onClick={() => setIsModalOpen(true)}
            className="min-h-11"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create Post
          </Button>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && <FeedSkeleton count={3} />}

        {/* Empty State */}
        {!isLoading && posts.length === 0 && (
          <EmptyState
            icon={
              <svg
                className="w-full h-full"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            }
            title="No posts yet"
            description="Be the first to share an achievement or ask for help!"
            actionLabel="Create Post"
            onAction={() => setIsModalOpen(true)}
          />
        )}

        {/* Feed */}
        {!isLoading && posts.length > 0 && (
          <div className="space-y-4">
            {posts.map((post, index) => (
              <PostCard
                key={post.id}
                post={post}
                onCommentAdded={handleCommentAdded}
                animationDelay={index * 0.1}
              />
            ))}
          </div>
        )}

        {/* Create Post Modal */}
        <CreatePostModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreatePost}
          isLoading={isSubmitting}
        />
        </div>
      </PageTransition>
    </BaseLayout>
  );
}

export default FeedPage;
