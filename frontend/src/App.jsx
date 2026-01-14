import { Routes, Route } from 'react-router-dom'
import BaseLayout from '@/layouts/BaseLayout'
import ProtectedRoute from '@/components/ProtectedRoute'
import LoginPage from '@/pages/LoginPage'
import SignupPage from '@/pages/SignupPage'
import ProfileSetupPage from '@/pages/ProfileSetupPage'
import ProfileEditPage from '@/pages/ProfileEditPage'
import PublicProfilePage from '@/pages/PublicProfilePage'
import { useAuth } from '@/contexts/AuthContext'

function HomePage() {
  const { user } = useAuth()
  return (
    <BaseLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Welcome to SpinForge{user ? `, ${user.username}` : ''}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Your community platform is ready to go!
          </p>
          <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-6 max-w-2xl mx-auto">
            <p className="text-primary-800 dark:text-primary-200">
              Frontend and backend setup complete. Ready for feature development!
            </p>
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/setup"
        element={
          <ProtectedRoute>
            <ProfileSetupPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/edit"
        element={
          <ProtectedRoute>
            <ProfileEditPage />
          </ProtectedRoute>
        }
      />
      <Route path="/profile/:username" element={<PublicProfilePage />} />
    </Routes>
  )
}

export default App
