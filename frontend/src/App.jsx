import { Routes, Route } from 'react-router-dom'
import BaseLayout from '@/layouts/BaseLayout'
import ProtectedRoute from '@/components/ProtectedRoute'
import LoginPage from '@/pages/LoginPage'
import SignupPage from '@/pages/SignupPage'
import { useAuth } from '@/contexts/AuthContext'

function HomePage() {
  const { user } = useAuth()
  return (
    <BaseLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to SpinForge{user ? `, ${user.username}` : ''}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your community platform is ready to go!
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
            <p className="text-blue-800">
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
    </Routes>
  )
}

export default App
