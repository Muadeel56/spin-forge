import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-surface border-t border-theme mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-6">
            <span className="font-semibold text-primary">SpinForge</span>
            <nav className="flex space-x-4 text-sm text-secondary">
              <Link to="/rules" className="hover:text-primary transition-colors">Rules</Link>
              <Link to="/learn" className="hover:text-primary transition-colors">Learn</Link>
            </nav>
          </div>
          <p className="text-sm text-secondary">
            © {new Date().getFullYear()} SpinForge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

