function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">SpinForge</h1>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">
              Explore
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">
              About
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Sign In
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
              Sign Up
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header

