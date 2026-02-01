import { motion } from 'framer-motion'
import { ArrowRight, Phone, MessageCircle } from 'lucide-react'

export function BlogCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-primary to-accent shadow-2xl shadow-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          {/* Text */}
          <div className="text-white text-center sm:text-left">
            <p className="font-semibold text-sm sm:text-base">
              Ready to start your business journey?
            </p>
            <p className="text-white/80 text-xs sm:text-sm hidden sm:block">
              Get expert assistance with company registration, compliance & more
            </p>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <motion.a
              href="https://wa.me/919876543210?text=Hi,%20I%20want%20to%20know%20more%20about%20company%20registration"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors"
            >
              <MessageCircle size={16} />
              <span className="hidden sm:inline">WhatsApp</span>
            </motion.a>
            <motion.a
              href="tel:+919876543210"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors"
            >
              <Phone size={16} />
              <span className="hidden sm:inline">Call Now</span>
            </motion.a>
            <motion.a
              href="/#pricing"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-white text-primary px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg"
            >
              Get Started
              <ArrowRight size={16} className="hidden sm:block" />
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  )
}
