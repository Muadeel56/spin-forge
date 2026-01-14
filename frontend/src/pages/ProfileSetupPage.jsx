import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import BaseLayout from '@/layouts/BaseLayout';
import SkillRating from '@/components/SkillRating';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { getMyProfile, updateMyProfile } from '@/services/profileService';

function ProfileSetupPage() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    display_name: '',
    bio: '',
    playing_level: '',
    forehand_rating: 1,
    backhand_rating: 1,
    serve_rating: 1,
    footwork_rating: 1,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
      return;
    }

    const loadProfile = async () => {
      try {
        const profile = await getMyProfile();
        setFormData({
          display_name: profile.display_name || user?.username || '',
          bio: profile.bio || '',
          playing_level: profile.playing_level || '',
          forehand_rating: profile.forehand_rating || 1,
          backhand_rating: profile.backhand_rating || 1,
          serve_rating: profile.serve_rating || 1,
          footwork_rating: profile.footwork_rating || 1,
        });
      } catch (err) {
        console.error('Error loading profile:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [isAuthenticated, navigate, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillChange = (skill, value) => {
    setFormData((prev) => ({ ...prev, [skill]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await updateMyProfile(formData);
      navigate('/profile/edit', { replace: true });
    } catch (err) {
      setError(err.message || 'Failed to save profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated || isLoading) {
    return (
      <BaseLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">Loading...</div>
        </div>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Set Up Your Profile</h1>
          <p className="text-secondary">
            Tell us about your table tennis skills and experience
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800 dark:text-red-200">{error}</h3>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-surface rounded-lg shadow-md p-6 border border-theme">
          <div className="mb-6">
            <Input
              id="display_name"
              name="display_name"
              label="Display Name"
              value={formData.display_name}
              onChange={handleChange}
              placeholder={user?.username || 'Your display name'}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="playing_level" className="block text-sm font-medium text-primary mb-2">
              Playing Level
            </label>
            <select
              id="playing_level"
              name="playing_level"
              value={formData.playing_level}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-theme rounded-md shadow-sm focus:outline-none focus:ring-primary-600 focus:border-primary-600 bg-secondary text-primary"
            >
              <option value="">Select your level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="bio" className="block text-sm font-medium text-primary mb-2">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              rows="4"
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-theme rounded-md shadow-sm focus:outline-none focus:ring-primary-600 focus:border-primary-600 bg-secondary text-primary"
              placeholder="Tell us about yourself..."
              maxLength={500}
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{formData.bio.length}/500</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-primary mb-4">Skill Ratings</h3>
            <p className="text-sm text-secondary mb-4">
              Rate your skills from 1 (Beginner) to 10 (Expert)
            </p>
            <SkillRating
              label="Forehand"
              value={formData.forehand_rating}
              onChange={(value) => handleSkillChange('forehand_rating', value)}
            />
            <SkillRating
              label="Backhand"
              value={formData.backhand_rating}
              onChange={(value) => handleSkillChange('backhand_rating', value)}
            />
            <SkillRating
              label="Serve"
              value={formData.serve_rating}
              onChange={(value) => handleSkillChange('serve_rating', value)}
            />
            <SkillRating
              label="Footwork"
              value={formData.footwork_rating}
              onChange={(value) => handleSkillChange('footwork_rating', value)}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/')}
            >
              Skip for Now
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Profile'}
            </Button>
          </div>
        </form>
      </div>
    </BaseLayout>
  );
}

export default ProfileSetupPage;
