import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import BaseLayout from '@/layouts/BaseLayout';
import SkillRating from '@/components/SkillRating';
import { getMyProfile, updateMyProfile } from '@/services/profileService';

function ProfileEditPage() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    display_name: '',
    bio: '',
    playing_level: '',
    forehand_rating: 1,
    backhand_rating: 1,
    serve_rating: 1,
    footwork_rating: 1,
    location: '',
    website: '',
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
          location: profile.location || '',
          website: profile.website || '',
        });
      } catch (err) {
        setError('Failed to load profile. Please try again.');
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
    setSuccess('');
    setIsSubmitting(true);

    try {
      await updateMyProfile(formData);
      setSuccess('Profile updated successfully!');
      setTimeout(() => {
        navigate(`/profile/${user?.username}`, { replace: true });
      }, 1500);
    } catch (err) {
      setError(err.message || 'Failed to update profile. Please try again.');
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Your Profile</h1>
          <p className="text-gray-600">Update your profile information and skill ratings</p>
        </div>

        {error && (
          <div className="mb-6 rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-6 rounded-md bg-green-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">{success}</h3>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <label htmlFor="display_name" className="block text-sm font-medium text-gray-700 mb-2">
              Display Name
            </label>
            <input
              type="text"
              id="display_name"
              name="display_name"
              value={formData.display_name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder={user?.username || 'Your display name'}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="playing_level" className="block text-sm font-medium text-gray-700 mb-2">
              Playing Level
            </label>
            <select
              id="playing_level"
              name="playing_level"
              value={formData.playing_level}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select your level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              rows="4"
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Tell us about yourself..."
              maxLength={500}
            />
            <p className="mt-1 text-sm text-gray-500">{formData.bio.length}/500</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Skill Ratings</h3>
            <p className="text-sm text-gray-600 mb-4">
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

          <div className="mb-6">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your location"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
              Website
            </label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://example.com"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate(`/profile/${user?.username}`)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </BaseLayout>
  );
}

export default ProfileEditPage;
