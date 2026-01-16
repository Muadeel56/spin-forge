import { useState, useEffect } from 'react';
import Button from '@/components/Button';
import PostTypeBadge from './PostTypeBadge';

function CreatePostModal({ isOpen, onClose, onSubmit, isLoading = false }) {
  const [postType, setPostType] = useState('achievement');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      // Reset form when modal opens
      setPostType('achievement');
      setContent('');
      setError('');
    }
  }, [isOpen]);

  useEffect(() => {
    // Prevent body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!content.trim()) {
      setError('Please enter some content for your post.');
      return;
    }

    if (!postType) {
      setError('Please select a post type.');
      return;
    }

    try {
      await onSubmit({
        post_type: postType,
        content: content.trim(),
      });
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to create post. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="relative bg-surface border border-theme rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-theme">
          <h2 className="text-xl font-semibold text-primary">Create Post</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-tertiary hover:text-primary hover:bg-tertiary transition-colors"
            aria-label="Close modal"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Post Type Selection */}
            <div>
              <label className="block text-sm font-medium text-primary mb-3">
                Post Type
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setPostType('achievement')}
                  className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                    postType === 'achievement'
                      ? 'border-accent-500 bg-accent-50 dark:bg-accent-900/20'
                      : 'border-theme hover:border-accent-300'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <PostTypeBadge postType="achievement" />
                    <p className="text-xs text-tertiary mt-1 text-center">
                      Share your wins and progress
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPostType('struggle')}
                  className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                    postType === 'struggle'
                      ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20'
                      : 'border-theme hover:border-amber-300'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <PostTypeBadge postType="struggle" />
                    <p className="text-xs text-tertiary mt-1 text-center">
                      Ask for help and advice
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Content Input */}
            <div>
              <label
                htmlFor="post-content"
                className="block text-sm font-medium text-primary mb-2"
              >
                What's on your mind?
              </label>
              <textarea
                id="post-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={
                  postType === 'achievement'
                    ? 'Share your achievement...'
                    : 'Describe what you need help with...'
                }
                rows={6}
                className="w-full px-3 py-2 border border-theme rounded-md bg-secondary text-primary placeholder-tertiary focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-colors resize-none"
                disabled={isLoading}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-theme">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" loading={isLoading}>
              Post
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePostModal;
