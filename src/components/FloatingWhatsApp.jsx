import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { X } from 'lucide-react'

export function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-16 sm:bottom-20 right-0 w-[280px] sm:w-80 card-elevated overflow-hidden"
          >
            {/* Header */}
            <div className="bg-green-500 p-3 sm:p-4 text-white">
              <div className="flex items-center justify-between mb-1 sm:mb-2">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <i className="fa-brands fa-whatsapp text-base sm:text-xl"></i>
                  </div>
                  <div>
                    <div className="font-semibold text-sm sm:text-base">EzIncorporate</div>
                    <div className="text-[10px] sm:text-xs text-white/80">Replies instantly</div>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="p-3 sm:p-4 bg-[#e5ddd5] min-h-[120px] sm:min-h-[150px]">
              <div className="bg-white rounded-lg p-2.5 sm:p-3 shadow-sm max-w-[90%]">
                <p className="text-xs sm:text-sm text-gray-800">
                  👋 Hi! Welcome to EzIncorporate.
                </p>
                <p className="text-xs sm:text-sm text-gray-800 mt-1 sm:mt-2">
                  How can we help with your incorporation?
                </p>
                <span className="text-[9px] sm:text-[10px] text-gray-500 mt-1 block text-right">Just now</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-3 sm:p-4 bg-white border-t border-gray-100">
              <p className="text-[10px] sm:text-xs text-text-muted mb-2 sm:mb-3">Quick questions:</p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {['Pricing', 'Timeline', 'Documents'].map((q) => (
                  <a
                    key={q}
                    href={`https://wa.me/919667153779?text=Hi, I have a question about ${q.toLowerCase()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs rounded-full border border-green-500 text-green-600 hover:bg-green-50 transition-colors"
                  >
                    {q}
                  </a>
                ))}
              </div>
              <a
                href="https://wa.me/919667153779?text=Hi, I'm interested in incorporating my company"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 sm:mt-4 w-full py-2.5 sm:py-3 bg-green-500 text-white rounded-full flex items-center justify-center gap-2 font-medium text-sm hover:bg-green-600 transition-colors"
              >
                <i className="fa-brands fa-whatsapp"></i>
                Start Chat
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg flex items-center justify-center transition-colors ${
          isOpen ? 'bg-gray-600' : 'bg-green-500 hover:bg-green-600'
        }`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={20} className="text-white sm:w-6 sm:h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="whatsapp"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <i className="fa-brands fa-whatsapp text-white text-xl sm:text-2xl"></i>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Pulse Animation */}
      {!isOpen && (
        <span className="absolute -top-0.5 -right-0.5 sm:top-0 sm:right-0 w-3 h-3 sm:w-4 sm:h-4">
          <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 sm:h-4 sm:w-4 bg-green-500"></span>
        </span>
      )}
    </div>
  )
}
