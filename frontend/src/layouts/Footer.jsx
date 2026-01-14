function Footer() {
  return (
    <footer className="bg-surface border-t border-theme mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-xl font-bold text-primary mb-4">SpinForge</h2>
            <p className="text-secondary text-sm">
              Building communities, one connection at a time.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-primary mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-secondary">
              <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-primary mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-secondary">
              <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-theme">
          <p className="text-center text-sm text-secondary">
            © {new Date().getFullYear()} SpinForge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

