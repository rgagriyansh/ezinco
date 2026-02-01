import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'Features', href: '/#features' },
    { label: 'How it Works', href: '/how-it-works', isPage: true },
    { label: 'Pricing', href: '/pricing', isPage: true },
    { label: 'Blog', href: '/blog', isPage: true },
    { label: 'Partner', href: '/partner', isPage: true },
    { label: 'Contact', href: '/contact', isPage: true },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass' : 'bg-white/50 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-lg shadow-primary/25">
                <i className="fa-solid fa-bolt text-white text-sm"></i>
              </div>
              <span className="font-display text-xl font-bold text-text">EzIncorporate</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                item.isPage ? (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`transition-colors duration-300 text-sm font-medium ${
                      location.pathname === item.href 
                        ? 'text-primary' 
                        : 'text-text-muted hover:text-text'
                    }`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-text-muted hover:text-text transition-colors duration-300 text-sm font-medium"
                  >
                    {item.label}
                  </a>
                )
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <Link to="/pricing" className="text-text-muted hover:text-text transition-colors duration-300 text-sm font-medium">
                Calculate Price
              </Link>
              <Link to="/contact" className="btn-primary text-sm">
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-text"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.isPage ? (
                    <Link
                      to={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-2xl font-medium text-text block"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-2xl font-medium text-text block"
                    >
                      {item.label}
                    </a>
                  )}
                </motion.div>
              ))}
              <div className="pt-6 border-t border-border flex flex-col gap-4">
                <Link 
                  to="/pricing" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-text-muted text-lg"
                >
                  Calculate Price
                </Link>
                <Link 
                  to="/contact" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-primary text-center"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
