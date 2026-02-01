import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

export function Solution() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const benefits = [
    'Choose from 50+ verified CAs & firms',
    'Upload documents through guided workflow',
    'Track live incorporation progress',
    'Get instant WhatsApp alerts',
    'Access all documents in secure vault'
  ]

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="section-badge mb-3 sm:mb-4 inline-flex">
              <i className="fa-solid fa-lightbulb"></i>
              <span>The Solution</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text mb-4 sm:mb-6 leading-tight">
              A smoother, transparent,{' '}
              <span className="text-gradient">automated</span> way
            </h2>
            <p className="text-text-muted text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0">
              EzIncorporate is a digital incorporation and compliance platform 
              that brings transparency, speed, and simplicity to company formation.
            </p>

            {/* Benefits List */}
            <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-10 text-left max-w-md mx-auto lg:mx-0">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-2 sm:gap-3 text-text-secondary text-sm sm:text-base"
                >
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-success-bg flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={12} className="text-success sm:w-3.5 sm:h-3.5" />
                  </div>
                  {benefit}
                </motion.li>
              ))}
            </ul>

            <motion.a
              href="#how-it-works"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-4 transition-all duration-300"
            >
              See how it works <ArrowRight size={18} />
            </motion.a>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main Card */}
            <div className="card-elevated p-5 sm:p-6 lg:p-8">
              {/* Status Bar */}
              <div className="flex items-center justify-between mb-5 sm:mb-6 lg:mb-8 pb-4 sm:pb-6 border-b border-border">
                <div>
                  <div className="text-xs sm:text-sm text-text-muted mb-0.5 sm:mb-1">Incorporation Status</div>
                  <div className="text-base sm:text-lg lg:text-xl font-semibold text-text">TechCorp Pvt Ltd</div>
                </div>
                <div className="px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-success-bg text-success text-xs sm:text-sm font-semibold whitespace-nowrap">
                  In Progress
                </div>
              </div>

              {/* Progress Steps */}
              <div className="space-y-4 sm:space-y-5">
                {[
                  { step: 'Name Approval', status: 'completed', date: 'Jan 28' },
                  { step: 'Document Upload', status: 'completed', date: 'Jan 29' },
                  { step: 'MCA Filing', status: 'current', date: 'In Progress' },
                  { step: 'DSC Verification', status: 'pending', date: 'Upcoming' },
                  { step: 'COI Generation', status: 'pending', date: 'Upcoming' }
                ].map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-3 sm:gap-4"
                  >
                    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      item.status === 'completed' 
                        ? 'bg-success text-white' 
                        : item.status === 'current'
                        ? 'bg-primary-bg border-2 border-primary'
                        : 'bg-surface-alt border border-border'
                    }`}>
                      {item.status === 'completed' ? (
                        <i className="fa-solid fa-check text-xs"></i>
                      ) : (
                        <span className="text-xs font-semibold text-text-muted">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`font-medium text-sm sm:text-base ${item.status === 'pending' ? 'text-text-muted' : 'text-text'}`}>
                        {item.step}
                      </div>
                    </div>
                    <div className={`text-xs sm:text-sm font-medium ${item.status === 'current' ? 'text-primary' : 'text-text-dim'}`}>
                      {item.date}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* WhatsApp Alert */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 1 }}
                className="mt-5 sm:mt-6 lg:mt-8 p-3 sm:p-4 rounded-xl bg-green-50 border border-green-200"
              >
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                    <i className="fa-brands fa-whatsapp text-white text-base sm:text-lg"></i>
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm text-green-700 font-semibold">WhatsApp Alert</div>
                    <div className="text-xs text-green-600 truncate sm:whitespace-normal">MCA has approved your company name!</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Floating Element - Hidden on small mobile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white shadow-xl border border-border hidden sm:block"
            >
              <div className="text-xl sm:text-2xl font-display font-bold text-primary">5 Days</div>
              <div className="text-xs text-text-muted">Avg. Completion</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
