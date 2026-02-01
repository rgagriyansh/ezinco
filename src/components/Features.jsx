import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'

export function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const features = [
    {
      icon: 'fa-store',
      title: 'CA Marketplace',
      description: 'Choose CAs based on reviews, speed, and pricing. Compare and select the best fit for your needs.',
      color: 'text-primary',
      bg: 'bg-primary-bg',
      large: true
    },
    {
      icon: 'fa-file-arrow-up',
      title: 'Guided Upload',
      description: 'A simple form that ensures you never miss a document.',
      color: 'text-accent',
      bg: 'bg-accent-bg'
    },
    {
      icon: 'fa-satellite-dish',
      title: 'Live Tracking',
      description: 'Real-time updates synced with CA workflows.',
      color: 'text-success',
      bg: 'bg-success-bg'
    },
    {
      icon: 'fa-bell',
      title: 'WhatsApp Alerts',
      description: 'Instant notifications for approvals & reviews.',
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      icon: 'fa-vault',
      title: 'Founders Vault',
      description: 'All documents stored securely. Access anytime.',
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    }
  ]

  return (
    <section ref={ref} id="features" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
          <div className="section-badge mb-3 sm:mb-4">
            <i className="fa-solid fa-cubes"></i>
            <span>Core Platform</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text mb-4 sm:mb-6">
            Everything you need to{' '}
            <span className="text-gradient">incorporate</span>
          </h2>
          <p className="text-text-muted text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4">
            A complete suite of tools designed to make company incorporation 
            as simple as ordering online.
          </p>
        </motion.div>

        {/* Features Grid - Bento Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {/* Large Feature Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="sm:col-span-2 group card p-5 sm:p-6 lg:p-8 card-hover relative overflow-hidden"
          >
            <div className="relative z-10">
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl ${features[0].bg} flex items-center justify-center mb-4 sm:mb-6`}>
                <i className={`fa-solid ${features[0].icon} ${features[0].color} text-xl sm:text-2xl`}></i>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-text mb-2 sm:mb-3">
                {features[0].title}
              </h3>
              <p className="text-text-muted text-sm sm:text-base lg:text-lg max-w-md mb-4 sm:mb-6">
                {features[0].description}
              </p>
              <a href="#" className="inline-flex items-center gap-2 text-primary font-semibold text-sm sm:text-base group/link">
                Explore CAs 
                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
              </a>
            </div>

            {/* Visual Element - Hidden on mobile */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-500 hidden sm:block">
              <div className="flex flex-col gap-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3 p-2.5 sm:p-3 rounded-xl border border-border bg-white">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-surface-alt" />
                    <div>
                      <div className="w-16 sm:w-24 h-2 bg-surface-alt rounded" />
                      <div className="w-10 sm:w-16 h-1.5 bg-surface rounded mt-1" />
                    </div>
                    <div className="flex gap-1 ml-auto">
                      {[...Array(5)].map((_, j) => (
                        <div key={j} className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-400" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Regular Feature Cards */}
          {features.slice(1).map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
              className="group card p-4 sm:p-5 lg:p-6 card-hover"
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl ${feature.bg} flex items-center justify-center mb-3 sm:mb-5`}>
                <i className={`fa-solid ${feature.icon} ${feature.color} text-base sm:text-lg`}></i>
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl font-display font-semibold text-text mb-1 sm:mb-2">
                {feature.title}
              </h3>
              <p className="text-text-muted text-xs sm:text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
