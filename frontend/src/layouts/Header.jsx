import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

function Header() {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
              SpinForge
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated && (
              <>
                <Link to="/" className="text-gray-700 hover:text-gray-900 transition-colors">
                  Home
                </Link>
                <Link to="#" className="text-gray-700 hover:text-gray-900 transition-colors">
                  Explore
                </Link>
                <Link to="#" className="text-gray-700 hover:text-gray-900 transition-colors">
                  About
                </Link>
              </>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-700">
                  {user?.username || user?.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header

