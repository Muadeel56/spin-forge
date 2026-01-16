import { Routes, Route } from 'react-router-dom'
import BaseLayout from '@/layouts/BaseLayout'
import ProtectedRoute from '@/components/ProtectedRoute'
import LoginPage from '@/pages/LoginPage'
import SignupPage from '@/pages/SignupPage'
import ProfileSetupPage from '@/pages/ProfileSetupPage'
import ProfileEditPage from '@/pages/ProfileEditPage'
import PublicProfilePage from '@/pages/PublicProfilePage'
import FeedPage from '@/pages/FeedPage'
import LearnPage from '@/pages/LearnPage'
import RulesPage from '@/pages/RulesPage'
import SettingsPage from '@/pages/SettingsPage'
import NotFoundPage from '@/pages/NotFoundPage'

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/profile/:username" element={<PublicProfilePage />} />
      
      {/* Main navigation routes */}
      <Route path="/" element={<ProtectedRoute><FeedPage /></ProtectedRoute>} />
      <Route path="/learn" element={<LearnPage />} />
      <Route path="/rules" element={<RulesPage />} />
      
      {/* Protected routes */}
      <Route path="/profile/setup" element={<ProtectedRoute><ProfileSetupPage /></ProtectedRoute>} />
      <Route path="/profile/edit" element={<ProtectedRoute><ProfileEditPage /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
      
      {/* 404 catch-all */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
