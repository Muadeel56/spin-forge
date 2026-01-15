import { ThemeProvider } from '@/contexts/ThemeContext'
import ThemeToggle from '@/components/ThemeToggle'
import { Link } from 'react-router-dom'

function AuthLayout({ children }) {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-primary">
        {/* Minimal header for auth pages */}
        <header className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary hover:text-primary-600 transition-colors">
            SpinForge
          </Link>
          <ThemeToggle />
        </header>
        
        {/* Centered content */}
        <main className="grow flex items-center justify-center px-4 py-12">
          {children}
        </main>
        
        {/* Minimal footer */}
        <footer className="py-4 text-center text-sm text-secondary">
          © {new Date().getFullYear()} SpinForge
        </footer>
      </div>
    </ThemeProvider>
  )
}

export default AuthLayout
