import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';

function PostActions({ post, onCommentClick }) {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/profile/${post.author.username}`);
  };

  return (
    <div className="flex items-center gap-4 pt-3 border-t border-theme">
      <button
        onClick={onCommentClick}
        className="flex items-center gap-2 text-sm text-tertiary hover:text-primary transition-all duration-200 min-h-11 min-w-11 px-2 hover:scale-105 active:scale-95"
        aria-label="Comment on post"
      >
        <svg
          className="w-5 h-5 transition-transform duration-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        <span>Comment</span>
      </button>

      <button
        onClick={handleViewProfile}
        className="flex items-center gap-2 text-sm text-tertiary hover:text-primary transition-all duration-200 min-h-11 min-w-11 px-2 hover:scale-105 active:scale-95"
        aria-label={`View ${post.author.display_name || post.author.username}'s profile`}
      >
        <svg
          className="w-5 h-5 transition-transform duration-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        <span>Profile</span>
      </button>

      <button
        className="flex items-center gap-2 text-sm text-tertiary hover:text-primary transition-colors min-h-11 min-w-11 px-2 opacity-50 cursor-not-allowed"
        aria-label="Share post (coming soon)"
        disabled
        title="Coming soon"
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
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
          />
        </svg>
        <span>Share</span>
      </button>
    </div>
  );
}

export default PostActions;
