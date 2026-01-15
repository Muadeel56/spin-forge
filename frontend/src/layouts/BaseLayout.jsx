import { ThemeProvider } from '@/contexts/ThemeContext'
import Header from './Header'
import Footer from './Footer'

function BaseLayout({ children }) {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-primary">
        <Header />
        <main className="grow animate-fade-in">
          {children}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default BaseLayout

