import { motion } from 'framer-motion'
import { Typewriter } from './Typewriter'
import { ArrowRight, Play, CheckCircle } from 'lucide-react'

export function Hero() {
  const typewriterWords = [
    'modern',
    'transparent',
    'digital',
    'effortless',
    'smart'
  ]

  const features = [
    { icon: 'fa-store', text: 'CA Marketplace', color: 'text-primary' },
    { icon: 'fa-file-arrow-up', text: 'Guided Uploads', color: 'text-accent' },
    { icon: 'fa-satellite-dish', text: 'Live Tracking', color: 'text-success' },
    { icon: 'fa-whatsapp', text: 'WhatsApp Alerts', color: 'text-green-600', brand: true },
    { icon: 'fa-vault', text: 'Secure Vault', color: 'text-purple-500' },
  ]

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-12 lg:pt-20 lg:pb-0">
      {/* Background Elements - Hidden on mobile for performance */}
      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full bg-surface-alt -z-10 lg:clip-path-polygon" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }} />
      
      {/* Gradient Blobs - Smaller on mobile */}
      <div className="blob w-[300px] h-[300px] lg:w-[600px] lg:h-[600px] bg-primary-bg -top-[10%] -right-[20%] lg:-right-[5%] -z-5" />
      <div className="blob w-[250px] h-[250px] lg:w-[500px] lg:h-[500px] bg-accent-bg -bottom-[10%] lg:-bottom-[20%] right-[10%] lg:right-[20%] -z-5" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="section-badge mb-4 lg:mb-6 inline-flex"
            >
              <i className="fa-solid fa-rocket"></i>
              <span className="text-xs sm:text-sm">Trusted by 10,000+ Founders</span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-[1.15] tracking-tight mb-4 lg:mb-6 text-text">
              Incorporation made{' '}
              <span className="text-primary block sm:inline">
                <Typewriter 
                  words={typewriterWords}
                  speed={80}
                  deleteSpeed={40}
                  pauseTime={2500}
                />
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg lg:text-xl text-text-muted leading-relaxed mb-6 lg:mb-8 max-w-xl mx-auto lg:mx-0">
              The one-stop platform for company incorporation and startup affairs. 
              Fast, CA-verified, and fully digital.
            </p>

            {/* Feature Pills - Scrollable on mobile */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 mb-6 lg:mb-10">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="pill flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2"
                >
                  <i className={`${feature.brand ? 'fa-brands' : 'fa-solid'} ${feature.icon} ${feature.color}`}></i>
                  <span className="whitespace-nowrap">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-6 lg:mb-10"
            >
              <a href="#" className="btn-primary flex items-center justify-center gap-2 group w-full sm:w-auto">
                Start Incorporation
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a href="#" className="btn-secondary flex items-center justify-center gap-2 w-full sm:w-auto">
                <Play size={16} className="fill-current" />
                Watch Demo
              </a>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-6 text-xs sm:text-sm text-text-muted"
            >
              <span className="flex items-center gap-1.5 sm:gap-2">
                <CheckCircle size={14} className="text-success" />
                100% Online
              </span>
              <span className="hidden sm:block w-1 h-1 bg-border-light rounded-full" />
              <span className="flex items-center gap-1.5 sm:gap-2">
                <CheckCircle size={14} className="text-success" />
                MCA Compliant
              </span>
              <span className="hidden sm:block w-1 h-1 bg-border-light rounded-full" />
              <span className="flex items-center gap-1.5 sm:gap-2">
                <CheckCircle size={14} className="text-success" />
                Expert Support
              </span>
            </motion.div>
          </motion.div>

          {/* Right Visuals - Mobile version */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:h-[500px]"
          >
            {/* Mobile: Simplified single card */}
            <div className="lg:hidden">
              <div className="card-elevated p-5 sm:p-6 max-w-sm mx-auto">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold text-text text-sm sm:text-base">Incorporation Status</span>
                  <span className="text-xs font-bold text-success bg-success-bg px-2 sm:px-3 py-1 rounded-full">In Progress</span>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <div className="flex justify-between text-xs text-text-muted mb-2">
                      <span>Documents Verified</span>
                      <span>3/4</span>
                    </div>
                    <div className="h-2 bg-surface-alt rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full animate-progress" style={{ width: '75%' }} />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2.5 sm:p-3 bg-surface rounded-xl">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-accent-bg flex items-center justify-center text-accent">
                      <i className="fa-solid fa-file-contract text-sm"></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-text">MOA Drafting</div>
                      <div className="text-xs text-text-muted">Pending CA Review</div>
                    </div>
                    <i className="fa-solid fa-chevron-right text-text-dim text-xs"></i>
                  </div>
                </div>
                {/* WhatsApp notification inline for mobile */}
                <div className="mt-4 p-3 rounded-xl bg-green-50 border border-green-200">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                      <i className="fa-brands fa-whatsapp text-white text-sm"></i>
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs text-green-700 font-medium">WhatsApp Alert</div>
                      <div className="text-xs text-green-600 truncate">PAN application approved!</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop: Floating cards */}
            <div className="hidden lg:block h-full">
              {/* Main Dashboard Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="card-elevated p-6 w-[340px] absolute top-[15%] right-[80px] animate-float"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold text-text">Incorporation Status</span>
                  <span className="text-xs font-bold text-success bg-success-bg px-3 py-1 rounded-full">In Progress</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs text-text-muted mb-2">
                      <span>Documents Verified</span>
                      <span>3/4</span>
                    </div>
                    <div className="h-2 bg-surface-alt rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full animate-progress" style={{ width: '75%' }} />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-surface rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-accent-bg flex items-center justify-center text-accent">
                      <i className="fa-solid fa-file-contract"></i>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-text">MOA Drafting</div>
                      <div className="text-xs text-text-muted">Pending CA Review</div>
                    </div>
                    <i className="fa-solid fa-chevron-right text-text-dim text-sm"></i>
                  </div>
                </div>
              </motion.div>

              {/* WhatsApp Notification Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="card-elevated p-5 w-[280px] absolute bottom-[15%] right-[40px] animate-float-delayed"
              >
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                    <i className="fa-brands fa-whatsapp text-xl"></i>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-text-muted mb-1">EzIncorporate Bot</div>
                    <div className="text-sm font-medium text-text leading-snug">
                      Your PAN application has been approved! Tap to view details.
                    </div>
                    <div className="text-xs text-text-dim mt-2">Just now</div>
                  </div>
                </div>
              </motion.div>

              {/* CA Profile Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="card-elevated p-4 w-[220px] absolute top-[40%] left-[-20px] flex items-center gap-3 animate-float-delayed-2"
              >
                <div className="w-12 h-12 rounded-full bg-primary-bg flex items-center justify-center text-primary font-bold shrink-0">
                  RS
                </div>
                <div>
                  <div className="text-sm font-bold text-text">Rahul Sharma</div>
                  <div className="text-xs text-text-muted">Chartered Accountant</div>
                  <div className="flex text-xs text-yellow-400 mt-1 gap-0.5">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
