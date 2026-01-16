import Avatar from '@/components/Avatar';

function CommentItem({ comment }) {
  return (
    <div className="flex gap-3 py-3 border-b border-theme-light last:border-b-0">
      <Avatar user={comment.author} size="sm" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-primary">
            {comment.author.display_name || comment.author.username}
          </span>
          <span className="text-xs text-tertiary">
            {comment.formatted_timestamp || comment.created_at}
          </span>
        </div>
        <p className="text-sm text-secondary whitespace-pre-wrap break-words">
          {comment.content}
        </p>
      </div>
    </div>
  );
}

export default CommentItem;
