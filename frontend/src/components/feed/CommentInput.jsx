import { useState } from 'react';
import Button from '@/components/Button';
import Avatar from '@/components/Avatar';
import { useAuth } from '@/contexts/AuthContext';

function CommentInput({ postId, onSubmit, isLoading = false }) {
  const [content, setContent] = useState('');
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() || isLoading) return;

    try {
      await onSubmit(postId, { content: content.trim() });
      setContent('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 pt-3">
      <Avatar
        user={{
          username: user?.username || 'user',
          display_name: user?.username || 'User',
        }}
        size="sm"
      />
      <div className="flex-1 flex gap-2">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 px-3 py-2 text-sm border border-theme rounded-md bg-secondary text-primary placeholder-tertiary focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-colors"
          disabled={isLoading}
        />
        <Button
          type="submit"
          size="sm"
          disabled={!content.trim() || isLoading}
          loading={isLoading}
        >
          Post
        </Button>
      </div>
    </form>
  );
}

export default CommentInput;
