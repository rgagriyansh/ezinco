import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

export function FAQ() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [openIndex, setOpenIndex] = useState(0)

  const faqs = [
    {
      question: 'How long does it take to incorporate a company?',
      answer: 'With EzIncorporate, the average incorporation time is 5-7 working days. This includes name approval (1-2 days), document verification (1-2 days), and MCA filing & COI generation (2-3 days).'
    },
    {
      question: 'What documents do I need for Private Limited?',
      answer: 'You\'ll need: PAN Card & Aadhaar of all directors, Address proof, Passport-size photographs, Registered office address proof (utility bill + NOC/rent agreement), and DSC. Our guided upload ensures you don\'t miss any document.'
    },
    {
      question: 'What is the difference between Pvt Ltd, LLP, and OPC?',
      answer: 'Private Limited requires 2+ directors with limited liability. LLP needs 2 partners with lower compliance. OPC is for solo entrepreneurs wanting limited liability with just 1 director.'
    },
    {
      question: 'How much does incorporation cost?',
      answer: 'Our packages start at ₹4,999 for OPC/LLP and ₹7,999 for Private Limited. This includes government fees, professional fees, DSC, and all documentation with no hidden charges.'
    },
    {
      question: 'Can I track my incorporation status in real-time?',
      answer: 'Yes! Our platform provides live status tracking synced with your CA\'s workflow. You\'ll receive instant WhatsApp alerts for every important update.'
    },
    {
      question: 'What happens after incorporation?',
      answer: 'After receiving your COI, you\'ll need post-incorporation compliance like PAN/TAN, bank account, and GST registration. We offer compliance subscription from ₹299/month.'
    }
  ]

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
          <div className="section-badge mb-3 sm:mb-4">
            <i className="fa-solid fa-circle-question"></i>
            <span>FAQ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text mb-4 sm:mb-6">
            Frequently asked <span className="text-gradient">questions</span>
          </h2>
          <p className="text-text-muted text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            Everything you need to know about company incorporation.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`card overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'border-primary shadow-lg shadow-primary/10' : ''
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full p-4 sm:p-5 lg:p-6 flex items-center justify-between text-left gap-4"
              >
                <span className="font-semibold text-text text-sm sm:text-base pr-2">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                    openIndex === index ? 'bg-primary text-white' : 'bg-surface-alt text-text-muted'
                  }`}
                >
                  <ChevronDown size={16} />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-4 sm:px-5 lg:px-6 pb-4 sm:pb-5 lg:pb-6 text-text-muted text-sm sm:text-base leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-8 sm:mt-10 lg:mt-12"
        >
          <p className="text-text-muted text-sm sm:text-base mb-3 sm:mb-4">Still have questions?</p>
          <a href="#" className="btn-primary inline-flex items-center gap-2 text-sm sm:text-base">
            <i className="fa-solid fa-headset"></i>
            Talk to an Expert
          </a>
        </motion.div>
      </div>
    </section>
  )
}
