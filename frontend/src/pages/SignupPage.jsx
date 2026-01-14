import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import BaseLayout from '@/layouts/BaseLayout';
import Input from '@/components/Input';
import Button from '@/components/Button';

function SignupPage() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
    firstName: '',
    lastName: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.username.trim()) {
      setError('Username is required');
      return false;
    }
    if (formData.username.length < 3) {
      setError('Username must be at least 3 characters long');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    if (formData.password !== formData.passwordConfirm) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await signup(
        formData.email,
        formData.username,
        formData.password,
        formData.passwordConfirm,
        formData.firstName,
        formData.lastName
      );
      if (result.success) {
        navigate('/login', { replace: true });
      } else {
        setError(result.error || 'Signup failed. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BaseLayout>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-primary py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-primary">
              Create your account
            </h2>
            <p className="mt-2 text-center text-sm text-secondary">
              Or{' '}
              <Link
                to="/login"
                className="font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
              >
                sign in to your existing account
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800 dark:text-red-200">{error}</h3>
                  </div>
                </div>
              </div>
            )}
            <div className="space-y-4">
              <Input
                id="email"
                name="email"
                type="email"
                label="Email address"
                autoComplete="email"
                required
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
              <Input
                id="username"
                name="username"
                type="text"
                label="Username"
                autoComplete="username"
                required
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  label="First name"
                  autoComplete="given-name"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  label="Last name"
                  autoComplete="family-name"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                label="Password"
                autoComplete="new-password"
                required
                placeholder="Password (min. 8 characters)"
                value={formData.password}
                onChange={handleChange}
              />
              <Input
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                label="Confirm password"
                autoComplete="new-password"
                required
                placeholder="Confirm password"
                value={formData.passwordConfirm}
                onChange={handleChange}
              />
            </div>

            <div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
                variant="primary"
              >
                {isSubmitting ? 'Creating account...' : 'Sign up'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </BaseLayout>
  );
}

export default SignupPage;
