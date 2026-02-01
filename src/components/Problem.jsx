import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export function Problem() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const problems = [
    { icon: 'fa-clock', title: 'Slow', desc: '5-12 days wasted in back-and-forth', color: 'text-red-500', bg: 'bg-red-50' },
    { icon: 'fa-circle-question', title: 'Confusing', desc: 'Complex MCA processes', color: 'text-orange-500', bg: 'bg-orange-50' },
    { icon: 'fa-user-tie', title: 'CA-Dependent', desc: 'No standardized workflow', color: 'text-yellow-500', bg: 'bg-yellow-50' },
    { icon: 'fa-eye-slash', title: 'No Transparency', desc: 'Unclear status updates', color: 'text-purple-500', bg: 'bg-purple-50' },
    { icon: 'fa-triangle-exclamation', title: 'Doc Errors', desc: 'Missing signatures & formats', color: 'text-pink-500', bg: 'bg-pink-50' },
    { icon: 'fa-comments', title: 'Poor Comms', desc: 'Endless calls & emails', color: 'text-blue-500', bg: 'bg-blue-50' }
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
            <i className="fa-solid fa-exclamation-circle"></i>
            <span>The Problem</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text mb-4 sm:mb-6">
            Incorporation is <span className="text-gradient">broken</span>
          </h2>
          <p className="text-text-muted text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4">
            India adds 100,000+ startups yearly. Yet founders still waste weeks 
            on paperwork, unclear processes, and endless follow-ups.
          </p>
        </motion.div>

        {/* Problem Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card p-4 sm:p-5 lg:p-6 card-hover"
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl ${problem.bg} flex items-center justify-center mb-3 sm:mb-4`}>
                <i className={`fa-solid ${problem.icon} ${problem.color} text-sm sm:text-lg`}></i>
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-text mb-1 sm:mb-2">{problem.title}</h3>
              <p className="text-text-muted text-xs sm:text-sm">{problem.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Visual Stat */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 sm:mt-12 lg:mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-6 p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl bg-white border border-border shadow-lg">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-gradient">5-12</div>
            <div className="text-center sm:text-left">
              <div className="text-lg sm:text-xl lg:text-2xl text-text font-semibold">Days Lost</div>
              <div className="text-text-muted text-xs sm:text-sm">Average founder time wasted</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
