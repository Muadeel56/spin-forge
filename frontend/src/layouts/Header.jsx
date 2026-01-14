import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import ThemeToggle from '@/components/ThemeToggle'
import Button from '@/components/Button'

function Header() {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <header className="bg-surface shadow-sm border-b border-theme">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary hover:text-primary-600 transition-colors">
              SpinForge
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated && (
              <>
                <Link to="/" className="text-secondary hover:text-primary transition-colors">
                  Home
                </Link>
                <Link to="#" className="text-secondary hover:text-primary transition-colors">
                  Explore
                </Link>
                <Link to="#" className="text-secondary hover:text-primary transition-colors">
                  About
                </Link>
              </>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {isAuthenticated ? (
              <>
                <span className="text-sm text-secondary">
                  {user?.username || user?.email}
                </span>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" size="sm">
                    Sign Up
                  </Button>
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

