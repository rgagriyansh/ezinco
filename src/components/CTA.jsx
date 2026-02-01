import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'

export function CTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-bg via-accent-bg to-purple-50 -z-10" />
      
      {/* Decorative Blobs - Smaller on mobile */}
      <div className="blob w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] bg-primary/10 top-0 left-[10%] sm:left-[20%]" />
      <div className="blob w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] lg:w-[300px] lg:h-[300px] bg-accent/10 bottom-0 right-[5%] sm:right-[10%]" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Main CTA */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-text mb-4 sm:mb-6 leading-tight">
            Ready to incorporate
            <br />
            <span className="text-gradient">the smart way?</span>
          </h2>
          
          <p className="text-text-muted text-sm sm:text-base lg:text-lg xl:text-xl max-w-2xl mx-auto mb-6 sm:mb-8 lg:mb-10 px-4">
            Join 10,000+ founders who've ditched the paperwork chaos. 
            Start your incorporation journey in minutes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 lg:mb-12">
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary text-sm sm:text-base lg:text-lg px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 flex items-center gap-2 sm:gap-3 group w-full sm:w-auto justify-center"
            >
              <i className="fa-solid fa-rocket"></i>
              Start Free Consultation
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1 hidden sm:block" />
            </motion.a>
            <a
              href="#"
              className="btn-secondary text-sm sm:text-base lg:text-lg px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 w-full sm:w-auto justify-center flex items-center gap-2"
            >
              <i className="fa-solid fa-calendar-check"></i>
              Schedule Demo
            </a>
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:gap-6 text-text-muted text-xs sm:text-sm"
          >
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-success" />
              No credit card
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-success" />
              Free consultation
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-success" />
              5-day avg.
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
