import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import ThemeToggle from '@/components/ThemeToggle'
import Button from '@/components/Button'
import { staggerContainer, staggerItem, mobileMenu } from '@/motion/variants'
import { fast } from '@/motion/transitions'

function Header() {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const isActive = (path) => location.pathname === path

  const navLinks = [
    { to: '/', label: 'Feed' },
    { to: '/learn', label: 'Learn' },
    { to: '/rules', label: 'Rules' },
  ]

  const NavLink = ({ to, label }) => (
    <Link
      to={to}
      className="relative"
      onClick={() => setMobileMenuOpen(false)}
    >
      <motion.span
        className={`transition-colors ${
          isActive(to)
            ? 'text-primary-600 font-semibold'
            : 'text-secondary hover:text-primary'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={fast}
      >
        {label}
      </motion.span>
      {isActive(to) && (
        <motion.div
          layoutId="activeNavLink"
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-600"
          initial={false}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
    </Link>
  )

  return (
    <header className="bg-surface shadow-sm border-b border-theme sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold">
              <motion.span
                className="text-primary hover:text-primary-600 transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={fast}
              >
                SpinForge
              </motion.span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink key={link.to} {...link} />
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {/* Desktop auth actions */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <Link
                    to={`/profile/${user?.username}`}
                    className={`text-sm transition-colors ${
                      location.pathname.startsWith('/profile')
                        ? 'text-primary-600 font-semibold'
                        : 'text-secondary hover:text-primary'
                    }`}
                  >
                    Profile
                  </Link>
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

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden p-2 rounded-md text-secondary hover:text-primary hover:bg-tertiary transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden border-t border-theme"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={mobileMenu}
            >
              <motion.div
                className="py-4 space-y-2"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {navLinks.map((link) => (
                  <motion.div key={link.to} variants={staggerItem}>
                    <Link
                      to={link.to}
                      className={`block py-3 px-2 rounded-md text-base transition-colors ${
                        isActive(link.to)
                          ? 'text-primary-600 font-semibold bg-primary-50 dark:bg-primary-900/20'
                          : 'text-secondary hover:text-primary hover:bg-tertiary'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div
                  className="border-t border-theme pt-4 mt-4 space-y-2"
                  variants={staggerItem}
                >
                  {isAuthenticated ? (
                    <>
                      <Link
                        to={`/profile/${user?.username}`}
                        className={`block py-3 px-2 rounded-md text-base transition-colors ${
                          location.pathname.startsWith('/profile')
                            ? 'text-primary-600 font-semibold bg-primary-50 dark:bg-primary-900/20'
                            : 'text-secondary hover:text-primary hover:bg-tertiary'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        className={`block py-3 px-2 rounded-md text-base transition-colors ${
                          isActive('/settings')
                            ? 'text-primary-600 font-semibold bg-primary-50 dark:bg-primary-900/20'
                            : 'text-secondary hover:text-primary hover:bg-tertiary'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Settings
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout()
                          setMobileMenuOpen(false)
                        }}
                        className="block w-full text-left py-3 px-2 rounded-md text-base text-secondary hover:text-primary hover:bg-tertiary transition-colors"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block py-3 px-2 rounded-md text-base text-secondary hover:text-primary hover:bg-tertiary transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/signup"
                        className="block py-3 px-2 rounded-md text-base text-center bg-primary-600 text-white hover:bg-primary-700 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}

export default Header

