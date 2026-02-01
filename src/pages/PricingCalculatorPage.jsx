import { motion } from 'framer-motion'
import { PricingCalculator } from '../components/PricingCalculator'
import { SEO } from '../components/SEO'
import { CheckCircle, Shield, Clock, Award } from 'lucide-react'

export function PricingCalculatorPage() {
  const benefits = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Transparent Pricing',
      description: 'No hidden charges. What you see is what you pay.'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Fast Processing',
      description: 'Get your company registered in 7-10 working days.'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Expert Support',
      description: 'Dedicated CA/CS for your registration process.'
    }
  ]

  const includedServices = [
    'Name Approval & Reservation',
    'Digital Signature Certificate (DSC)',
    'Director Identification Number (DIN)',
    'MOA & AOA Drafting',
    'Certificate of Incorporation',
    'Company PAN & TAN',
    'First Board Resolution',
    'Share Certificates',
    '30-Day Post-Registration Support'
  ]

  return (
    <div className="min-h-screen pb-16">
      <SEO 
        title="Pricing Calculator - Company Registration Cost Estimator | EZ Incorporate"
        description="Calculate the cost of company registration in India. Get instant estimates for Private Limited, LLP, OPC, and other business structures."
        keywords="company registration cost, pvt ltd registration price, llp registration fees, startup registration cost india, incorporation fees calculator"
        canonical="https://ezincorporate.in/pricing"
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-bg via-white to-accent-bg py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="section-badge mb-4">
              <i className="fa-solid fa-calculator"></i>
              Pricing Calculator
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-text mb-4">
              Calculate Your <span className="text-gradient">Registration Cost</span>
            </h1>
            <p className="text-text-muted text-lg">
              Get instant pricing for company registration. Customize your package and see the breakdown.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calculator */}
            <div className="lg:col-span-2">
              <PricingCalculator />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Benefits */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="card p-6"
              >
                <h3 className="font-display font-bold text-text mb-4">Why Choose Us?</h3>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-bg flex items-center justify-center text-primary flex-shrink-0">
                        {benefit.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-text text-sm">{benefit.title}</h4>
                        <p className="text-text-muted text-xs">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* What's Included */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="card p-6"
              >
                <h3 className="font-display font-bold text-text mb-4">What's Included?</h3>
                <ul className="space-y-2">
                  {includedServices.map((service, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-text-muted">{service}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Trust Badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-gradient-to-br from-primary to-primary-hover rounded-2xl p-6 text-white"
              >
                <div className="text-center">
                  <div className="text-4xl font-bold mb-1">500+</div>
                  <p className="text-white/80 text-sm mb-4">Companies Registered</p>
                  <div className="flex justify-center gap-1">
                    {[1,2,3,4,5].map(i => (
                      <i key={i} className="fa-solid fa-star text-yellow-400"></i>
                    ))}
                  </div>
                  <p className="text-white/60 text-xs mt-2">4.9/5 Customer Rating</p>
                </div>
              </motion.div>

              {/* Contact Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="card p-6 text-center"
              >
                <h3 className="font-semibold text-text mb-2">Need Help?</h3>
                <p className="text-text-muted text-sm mb-4">Talk to our experts for personalized guidance</p>
                <a
                  href="tel:+919871090091"
                  className="btn-secondary w-full py-2 flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-phone"></i>
                  Call Now
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
