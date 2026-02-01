import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

export function AIFeatures() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeFeature, setActiveFeature] = useState(0)

  const aiFeatures = [
    {
      icon: 'fa-file-circle-check',
      title: 'AI Document Checker',
      description: 'Catches mismatches, missing signatures, incorrect formats.',
      color: 'text-primary',
      bg: 'bg-primary-bg',
      demo: {
        title: 'Document Analysis',
        items: [
          { text: 'Signature detected', status: 'success' },
          { text: 'Date format mismatch', status: 'warning' },
          { text: 'All fields filled', status: 'success' },
          { text: 'Address proof needed', status: 'error' }
        ]
      }
    },
    {
      icon: 'fa-magnifying-glass-chart',
      title: 'AI Name Validator',
      description: 'Checks MCA approval probability, domain, trademark.',
      color: 'text-accent',
      bg: 'bg-accent-bg',
      demo: {
        title: '"TechNova Solutions"',
        items: [
          { text: 'MCA: 87% likely', status: 'success' },
          { text: 'Domain available', status: 'success' },
          { text: 'No TM conflicts', status: 'success' },
          { text: 'Similar name exists', status: 'warning' }
        ]
      }
    },
    {
      icon: 'fa-file-code',
      title: 'Auto MOA/AOA',
      description: 'Template engine for your company type.',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      demo: {
        title: 'Generating Docs',
        items: [
          { text: 'Type: Private Limited', status: 'info' },
          { text: 'Capital: ₹10L', status: 'info' },
          { text: 'MOA generated', status: 'success' },
          { text: 'AOA generated', status: 'success' }
        ]
      }
    },
    {
      icon: 'fa-robot',
      title: 'AI Assistant',
      description: 'Guides you on company type and compliance.',
      color: 'text-pink-600',
      bg: 'bg-pink-50',
      demo: {
        title: 'Assistant Response',
        items: [
          { text: 'For 2 founders...', status: 'info' },
          { text: 'Recommend: Pvt Ltd', status: 'success' },
          { text: 'Min capital: ₹1L', status: 'info' },
          { text: 'DPIIT eligible', status: 'success' }
        ]
      }
    }
  ]

  const statusColors = {
    success: { dot: 'bg-success', text: 'text-success' },
    warning: { dot: 'bg-warning', text: 'text-warning' },
    error: { dot: 'bg-red-500', text: 'text-red-500' },
    info: { dot: 'bg-accent', text: 'text-accent' }
  }

  return (
    <section ref={ref} id="ai-tools" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface to-white -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
          <div className="section-badge mb-3 sm:mb-4">
            <i className="fa-solid fa-sparkles"></i>
            <span>Powered by AI</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text mb-4 sm:mb-6">
            Intelligence at <span className="text-gradient">every step</span>
          </h2>
          <p className="text-text-muted text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            Our AI tools catch errors, validate names, and generate documents automatically.
          </p>
        </motion.div>

        {/* AI Features Interactive */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-start">
          {/* Feature Tabs - Horizontal scroll on mobile */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-2 sm:space-y-3 lg:space-y-4 flex lg:block overflow-x-auto pb-4 lg:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 gap-3 lg:gap-0"
          >
            {aiFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setActiveFeature(index)}
                className={`group p-3 sm:p-4 lg:p-5 rounded-xl sm:rounded-2xl border cursor-pointer transition-all duration-300 flex-shrink-0 w-[240px] sm:w-[280px] lg:w-auto ${
                  activeFeature === index
                    ? 'border-primary bg-primary-bg shadow-lg shadow-primary/10'
                    : 'border-border bg-white hover:border-border-light hover:shadow-md'
                }`}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                    activeFeature === index ? 'bg-primary text-white' : feature.bg
                  }`}>
                    <i className={`fa-solid ${feature.icon} text-sm sm:text-base ${activeFeature === index ? '' : feature.color}`}></i>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-text mb-0.5 sm:mb-1 truncate">{feature.title}</h3>
                    <p className="text-text-muted text-xs sm:text-sm line-clamp-2">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Demo Preview */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:sticky lg:top-32"
          >
            <div className="card-elevated p-5 sm:p-6 lg:p-8">
              {/* Terminal Header */}
              <div className="flex items-center gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-400" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400" />
                <span className="ml-2 sm:ml-4 text-[10px] sm:text-xs font-mono text-text-dim">
                  ezinco-ai
                </span>
              </div>

              {/* Demo Content */}
              <div className="font-mono text-xs sm:text-sm">
                <div className="text-text-muted mb-3 sm:mb-4">
                  <span className="text-primary">$</span> {aiFeatures[activeFeature].demo.title}
                </div>
                <div className="space-y-2 sm:space-y-3">
                  {aiFeatures[activeFeature].demo.items.map((item, index) => (
                    <motion.div
                      key={`${activeFeature}-${index}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center gap-2 sm:gap-3"
                    >
                      <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${statusColors[item.status].dot}`} />
                      <span className={`${statusColors[item.status].text} text-xs sm:text-sm`}>
                        {item.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-border">
                  <span className="text-primary">$</span>
                  <span className="typewriter-cursor" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
