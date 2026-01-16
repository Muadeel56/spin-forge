import { useState } from 'react';
import CommentItem from './CommentItem';
import CommentInput from './CommentInput';
import Button from '@/components/Button';

function CommentList({ postId, comments = [], onAddComment, isLoading = false }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const commentCount = comments.length;

  if (commentCount === 0 && !isExpanded) {
    return (
      <div className="pt-3 border-t border-theme">
        <CommentInput postId={postId} onSubmit={onAddComment} isLoading={isLoading} />
      </div>
    );
  }

  return (
    <div className="pt-3 border-t border-theme">
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="flex items-center gap-2 text-sm text-tertiary hover:text-primary transition-colors mb-3"
        >
          <svg
            className="w-4 h-4"
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
          <span>
            {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
          </span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      ) : (
        <div className="space-y-0">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => setIsExpanded(false)}
              className="flex items-center gap-2 text-sm text-tertiary hover:text-primary transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
              <span>
                {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
              </span>
            </button>
          </div>
          <div
            className={`space-y-0 mb-3 transition-all duration-300 ease-in-out overflow-hidden ${
              isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            {comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </div>
        </div>
      )}
      <CommentInput postId={postId} onSubmit={onAddComment} isLoading={isLoading} />
    </div>
  );
}

export default CommentList;
