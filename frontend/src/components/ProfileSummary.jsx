function ProfileSummary({ profile }) {
  if (!profile) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Profile information not available</p>
      </div>
    );
  }

  const skills = [
    { name: 'Forehand', rating: profile.forehand_rating || 1 },
    { name: 'Backhand', rating: profile.backhand_rating || 1 },
    { name: 'Serve', rating: profile.serve_rating || 1 },
    { name: 'Footwork', rating: profile.footwork_rating || 1 },
  ];

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRatingColor = (rating) => {
    if (rating >= 8) return 'bg-primary-600';
    if (rating >= 5) return 'bg-primary-500';
    return 'bg-primary-400';
  };

  return (
    <div className="bg-surface rounded-lg shadow-md p-6 border border-theme">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2">
          {profile.display_name || profile.username}
        </h2>
        {profile.playing_level && (
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(
              profile.playing_level
            )}`}
          >
            {profile.playing_level}
          </span>
        )}
      </div>

      {profile.bio && (
        <div className="mb-6">
          <p className="text-secondary">{profile.bio}</p>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-primary mb-4">Skill Ratings</h3>
        <div className="space-y-4">
          {skills.map((skill) => (
            <div key={skill.name}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-secondary">{skill.name}</span>
                <span className="text-sm font-semibold text-primary">{skill.rating}/10</span>
              </div>
              <div className="w-full bg-tertiary rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${getRatingColor(skill.rating)}`}
                  style={{ width: `${(skill.rating / 10) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {(profile.location || profile.website) && (
        <div className="pt-4 border-t border-theme">
          <div className="space-y-2 text-sm text-secondary">
            {profile.location && (
              <div>
                <span className="font-medium">Location:</span> {profile.location}
              </div>
            )}
            {profile.website && (
              <div>
                <span className="font-medium">Website:</span>{' '}
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  {profile.website}
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileSummary;
