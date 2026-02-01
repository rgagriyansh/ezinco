import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Check } from 'lucide-react'

export function Pricing() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for solo founders',
      price: '4,999',
      period: 'one-time',
      features: [
        'OPC/LLP Registration',
        'Guided Document Upload',
        'Live Status Tracking',
        'WhatsApp Alerts',
        'Document Vault',
        'Email Support'
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Pro',
      description: 'Most popular for startups',
      price: '7,999',
      period: 'one-time',
      features: [
        'Private Limited Registration',
        'Everything in Starter',
        'AI Document Checker',
        'AI Name Validator',
        'Auto MOA/AOA',
        'Priority CA',
        'Phone Support'
      ],
      cta: 'Get Started',
      popular: true
    },
    {
      name: 'Enterprise',
      description: 'For scaling businesses',
      price: '14,999',
      period: 'one-time',
      features: [
        'Everything in Pro',
        'DPIIT Registration',
        'Trademark Filing',
        'GST Registration',
        'Cap Table Setup',
        'Dedicated Manager',
        'Bank A/C Help'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ]

  const compliancePlans = [
    { name: 'Basic', price: '299', features: ['GST Filing', 'Monthly Reports'] },
    { name: 'Standard', price: '499', features: ['GST + ITR', 'Quarterly ROC'] },
    { name: 'Premium', price: '799', features: ['Full Compliance', 'AGM Support'] }
  ]

  return (
    <section ref={ref} id="pricing" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
          <div className="section-badge mb-3 sm:mb-4">
            <i className="fa-solid fa-tags"></i>
            <span>Pricing</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text mb-4 sm:mb-6">
            Simple, <span className="text-gradient">transparent</span> pricing
          </h2>
          <p className="text-text-muted text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            No hidden fees. Choose the plan that fits your needs.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-12 sm:mb-16 lg:mb-20">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border ${
                plan.popular 
                  ? 'border-primary bg-gradient-to-b from-primary-bg to-white shadow-xl shadow-primary/10' 
                  : 'border-border bg-white'
              } card-hover`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2">
                  <div className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-primary text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 sm:gap-2 shadow-lg whitespace-nowrap">
                    <i className="fa-solid fa-bolt text-xs"></i>
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-5 sm:mb-6 lg:mb-8 pt-2 sm:pt-0">
                <h3 className="text-lg sm:text-xl font-semibold text-text mb-1">{plan.name}</h3>
                <p className="text-text-muted text-xs sm:text-sm">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-5 sm:mb-6 lg:mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-text-muted text-sm sm:text-base">₹</span>
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-text">{plan.price}</span>
                </div>
                <span className="text-text-dim text-xs sm:text-sm">{plan.period}</span>
              </div>

              {/* Features */}
              <ul className="space-y-2 sm:space-y-3 mb-5 sm:mb-6 lg:mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 sm:gap-3 text-text-secondary text-xs sm:text-sm">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-success-bg flex items-center justify-center flex-shrink-0">
                      <Check size={10} className="text-success sm:w-3 sm:h-3" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#"
                className={`block w-full py-2.5 sm:py-3 lg:py-3.5 rounded-full text-center font-semibold text-sm sm:text-base transition-all duration-300 ${
                  plan.popular
                    ? 'bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/25'
                    : 'border border-border text-text hover:border-border-light hover:bg-surface'
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Compliance Subscription */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="card p-5 sm:p-8 lg:p-12"
        >
          <div className="text-center mb-6 sm:mb-8 lg:mb-10">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-text mb-1 sm:mb-2">
              Compliance Subscription
            </h3>
            <p className="text-text-muted text-sm sm:text-base">Stay compliant year-round</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            {compliancePlans.map((plan) => (
              <div 
                key={plan.name}
                className="p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl border border-border bg-surface hover:border-border-light hover:shadow-md transition-all duration-300"
              >
                <div className="text-base sm:text-lg font-semibold text-text mb-1 sm:mb-2">{plan.name}</div>
                <div className="flex items-baseline gap-1 mb-3 sm:mb-4">
                  <span className="text-2xl sm:text-3xl font-display font-bold text-text">₹{plan.price}</span>
                  <span className="text-text-dim text-xs sm:text-sm">/month</span>
                </div>
                <ul className="space-y-1.5 sm:space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-text-muted text-xs sm:text-sm">
                      <Check size={12} className="text-success sm:w-3.5 sm:h-3.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
