import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react'
import { ContactForm } from '../components/ContactForm'
import { SEO } from '../components/SEO'

export function ContactPage() {
  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone',
      value: '+91 96671 53779',
      link: 'tel:+919667153779'
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'WhatsApp',
      value: 'Chat with us',
      link: 'https://wa.me/919667153779'
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      value: 'info@ezincorporate.in',
      link: 'mailto:info@ezincorporate.in'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Working Hours',
      value: 'Mon - Sat: 10AM - 7PM',
      link: null
    }
  ]

  return (
    <div className="min-h-screen pb-16">
      <SEO 
        title="Contact Us - Get Free Consultation | EZ Incorporate"
        description="Get in touch with our business registration experts. Free consultation for company registration, GST, trademark, and startup services."
        keywords="contact ez incorporate, company registration consultation, business registration help, startup registration support"
        canonical="https://ezincorporate.in/contact"
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
              <i className="fa-solid fa-headset"></i>
              Contact Us
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-text mb-4">
              Let's Start Your <span className="text-gradient">Business Journey</span>
            </h1>
            <p className="text-text-muted text-lg">
              Get free expert consultation. Our team will guide you through the entire registration process.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-display font-bold text-text mb-4">Get in Touch</h2>
                <p className="text-text-muted">
                  Have questions about company registration? Our experts are here to help you choose the right business structure and guide you through the process.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="grid grid-cols-2 gap-4">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="card p-5"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary-bg flex items-center justify-center text-primary mb-3">
                      {item.icon}
                    </div>
                    <h3 className="font-semibold text-text">{item.title}</h3>
                    {item.link ? (
                      <a href={item.link} className="text-primary hover:underline text-sm">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-text-muted text-sm">{item.value}</p>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Why Contact Us */}
              <div className="bg-gradient-to-br from-primary-bg to-accent-bg rounded-2xl p-6">
                <h3 className="font-display font-bold text-text mb-4">Why Choose EZ Incorporate?</h3>
                <ul className="space-y-3">
                  {[
                    '100% Online Process - No paperwork hassle',
                    'Expert CA/CS Assistance - Professional guidance',
                    'Transparent Pricing - No hidden charges',
                    'Fast Processing - 7-10 working days',
                    'Post-Registration Support - Ongoing compliance help'
                  ].map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                        <i className="fa-solid fa-check text-white text-xs"></i>
                      </div>
                      <span className="text-text-muted text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Office Address */}
              <div className="card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-bg flex items-center justify-center text-primary flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text mb-1">Office Address</h3>
                    <p className="text-text-muted text-sm">
                      Delhi NCR, India<br />
                      (By Appointment Only)
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
