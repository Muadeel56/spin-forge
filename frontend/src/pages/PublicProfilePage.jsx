import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import BaseLayout from '@/layouts/BaseLayout';
import ProfileSummary from '@/components/ProfileSummary';
import Button from '@/components/Button';
import { getPublicProfile } from '@/services/profileService';

function PublicProfilePage() {
  const { username } = useParams();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profileData = await getPublicProfile(username);
        setProfile(profileData);
      } catch (err) {
        setError(err.message || 'Failed to load profile. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    if (username) {
      loadProfile();
    }
  }, [username]);

  const isOwnProfile = isAuthenticated && user?.username === username;

  if (isLoading) {
    return (
      <BaseLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">Loading profile...</div>
        </div>
      </BaseLayout>
    );
  }

  if (error) {
    return (
      <BaseLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">Error</h2>
            <p className="text-red-600 dark:text-red-300">{error}</p>
            <Button
              variant="primary"
              onClick={() => navigate('/')}
              className="mt-4"
            >
              Go Home
            </Button>
          </div>
        </div>
      </BaseLayout>
    );
  }

  if (!profile) {
    return (
      <BaseLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-primary mb-4">Profile Not Found</h2>
            <p className="text-secondary mb-6">The profile you're looking for doesn't exist.</p>
            <Button
              variant="primary"
              onClick={() => navigate('/')}
            >
              Go Home
            </Button>
          </div>
        </div>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          {isOwnProfile && (
            <div className="mb-4 flex justify-end">
              <Link to="/profile/edit">
                <Button variant="primary" size="sm">
                  Edit Profile
                </Button>
              </Link>
            </div>
          )}
        </div>

        <ProfileSummary profile={profile} />

        {!profile.bio && !profile.playing_level && 
         profile.forehand_rating === 1 && profile.backhand_rating === 1 &&
         profile.serve_rating === 1 && profile.footwork_rating === 1 && (
          <div className="mt-6 bg-accent-50 dark:bg-accent-900/20 border border-accent-200 dark:border-accent-800 rounded-lg p-6">
            <p className="text-accent-800 dark:text-accent-200">
              This profile hasn't been set up yet. Check back later!
            </p>
          </div>
        )}
      </div>
    </BaseLayout>
  );
}

export default PublicProfilePage;
