import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

export function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeIndex, setActiveIndex] = useState(0)

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Founder & CEO',
      company: 'TechVentures Pvt Ltd',
      image: 'PS',
      color: 'bg-primary',
      quote: 'EzIncorporate made our company registration incredibly smooth. What used to take weeks was done in just 5 days. The WhatsApp updates kept us informed at every step!',
      rating: 5
    },
    {
      name: 'Rahul Mehta',
      role: 'Co-Founder',
      company: 'GreenLeaf Solutions LLP',
      image: 'RM',
      color: 'bg-accent',
      quote: 'As a first-time founder, I was overwhelmed by the incorporation process. EzIncorporate\'s guided workflow and AI assistant made everything crystal clear.',
      rating: 5
    },
    {
      name: 'Ananya Patel',
      role: 'Director',
      company: 'CloudNine Technologies',
      image: 'AP',
      color: 'bg-purple-500',
      quote: 'The CA marketplace feature is brilliant! I could compare different professionals and choose the one that fit my budget. Transparent and hassle-free.',
      rating: 5
    },
    {
      name: 'Vikram Singh',
      role: 'Founder',
      company: 'FinEdge Capital',
      image: 'VS',
      color: 'bg-orange-500',
      quote: 'From name approval to getting our COI, everything was tracked in real-time. The document vault is a lifesaver for keeping all our legal documents organized.',
      rating: 5
    },
    {
      name: 'Sneha Reddy',
      role: 'CEO',
      company: 'HealthFirst India',
      image: 'SR',
      color: 'bg-pink-500',
      quote: 'We incorporated our healthcare startup through EzIncorporate. Their compliance dashboard now helps us stay on top of all our regulatory requirements.',
      rating: 5
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

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
            <i className="fa-solid fa-heart"></i>
            <span>Loved by Founders</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text mb-4 sm:mb-6">
            What our <span className="text-gradient">founders</span> say
          </h2>
          <p className="text-text-muted text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            Join thousands of happy founders who've simplified their incorporation journey with us.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Main Testimonial */}
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="card-elevated p-5 sm:p-8 lg:p-12 text-center">
              {/* Quote Icon */}
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary-bg flex items-center justify-center mx-auto mb-4 sm:mb-6 lg:mb-8">
                <i className="fa-solid fa-quote-left text-primary text-lg sm:text-2xl"></i>
              </div>

              {/* Quote */}
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-text leading-relaxed mb-4 sm:mb-6 lg:mb-8 font-medium">
                "{testimonials[activeIndex].quote}"
              </p>

              {/* Rating */}
              <div className="flex justify-center gap-1 mb-4 sm:mb-6">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <i key={i} className="fa-solid fa-star text-yellow-400 text-sm sm:text-base"></i>
                ))}
              </div>

              {/* Author */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full ${testimonials[activeIndex].color} flex items-center justify-center text-white font-bold text-sm sm:text-lg`}>
                  {testimonials[activeIndex].image}
                </div>
                <div className="text-center sm:text-left">
                  <div className="font-semibold text-text text-sm sm:text-base">{testimonials[activeIndex].name}</div>
                  <div className="text-text-muted text-xs sm:text-sm">{testimonials[activeIndex].role}, {testimonials[activeIndex].company}</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-6 sm:mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 sm:h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'bg-primary w-6 sm:w-8' 
                    : 'bg-border hover:bg-border-light w-2.5 sm:w-3'
                }`}
              />
            ))}
          </div>

          {/* Side Previews - Hidden on mobile and tablet */}
          <div className="hidden xl:flex absolute top-1/2 -translate-y-1/2 left-0 right-0 justify-between pointer-events-none px-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 0.5, x: 0 } : {}}
              className="card p-4 w-48 opacity-50"
            >
              <div className={`w-10 h-10 rounded-full ${testimonials[(activeIndex - 1 + testimonials.length) % testimonials.length].color} flex items-center justify-center text-white font-bold text-sm mb-2`}>
                {testimonials[(activeIndex - 1 + testimonials.length) % testimonials.length].image}
              </div>
              <div className="text-sm font-medium text-text truncate">
                {testimonials[(activeIndex - 1 + testimonials.length) % testimonials.length].name}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 0.5, x: 0 } : {}}
              className="card p-4 w-48 opacity-50"
            >
              <div className={`w-10 h-10 rounded-full ${testimonials[(activeIndex + 1) % testimonials.length].color} flex items-center justify-center text-white font-bold text-sm mb-2`}>
                {testimonials[(activeIndex + 1) % testimonials.length].image}
              </div>
              <div className="text-sm font-medium text-text truncate">
                {testimonials[(activeIndex + 1) % testimonials.length].name}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
