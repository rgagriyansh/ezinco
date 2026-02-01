import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export function Partners() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const partners = [
    { name: 'Startup India', icon: 'fa-flag' },
    { name: 'NASSCOM', icon: 'fa-building' },
    { name: 'T-Hub', icon: 'fa-lightbulb' },
    { name: 'IIM Incubator', icon: 'fa-graduation-cap' },
    { name: 'YCombinator', icon: 'fa-y' },
    { name: 'Google for Startups', icon: 'fa-google', brand: true },
    { name: 'AWS Activate', icon: 'fa-aws', brand: true },
    { name: 'Microsoft Startups', icon: 'fa-microsoft', brand: true },
  ]

  const stats = [
    { value: '10,000+', label: 'Companies Incorporated', icon: 'fa-building' },
    { value: '50+', label: 'Verified CAs', icon: 'fa-user-tie' },
    { value: '4.9/5', label: 'Customer Rating', icon: 'fa-star' },
    { value: '5 Days', label: 'Avg. Completion', icon: 'fa-clock' },
  ]

  return (
    <section ref={ref} className="py-10 sm:py-12 lg:py-16 relative overflow-hidden border-y border-border bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Stats Counter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-10 sm:mb-12 lg:mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-3 sm:p-4 rounded-2xl bg-surface/50"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary-bg flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <i className={`fa-solid ${stat.icon} text-primary text-sm sm:text-base`}></i>
              </div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-text mb-0.5 sm:mb-1">
                {stat.value}
              </div>
              <div className="text-text-muted text-xs sm:text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Partners */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-center text-text-muted text-xs sm:text-sm mb-6 sm:mb-8">
            Trusted by startups backed by leading incubators & accelerators
          </p>
          
          {/* Logo Marquee */}
          <div className="relative overflow-hidden -mx-4 sm:mx-0">
            {/* Gradient Fade Left */}
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            {/* Gradient Fade Right */}
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            
            <div className="flex animate-marquee gap-4 sm:gap-6 lg:gap-12">
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-surface hover:bg-surface-alt transition-colors shrink-0"
                >
                  <i className={`${partner.brand ? 'fa-brands' : 'fa-solid'} ${partner.icon} text-text-muted text-base sm:text-lg lg:text-xl`}></i>
                  <span className="text-text-muted font-medium whitespace-nowrap text-xs sm:text-sm lg:text-base">{partner.name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
