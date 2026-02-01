import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const steps = [
    {
      icon: 'fa-globe',
      number: '01',
      title: 'Visit Platform',
      description: 'Create your account in seconds.',
      color: 'text-primary',
      bg: 'bg-primary-bg'
    },
    {
      icon: 'fa-users',
      number: '02',
      title: 'Choose CA',
      description: 'Browse verified CAs or auto-assign.',
      color: 'text-accent',
      bg: 'bg-accent-bg'
    },
    {
      icon: 'fa-cloud-arrow-up',
      number: '03',
      title: 'Upload Docs',
      description: 'Guided workflow, never miss a doc.',
      color: 'text-success',
      bg: 'bg-success-bg'
    },
    {
      icon: 'fa-chart-line',
      number: '04',
      title: 'Track Progress',
      description: 'Real-time status on every step.',
      color: 'text-orange-500',
      bg: 'bg-orange-50'
    },
    {
      icon: 'fa-check-double',
      number: '05',
      title: 'Approve',
      description: 'Review drafts via WhatsApp.',
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      icon: 'fa-download',
      number: '06',
      title: 'Get Docs',
      description: 'Download from your vault.',
      color: 'text-pink-600',
      bg: 'bg-pink-50'
    }
  ]

  return (
    <section ref={ref} id="how-it-works" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
          <div className="section-badge mb-3 sm:mb-4">
            <i className="fa-solid fa-route"></i>
            <span>How It Works</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text mb-4 sm:mb-6">
            Six steps to <span className="text-gradient">incorporation</span>
          </h2>
          <p className="text-text-muted text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            From registration to receiving your Certificate of Incorporation.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="card p-4 sm:p-6 lg:p-8 card-hover h-full">
                {/* Number */}
                <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-surface-alt group-hover:text-border transition-colors duration-300 mb-3 sm:mb-4 lg:mb-6">
                  {step.number}
                </div>
                
                {/* Icon */}
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl ${step.bg} flex items-center justify-center mb-2 sm:mb-3 lg:mb-4`}>
                  <i className={`fa-solid ${step.icon} ${step.color} text-sm sm:text-base lg:text-lg`}></i>
                </div>
                
                {/* Content */}
                <h3 className="text-sm sm:text-lg lg:text-xl font-display font-semibold text-text mb-1 sm:mb-2">
                  {step.title}
                </h3>
                <p className="text-text-muted text-xs sm:text-sm hidden sm:block">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-8 sm:mt-12 lg:mt-16 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <a href="#" className="btn-primary inline-flex items-center gap-2 w-full sm:w-auto justify-center">
            <i className="fa-solid fa-rocket"></i>
            Start Your Journey
          </a>
          <Link to="/how-it-works" className="btn-secondary inline-flex items-center gap-2 w-full sm:w-auto justify-center">
            Learn More
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
