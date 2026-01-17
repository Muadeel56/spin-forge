import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import CardMotion from '@/motion/CardMotion';
import Avatar from '@/components/Avatar';
import PostTypeBadge from './PostTypeBadge';
import PostActions from './PostActions';
import CommentList from './CommentList';
import { addComment } from '@/services/postService';

function PostCard({ post, onCommentAdded, onDelete, animationDelay = 0 }) {
  const { user, isAuthenticated } = useAuth();
  const [comments, setComments] = useState(post.comments || []);
  const [isCommenting, setIsCommenting] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const postCardRef = useScrollAnimation({
    animationType: 'slideUp',
    start: 'top 85%',
    delay: animationDelay,
    duration: 0.6,
  });

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'Advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const borderColorClass =
    post.post_type === 'achievement'
      ? 'border-l-4 border-accent-500'
      : post.post_type === 'struggle'
      ? 'border-l-4 border-amber-500'
      : 'border-l-4 border-blue-500';

  const handleAddComment = async (postId, commentData) => {
    setIsCommenting(true);
    try {
      const newComment = await addComment(postId, commentData);
      setComments((prev) => [...prev, newComment]);
      if (onCommentAdded) {
        onCommentAdded(postId, newComment);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    } finally {
      setIsCommenting(false);
    }
  };

  const handleCommentClick = () => {
    setShowComments(true);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(post.id);
    }
  };

  const isAuthor = isAuthenticated && user && user.username === post.author.username;

  return (
    <CardMotion
      as="article"
      ref={postCardRef}
      className={`bg-surface border border-theme rounded-lg p-6 ${borderColorClass}`}
      intensity="medium"
      enableShadow={true}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <Avatar user={post.author} size="md" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="text-base font-semibold text-primary">
              {post.author.display_name || post.author.username}
            </h3>
            {post.author.playing_level && (
              <span
                className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getLevelColor(
                  post.author.playing_level
                )}`}
              >
                {post.author.playing_level}
              </span>
            )}
          </div>
          <div className="mb-2">
            <PostTypeBadge postType={post.post_type} />
          </div>
        </div>
        {isAuthor && (
          <button
            onClick={handleDelete}
            className="p-2 text-tertiary hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            aria-label="Delete post"
            title="Delete post"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className="text-secondary whitespace-pre-wrap break-words leading-relaxed">
          {post.content}
        </p>
      </div>

      {/* Timestamp */}
      <div className="mb-3">
        <span className="text-xs text-tertiary">
          {post.formatted_timestamp || post.created_at}
        </span>
      </div>

      {/* Actions */}
      <PostActions post={post} onCommentClick={handleCommentClick} />

      {/* Comments */}
      {showComments && (
        <CommentList
          postId={post.id}
          comments={comments}
          onAddComment={handleAddComment}
          isLoading={isCommenting}
        />
      )}
    </CardMotion>
  );
}

export default PostCard;
