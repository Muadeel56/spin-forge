function Avatar({ user, size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  };

  const sizeClass = sizes[size] || sizes.md;

  // Get initials from display_name or username
  const getInitials = () => {
    const name = user?.display_name || user?.username || 'U';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Generate a consistent color based on username
  const getColor = () => {
    const username = user?.username || 'user';
    const colors = [
      'bg-primary-500',
      'bg-primary-600',
      'bg-accent-500',
      'bg-accent-600',
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-pink-500',
    ];
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  if (user?.avatar) {
    return (
      <img
        src={user.avatar}
        alt={user.display_name || user.username || 'User'}
        className={`${sizeClass} rounded-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`${sizeClass} ${getColor()} rounded-full flex items-center justify-center text-white font-semibold ${className}`}
      aria-label={user?.display_name || user?.username || 'User'}
    >
      {getInitials()}
    </div>
  );
}

export default Avatar;
