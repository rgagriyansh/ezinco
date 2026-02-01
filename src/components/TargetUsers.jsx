import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export function TargetUsers() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const users = [
    {
      icon: 'fa-briefcase',
      title: 'Founders',
      description: 'Incorporating Pvt Ltd/LLP',
      color: 'text-primary',
      bg: 'bg-primary-bg'
    },
    {
      icon: 'fa-user',
      title: 'Freelancers',
      description: 'Formalizing your business',
      color: 'text-accent',
      bg: 'bg-accent-bg'
    },
    {
      icon: 'fa-building',
      title: 'Incubators',
      description: 'Portfolio incorporation',
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      icon: 'fa-graduation-cap',
      title: 'Students',
      description: 'College startup setup',
      color: 'text-orange-500',
      bg: 'bg-orange-50'
    },
    {
      icon: 'fa-shop',
      title: 'MSMEs',
      description: 'GST/ROC services',
      color: 'text-success',
      bg: 'bg-success-bg'
    }
  ]

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
          <div className="section-badge mb-3 sm:mb-4">
            <i className="fa-solid fa-users"></i>
            <span>Who It's For</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text mb-4 sm:mb-6">
            Built for <span className="text-gradient">builders</span>
          </h2>
          <p className="text-text-muted text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            Whether you're a solo founder or managing multiple startups.
          </p>
        </motion.div>

        {/* Users Grid - Horizontal scroll on mobile */}
        <div className="flex gap-3 sm:gap-4 lg:gap-6 overflow-x-auto pb-4 sm:pb-0 sm:overflow-visible sm:flex-wrap sm:justify-center -mx-4 px-4 sm:mx-0 sm:px-0">
          {users.map((user, index) => (
            <motion.div
              key={user.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex-shrink-0 w-[160px] sm:w-auto sm:flex-1 sm:min-w-[180px] sm:max-w-[220px] card p-4 sm:p-5 lg:p-6 card-hover text-center"
            >
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl ${user.bg} flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <i className={`fa-solid ${user.icon} ${user.color} text-lg sm:text-xl`}></i>
              </div>
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-text mb-1 sm:mb-2">{user.title}</h3>
              <p className="text-text-muted text-xs sm:text-sm">{user.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
