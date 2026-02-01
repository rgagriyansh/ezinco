import { ArrowUpRight } from 'lucide-react'

export function Footer() {
  const footerLinks = {
    'Services': [
      'Pvt Ltd Registration',
      'LLP Registration',
      'OPC Registration',
      'Trademark Filing',
      'GST Registration'
    ],
    'Company': [
      'About Us',
      'How It Works',
      'Pricing',
      'Blog',
      'Contact',
      'Partner with Us'
    ],
    'Resources': [
      'Help Center',
      'Documentation',
      'Legal Templates',
      'Compliance Guide'
    ],
    'Legal': [
      'Privacy Policy',
      'Terms of Service',
      'Refund Policy'
    ]
  }

  return (
    <footer className="relative border-t border-border bg-surface">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12 lg:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <a href="#" className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/25">
                <i className="fa-solid fa-bolt text-white text-xs sm:text-sm"></i>
              </div>
              <span className="font-display text-lg sm:text-xl font-bold text-text">EzIncorporate</span>
            </a>
            <p className="text-text-muted text-xs sm:text-sm mb-4 sm:mb-6 max-w-xs">
              India's smartest incorporation platform. Making company formation 
              transparent, fast, and hassle-free.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <a href="mailto:hello@ezincorporate.in" className="flex items-center gap-2 sm:gap-3 text-text-muted hover:text-primary transition-colors">
                <i className="fa-solid fa-envelope text-text-dim w-4"></i>
                hello@ezincorporate.in
              </a>
              <a href="tel:+919667153779" className="flex items-center gap-2 sm:gap-3 text-text-muted hover:text-primary transition-colors">
                <i className="fa-solid fa-phone text-text-dim w-4"></i>
                +91 96671 53779
              </a>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-text font-semibold text-sm sm:text-base mb-3 sm:mb-4">{category}</h4>
              <ul className="space-y-2 sm:space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="text-text-muted text-xs sm:text-sm hover:text-primary transition-colors duration-200 inline-flex items-center gap-1 group"
                    >
                      {link}
                      <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 lg:py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 lg:gap-8">
            <div className="text-center md:text-left">
              <h4 className="text-text font-semibold text-sm sm:text-base mb-1">Stay updated</h4>
              <p className="text-text-muted text-xs sm:text-sm">Get incorporation tips and compliance updates.</p>
            </div>
            <div className="flex gap-2 sm:gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-48 lg:w-64 px-3 sm:px-4 py-2.5 sm:py-3 rounded-full bg-white border border-border text-text text-sm placeholder:text-text-dim focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
              />
              <button className="btn-primary text-sm px-4 sm:px-6 py-2.5 sm:py-3 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-text-muted text-xs sm:text-sm">
            <p>© 2026 EzIncorporate. All rights reserved.</p>
            <div className="flex items-center gap-4 sm:gap-6">
              <a href="#" className="hover:text-primary transition-colors text-base sm:text-lg">
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a href="#" className="hover:text-primary transition-colors text-base sm:text-lg">
                <i className="fa-brands fa-linkedin"></i>
              </a>
              <a href="#" className="hover:text-primary transition-colors text-base sm:text-lg">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="#" className="hover:text-primary transition-colors text-base sm:text-lg">
                <i className="fa-brands fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
