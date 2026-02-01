import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Users, Wallet, TrendingUp, ArrowRight } from 'lucide-react'

export function JoinAsPartner() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-r from-primary to-primary-hover relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
              <i className="fa-solid fa-handshake"></i>
              For CA Professionals & Firms
            </span>
            
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
              Join as a Partner CA/Firm
            </h2>
            
            <p className="text-white/80 text-lg mb-6">
              Partner with us and grow your practice. Get qualified leads, earn competitive commissions, 
              and be part of India's fastest-growing business registration platform.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-2xl font-bold">₹5K+</div>
                <div className="text-xs text-white/70">Per Client</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-xs text-white/70">Partners</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-2xl font-bold">Free</div>
                <div className="text-xs text-white/70">To Join</div>
              </div>
            </div>

            <Link 
              to="/partner" 
              className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Apply Now
              <ArrowRight size={18} />
            </Link>
          </motion.div>

          {/* Right - Benefits Cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {[
              {
                icon: <Wallet className="w-6 h-6" />,
                title: 'Earn ₹1,500 - ₹5,000 Per Client',
                desc: 'Competitive commission on every successful registration'
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: 'Ready Client Pipeline',
                desc: 'We bring qualified leads to you - no marketing needed'
              },
              {
                icon: <TrendingUp className="w-6 h-6" />,
                title: 'Grow Your Practice',
                desc: 'Build long-term client relationships for recurring work'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-xl p-5 flex items-start gap-4 shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-bg flex items-center justify-center text-primary flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-text mb-1">{item.title}</h3>
                  <p className="text-text-muted text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
