import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const services = [
    {
      category: 'Compliance & Filings',
      items: [
        { icon: 'fa-chart-simple', name: 'Annual Compliance', desc: 'GST, ITR, ROC reminders', color: 'text-primary', bg: 'bg-primary-bg' },
        { icon: 'fa-building-flag', name: 'DPIIT Filing', desc: 'Auto-filled & tracked', color: 'text-accent', bg: 'bg-accent-bg' },
        { icon: 'fa-shield-halved', name: 'Trademark', desc: 'One-click submission', color: 'text-purple-600', bg: 'bg-purple-50' }
      ]
    },
    {
      category: 'Business Tools',
      items: [
        { icon: 'fa-chart-pie', name: 'Cap Table', desc: 'Equity, ESOP, vesting', color: 'text-orange-500', bg: 'bg-orange-50' },
        { icon: 'fa-landmark', name: 'Bank A/C', desc: 'Pre-filled KYC', color: 'text-success', bg: 'bg-success-bg' },
        { icon: 'fa-signature', name: 'DSC Booking', desc: 'Digital signatures', color: 'text-pink-600', bg: 'bg-pink-50' }
      ]
    },
    {
      category: 'Premium Services',
      items: [
        { icon: 'fa-file-signature', name: 'Legal Docs', desc: 'NDAs, HR policies', color: 'text-red-500', bg: 'bg-red-50' },
        { icon: 'fa-users-gear', name: 'Startup Hub', desc: 'Payroll, HR, tax', color: 'text-teal-600', bg: 'bg-teal-50' },
        { icon: 'fa-medal', name: 'Compliance', desc: 'From ₹299/mo', color: 'text-yellow-600', bg: 'bg-yellow-50' }
      ]
    }
  ]

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-24 relative overflow-hidden bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
          <div className="section-badge mb-3 sm:mb-4">
            <i className="fa-solid fa-layer-group"></i>
            <span>Beyond Incorporation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text mb-4 sm:mb-6">
            Complete startup <span className="text-gradient">ecosystem</span>
          </h2>
          <p className="text-text-muted text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            Everything your startup needs under one roof.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((section, sectionIndex) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: sectionIndex * 0.15 }}
            >
              <h3 className="text-base sm:text-lg font-semibold text-text mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-border">
                {section.category}
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {section.items.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: sectionIndex * 0.15 + index * 0.1 }}
                    className="group p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white border border-transparent hover:border-border hover:shadow-md transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg ${item.bg} flex items-center justify-center flex-shrink-0`}>
                        <i className={`fa-solid ${item.icon} ${item.color} text-sm sm:text-base`}></i>
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-text font-medium text-sm sm:text-base mb-0.5 group-hover:text-primary transition-colors">
                          {item.name}
                        </h4>
                        <p className="text-text-dim text-xs sm:text-sm truncate">{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
