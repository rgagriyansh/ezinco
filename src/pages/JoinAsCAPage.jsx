import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  CheckCircle, 
  Users, 
  TrendingUp, 
  Wallet, 
  Clock, 
  Shield,
  Briefcase,
  Award,
  Send,
  Building,
  Phone,
  Mail,
  MapPin,
  FileText,
  AlertCircle
} from 'lucide-react'
import { SEO } from '../components/SEO'

export function JoinAsCAPage() {
  const [formData, setFormData] = useState({
    name: '',
    firmName: '',
    email: '',
    phone: '',
    city: '',
    experience: '',
    memberships: '',
    services: [],
    message: ''
  })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(false)

  const benefits = [
    {
      icon: <Wallet className="w-6 h-6" />,
      title: 'Earn ₹1,500 - ₹5,000 Per Client',
      description: 'Get competitive commission on every successful registration you handle through our platform.'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Ready Client Pipeline',
      description: 'We bring qualified leads to you. No more cold calling or marketing expenses.'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Flexible Working',
      description: 'Work on your own schedule. Accept clients when you have capacity.'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Grow Your Practice',
      description: 'Expand your client base and build long-term relationships for recurring compliance work.'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Platform Support',
      description: 'Get dedicated support, documentation templates, and compliance checklists.'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Recognition & Ratings',
      description: 'Build your reputation with client reviews and earn badges for excellent service.'
    }
  ]

  const services = [
    'Company Registration (Pvt Ltd, LLP, OPC)',
    'GST Registration & Filing',
    'Startup India / DPIIT Recognition',
    'Trademark Registration',
    'Annual Compliance',
    'Income Tax Filing',
    'Audit Services',
    'MSME/Udyam Registration'
  ]

  const stats = [
    { value: '500+', label: 'Partner CAs/Firms' },
    { value: '10,000+', label: 'Clients Served' },
    { value: '₹2Cr+', label: 'Partner Earnings' },
    { value: '4.8/5', label: 'Average Rating' }
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleServiceToggle = (service) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ type: '', message: '' })

    try {
      const apiUrl = import.meta.env.VITE_API_URL || ''
      const res = await fetch(`${apiUrl}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: 'CA/Firm Partnership',
          message: `Firm: ${formData.firmName}\nCity: ${formData.city}\nExperience: ${formData.experience}\nMemberships: ${formData.memberships}\nServices: ${formData.services.join(', ')}\n\n${formData.message}`,
          source: 'ca-partnership-form'
        })
      })

      const data = await res.json()

      if (res.ok) {
        setStatus({ type: 'success', message: 'Thank you for your interest! Our partnership team will contact you within 24 hours.' })
        setFormData({
          name: '',
          firmName: '',
          email: '',
          phone: '',
          city: '',
          experience: '',
          memberships: '',
          services: [],
          message: ''
        })
      } else {
        setStatus({ type: 'error', message: data.error || 'Something went wrong. Please try again.' })
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Network error. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <SEO 
        title="Join as CA/Firm Partner - Earn with EZ Incorporate"
        description="Partner with EZ Incorporate as a CA or firm. Earn ₹1,500-₹5,000 per client. Get ready leads, flexible working, and grow your practice."
        keywords="CA partnership, chartered accountant jobs, firm partnership, company registration partner, earn as CA, CA freelance work"
        canonical="https://ezincorporate.in/partner"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-bg via-white to-accent-bg py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="section-badge mb-4">
              <i className="fa-solid fa-handshake"></i>
              Partner With Us
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-text mb-4">
              Join Our Network of <span className="text-gradient">CA Professionals</span>
            </h1>
            <p className="text-text-muted text-lg mb-8">
              Partner with India's fastest-growing business registration platform. 
              Get qualified leads, earn competitive commissions, and grow your practice.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#apply" className="btn-primary">
                Apply Now
                <i className="fa-solid fa-arrow-right ml-2"></i>
              </a>
              <a href="#benefits" className="btn-secondary">
                View Benefits
              </a>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-5 text-center shadow-card">
                <div className="text-2xl sm:text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-text-muted">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-text mb-4">
              Why Partner with EZ Incorporate?
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              Join 500+ CAs and firms who are growing their practice with us
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-bg flex items-center justify-center text-primary mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-text mb-2">{benefit.title}</h3>
                <p className="text-text-muted text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-primary-bg/50 to-accent-bg/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-text mb-4">
              How It Works
            </h2>
            <p className="text-text-muted">Simple 4-step process to start earning</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Apply', desc: 'Fill out the partnership form below', icon: <FileText /> },
              { step: '2', title: 'Get Verified', desc: 'Our team reviews your credentials', icon: <Shield /> },
              { step: '3', title: 'Receive Leads', desc: 'Get client requests in your dashboard', icon: <Users /> },
              { step: '4', title: 'Earn', desc: 'Complete work and get paid', icon: <Wallet /> }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white rounded-xl p-6 text-center h-full">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-primary-bg flex items-center justify-center text-primary mx-auto mb-3">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-text mb-1">{item.title}</h3>
                  <p className="text-text-muted text-sm">{item.desc}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <i className="fa-solid fa-chevron-right text-primary"></i>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-text mb-4">
              Apply to Become a Partner
            </h2>
            <p className="text-text-muted">Fill out the form below and our team will get in touch within 24 hours</p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-gray-50 rounded-2xl p-6 sm:p-8 space-y-6"
          >
            {status.message && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-4 rounded-lg flex items-center gap-3 ${
                  status.type === 'success' 
                    ? 'bg-green-50 text-green-700 border border-green-200' 
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}
              >
                {status.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                {status.message}
              </motion.div>
            )}

            <div className="grid md:grid-cols-2 gap-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-text mb-1">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="CA John Doe"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Firm Name */}
              <div>
                <label className="block text-sm font-medium text-text mb-1">Firm Name</label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <input
                    type="text"
                    name="firmName"
                    value={formData.firmName}
                    onChange={handleChange}
                    placeholder="ABC & Associates"
                    className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-text mb-1">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="ca@example.com"
                    className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-text mb-1">Phone Number *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+91 98765 43210"
                    className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-text mb-1">City *</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    placeholder="Delhi, Mumbai, Bangalore..."
                    className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-medium text-text mb-1">Years of Experience *</label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white"
                >
                  <option value="">Select experience</option>
                  <option value="0-2">0-2 years</option>
                  <option value="2-5">2-5 years</option>
                  <option value="5-10">5-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>
            </div>

            {/* Memberships */}
            <div>
              <label className="block text-sm font-medium text-text mb-1">Professional Memberships</label>
              <input
                type="text"
                name="memberships"
                value={formData.memberships}
                onChange={handleChange}
                placeholder="ICAI Membership No., CS No., etc."
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Services */}
            <div>
              <label className="block text-sm font-medium text-text mb-3">Services You Can Offer *</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {services.map(service => (
                  <button
                    key={service}
                    type="button"
                    onClick={() => handleServiceToggle(service)}
                    className={`p-2 text-xs rounded-lg border-2 transition-all text-left ${
                      formData.services.includes(service)
                        ? 'border-primary bg-primary-bg text-primary'
                        : 'border-gray-200 hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {formData.services.includes(service) && <CheckCircle size={14} />}
                      <span>{service}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-text mb-1">Additional Information</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                placeholder="Tell us about your practice, specializations, or any questions..."
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading || formData.services.length === 0}
              className="w-full btn-primary py-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Submit Application
                </>
              )}
            </button>

            <p className="text-xs text-text-dim text-center">
              By submitting, you agree to our terms of partnership. We'll review your application within 24 hours.
            </p>
          </motion.form>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-primary-bg/30 to-accent-bg/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-text text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: 'Who can become a partner?',
                a: 'Licensed Chartered Accountants (CAs), Company Secretaries (CS), practicing firms, and legal professionals with relevant experience can apply.'
              },
              {
                q: 'How much can I earn?',
                a: 'Partners typically earn ₹1,500 to ₹5,000 per client depending on the service. Top partners earn ₹50,000+ monthly.'
              },
              {
                q: 'How do I receive leads?',
                a: 'Once approved, you\'ll get access to our partner dashboard where you can view and accept client requests in your area.'
              },
              {
                q: 'When do I get paid?',
                a: 'Payments are processed weekly. You can track your earnings and request payouts from the partner dashboard.'
              },
              {
                q: 'Is there any joining fee?',
                a: 'No, joining is completely free. We only earn when you earn – through a small platform fee on completed services.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-5"
              >
                <h3 className="font-semibold text-text mb-2">{item.q}</h3>
                <p className="text-text-muted text-sm">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
