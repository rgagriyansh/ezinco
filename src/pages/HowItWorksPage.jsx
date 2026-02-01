import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react'

export function HowItWorksPage() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const steps = [
    {
      number: '01',
      title: 'Create Your Account',
      subtitle: 'Get started in 30 seconds',
      description: 'Sign up with your email or phone number. No paperwork, no lengthy forms—just quick verification and you\'re in.',
      icon: 'fa-user-plus',
      color: 'primary',
      features: ['Email/Phone signup', 'Instant verification', 'Secure authentication'],
      visual: 'signup'
    },
    {
      number: '02',
      title: 'Choose Your Company Type',
      subtitle: 'AI-powered recommendations',
      description: 'Our AI assistant helps you pick the right structure—Private Limited, LLP, or OPC—based on your business needs.',
      icon: 'fa-building',
      color: 'accent',
      features: ['AI recommendations', 'Comparison tool', 'Expert consultation'],
      visual: 'company-type'
    },
    {
      number: '03',
      title: 'Select a Verified CA',
      subtitle: 'Browse 50+ professionals',
      description: 'Compare CAs based on ratings, pricing, and turnaround time. Or let us auto-assign the best match for you.',
      icon: 'fa-users',
      color: 'purple-600',
      features: ['Verified profiles', 'Transparent pricing', 'Reviews & ratings'],
      visual: 'ca-selection'
    },
    {
      number: '04',
      title: 'Upload Documents',
      subtitle: 'Guided step-by-step process',
      description: 'Our smart form guides you through each document. AI checks for errors before submission.',
      icon: 'fa-cloud-arrow-up',
      color: 'success',
      features: ['AI document checker', 'Auto-fill fields', 'Missing doc alerts'],
      visual: 'upload'
    },
    {
      number: '05',
      title: 'Track Progress Live',
      subtitle: 'Real-time status updates',
      description: 'Watch your incorporation progress in real-time. Get WhatsApp alerts for every milestone and action needed.',
      icon: 'fa-chart-line',
      color: 'orange-500',
      features: ['Live dashboard', 'WhatsApp alerts', 'Timeline view'],
      visual: 'tracking'
    },
    {
      number: '06',
      title: 'Get Your COI',
      subtitle: 'Download from your vault',
      description: 'Receive your Certificate of Incorporation and all documents in your secure digital vault. You\'re officially incorporated!',
      icon: 'fa-trophy',
      color: 'pink-500',
      features: ['Secure vault', 'One-click download', 'Compliance ready'],
      visual: 'complete'
    }
  ]

  return (
    <div ref={containerRef} className="min-h-screen bg-bg">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-bg via-white to-white -z-10" />
        <div className="blob w-[600px] h-[600px] bg-primary/10 -top-[20%] -right-[10%]" />
        <div className="blob w-[400px] h-[400px] bg-accent/10 top-[20%] -left-[10%]" />

        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="section-badge mb-6">
              <i className="fa-solid fa-route"></i>
              <span>How It Works</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-text mb-6 leading-tight">
              From idea to{' '}
              <span className="text-gradient">incorporated</span>
              <br />in 6 simple steps
            </h1>
            <p className="text-xl text-text-muted mb-10 max-w-2xl mx-auto">
              Our streamlined process takes the confusion out of company registration. 
              See exactly how we'll get you incorporated.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/" className="btn-primary flex items-center gap-2">
                <i className="fa-solid fa-rocket"></i>
                Start Incorporation
              </Link>
              <a href="#steps" className="btn-secondary flex items-center gap-2">
                See the Process
                <ChevronRight size={18} />
              </a>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16"
          >
            {[
              { value: '5 Days', label: 'Average Time' },
              { value: '6 Steps', label: 'Simple Process' },
              { value: '100%', label: 'Online' }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-display font-bold text-primary">{stat.value}</div>
                <div className="text-text-muted text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Progress Bar */}
      <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-xl border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4 overflow-x-auto">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center shrink-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-${step.color} text-white`}>
                  {step.number}
                </div>
                <span className="ml-2 text-sm font-medium text-text hidden md:block">{step.title.split(' ').slice(0, 2).join(' ')}</span>
                {index < steps.length - 1 && (
                  <ChevronRight size={16} className="ml-4 text-text-dim hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <section id="steps" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          {steps.map((step, index) => (
            <StepSection key={step.number} step={step} index={index} isLast={index === steps.length - 1} />
          ))}
        </div>
      </section>

      {/* Form Preview Section */}
      <FormPreviewSection />

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary-bg via-accent-bg to-purple-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-text mb-6">
              Ready to get started?
            </h2>
            <p className="text-text-muted text-lg mb-10">
              Join 10,000+ founders who've made incorporation simple.
            </p>
            <Link to="/" className="btn-primary text-lg px-10 py-5 inline-flex items-center gap-3">
              <i className="fa-solid fa-rocket"></i>
              Start Your Incorporation
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

// Individual Step Section Component
function StepSection({ step, index, isLast }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const isEven = index % 2 === 0

  const colorClasses = {
    'primary': { bg: 'bg-primary-bg', text: 'text-primary', fill: 'bg-primary' },
    'accent': { bg: 'bg-accent-bg', text: 'text-accent', fill: 'bg-accent' },
    'purple-600': { bg: 'bg-purple-50', text: 'text-purple-600', fill: 'bg-purple-600' },
    'success': { bg: 'bg-success-bg', text: 'text-success', fill: 'bg-success' },
    'orange-500': { bg: 'bg-orange-50', text: 'text-orange-500', fill: 'bg-orange-500' },
    'pink-500': { bg: 'bg-pink-50', text: 'text-pink-500', fill: 'bg-pink-500' }
  }

  const colors = colorClasses[step.color]

  return (
    <div ref={ref} className={`relative ${!isLast ? 'pb-32' : ''}`}>
      {/* Connector Line */}
      {!isLast && (
        <div className="absolute left-1/2 top-full h-32 w-px bg-gradient-to-b from-border to-transparent -translate-x-1/2 hidden lg:block" />
      )}

      <div className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -40 : 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className={!isEven ? 'lg:order-2' : ''}
        >
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${colors.bg} ${colors.text} text-sm font-semibold mb-4`}>
            <span className="font-display text-lg">Step {step.number}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-text mb-2">
            {step.title}
          </h2>
          <p className={`text-lg ${colors.text} font-medium mb-4`}>{step.subtitle}</p>
          <p className="text-text-muted text-lg mb-8 leading-relaxed">
            {step.description}
          </p>
          <ul className="space-y-3">
            {step.features.map((feature, i) => (
              <motion.li
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-3 text-text-secondary"
              >
                <div className={`w-6 h-6 rounded-full ${colors.bg} flex items-center justify-center`}>
                  <CheckCircle2 size={14} className={colors.text} />
                </div>
                {feature}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? 40 : -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={!isEven ? 'lg:order-1' : ''}
        >
          <StepVisual step={step} colors={colors} />
        </motion.div>
      </div>
    </div>
  )
}

// Visual Component for each step
function StepVisual({ step, colors }) {
  const visuals = {
    'signup': (
      <div className="card-elevated p-6">
        <div className="text-center mb-6">
          <div className={`w-16 h-16 rounded-2xl ${colors.bg} flex items-center justify-center mx-auto mb-4`}>
            <i className={`fa-solid ${step.icon} ${colors.text} text-2xl`}></i>
          </div>
          <h3 className="font-semibold text-text">Create Account</h3>
        </div>
        <div className="space-y-4">
          <div className="p-3 rounded-xl border border-border flex items-center gap-3">
            <i className="fa-solid fa-envelope text-text-muted"></i>
            <input type="text" placeholder="Email address" className="flex-1 bg-transparent outline-none text-sm" disabled />
          </div>
          <div className="p-3 rounded-xl border border-border flex items-center gap-3">
            <i className="fa-solid fa-phone text-text-muted"></i>
            <input type="text" placeholder="Phone number" className="flex-1 bg-transparent outline-none text-sm" disabled />
          </div>
          <button className={`w-full py-3 rounded-full ${colors.fill} text-white font-semibold`}>
            Continue
          </button>
        </div>
      </div>
    ),
    'company-type': (
      <div className="card-elevated p-6">
        <h3 className="font-semibold text-text mb-4">Select Company Type</h3>
        <div className="space-y-3">
          {[
            { type: 'Private Limited', desc: 'Best for funded startups', selected: true },
            { type: 'LLP', desc: 'Ideal for partnerships', selected: false },
            { type: 'OPC', desc: 'For solo founders', selected: false }
          ].map((item) => (
            <div key={item.type} className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${item.selected ? `border-${step.color} ${colors.bg}` : 'border-border hover:border-border-light'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-text">{item.type}</div>
                  <div className="text-text-muted text-sm">{item.desc}</div>
                </div>
                {item.selected && <i className={`fa-solid fa-check-circle ${colors.text}`}></i>}
              </div>
            </div>
          ))}
        </div>
        <div className={`mt-4 p-3 rounded-lg ${colors.bg} flex items-center gap-2`}>
          <i className={`fa-solid fa-robot ${colors.text}`}></i>
          <span className="text-sm text-text-muted">AI recommends: <strong className="text-text">Private Limited</strong></span>
        </div>
      </div>
    ),
    'ca-selection': (
      <div className="card-elevated p-6">
        <h3 className="font-semibold text-text mb-4">Choose Your CA</h3>
        <div className="space-y-3">
          {[
            { name: 'Rahul Sharma', rating: 5, price: '₹7,999', time: '5 days', selected: true },
            { name: 'Priya Patel', rating: 4.8, price: '₹6,999', time: '7 days', selected: false }
          ].map((ca) => (
            <div key={ca.name} className={`p-4 rounded-xl border-2 ${ca.selected ? 'border-purple-500 bg-purple-50' : 'border-border'}`}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">
                  {ca.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-text">{ca.name}</div>
                  <div className="flex items-center gap-2 text-xs text-text-muted">
                    <span className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => <i key={i} className="fa-solid fa-star"></i>)}
                    </span>
                    {ca.rating}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-text">{ca.price}</div>
                  <div className="text-xs text-text-muted">{ca.time}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    'upload': (
      <div className="card-elevated p-6">
        <h3 className="font-semibold text-text mb-4">Upload Documents</h3>
        <div className="space-y-3">
          {[
            { name: 'PAN Card', status: 'uploaded', icon: 'fa-id-card' },
            { name: 'Aadhaar Card', status: 'uploaded', icon: 'fa-address-card' },
            { name: 'Address Proof', status: 'pending', icon: 'fa-file-invoice' },
            { name: 'Photograph', status: 'pending', icon: 'fa-image' }
          ].map((doc) => (
            <div key={doc.name} className={`p-3 rounded-xl border flex items-center gap-3 ${doc.status === 'uploaded' ? 'border-success bg-success-bg' : 'border-border'}`}>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${doc.status === 'uploaded' ? 'bg-success text-white' : 'bg-surface-alt text-text-muted'}`}>
                <i className={`fa-solid ${doc.icon}`}></i>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-text">{doc.name}</div>
              </div>
              {doc.status === 'uploaded' ? (
                <i className="fa-solid fa-check-circle text-success"></i>
              ) : (
                <button className="text-xs text-primary font-medium">Upload</button>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 rounded-lg bg-success-bg text-sm text-success flex items-center gap-2">
          <i className="fa-solid fa-shield-check"></i>
          AI verified: No issues found
        </div>
      </div>
    ),
    'tracking': (
      <div className="card-elevated p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-text">Live Status</h3>
          <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-semibold">In Progress</span>
        </div>
        <div className="space-y-4">
          {[
            { step: 'Name Approval', status: 'done', date: 'Jan 28' },
            { step: 'DSC Generation', status: 'done', date: 'Jan 29' },
            { step: 'MCA Filing', status: 'current', date: 'Today' },
            { step: 'COI Generation', status: 'pending', date: 'Upcoming' }
          ].map((item, i) => (
            <div key={item.step} className="flex items-center gap-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                item.status === 'done' ? 'bg-success text-white' :
                item.status === 'current' ? 'bg-orange-500 text-white animate-pulse' :
                'bg-surface-alt text-text-muted'
              }`}>
                {item.status === 'done' ? <i className="fa-solid fa-check text-xs"></i> : i + 1}
              </div>
              <div className="flex-1">
                <div className={`font-medium ${item.status === 'pending' ? 'text-text-muted' : 'text-text'}`}>{item.step}</div>
              </div>
              <span className={`text-sm ${item.status === 'current' ? 'text-orange-500 font-medium' : 'text-text-dim'}`}>{item.date}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 rounded-lg bg-green-50 border border-green-200 flex items-center gap-3">
          <i className="fa-brands fa-whatsapp text-green-600 text-xl"></i>
          <div className="text-sm">
            <div className="text-green-700 font-medium">New Alert!</div>
            <div className="text-green-600 text-xs">MCA filing submitted successfully</div>
          </div>
        </div>
      </div>
    ),
    'complete': (
      <div className="card-elevated p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center mx-auto mb-4 animate-pulse">
          <i className="fa-solid fa-trophy text-white text-3xl"></i>
        </div>
        <h3 className="text-xl font-bold text-text mb-2">Congratulations! 🎉</h3>
        <p className="text-text-muted mb-6">Your company has been incorporated</p>
        <div className="p-4 rounded-xl bg-surface border border-border mb-4">
          <div className="text-xs text-text-muted mb-1">Certificate of Incorporation</div>
          <div className="font-bold text-text">TechVentures Pvt Ltd</div>
          <div className="text-sm text-text-muted">CIN: U72900DL2026PTC123456</div>
        </div>
        <button className="w-full py-3 rounded-full bg-pink-500 text-white font-semibold flex items-center justify-center gap-2">
          <i className="fa-solid fa-download"></i>
          Download Documents
        </button>
      </div>
    )
  }

  return visuals[step.visual] || null
}

// Form Preview Section
function FormPreviewSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeTab, setActiveTab] = useState(0)

  const formTabs = [
    { label: 'Company Details', icon: 'fa-building' },
    { label: 'Directors', icon: 'fa-users' },
    { label: 'Documents', icon: 'fa-file-arrow-up' },
    { label: 'Review', icon: 'fa-check-double' }
  ]

  return (
    <section ref={ref} className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="section-badge mb-4">
            <i className="fa-solid fa-wand-magic-sparkles"></i>
            <span>Smart Forms</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-text mb-6">
            Our <span className="text-gradient">guided</span> form experience
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            AI-powered forms that adapt to your needs, catch errors, and guide you every step of the way.
          </p>
        </motion.div>

        {/* Form Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="card-elevated overflow-hidden">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-primary to-accent p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">Company Incorporation Form</h3>
                  <p className="text-white/80 text-sm">Complete all sections to proceed</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">65%</div>
                  <div className="text-white/80 text-xs">Completed</div>
                </div>
              </div>
              {/* Progress Bar */}
              <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-white rounded-full"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: '65%' } : {}}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-border">
              {formTabs.map((tab, index) => (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(index)}
                  className={`flex-1 py-4 px-4 flex items-center justify-center gap-2 text-sm font-medium transition-all ${
                    activeTab === index 
                      ? 'text-primary border-b-2 border-primary bg-primary-bg' 
                      : 'text-text-muted hover:text-text hover:bg-surface'
                  }`}
                >
                  <i className={`fa-solid ${tab.icon}`}></i>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Form Content */}
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Proposed Company Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value="TechVentures Solutions Pvt Ltd"
                      className="w-full p-3 rounded-xl border border-border bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                      readOnly
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <span className="px-2 py-1 rounded-full bg-success-bg text-success text-xs font-medium">
                        <i className="fa-solid fa-check mr-1"></i>Available
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-text-muted mt-2 flex items-center gap-1">
                    <i className="fa-solid fa-sparkles text-primary"></i>
                    AI checked: 92% approval probability
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Business Activity <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full p-3 rounded-xl border border-border bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all">
                    <option>IT Services & Software Development</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Authorized Capital <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    value="₹10,00,000"
                    className="w-full p-3 rounded-xl border border-border bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Paid-up Capital <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    value="₹1,00,000"
                    className="w-full p-3 rounded-xl border border-border bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                    readOnly
                  />
                </div>
              </div>

              {/* AI Helper */}
              <div className="mt-6 p-4 rounded-xl bg-primary-bg border border-primary/20 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-robot text-white"></i>
                </div>
                <div>
                  <div className="font-semibold text-text mb-1">AI Assistant</div>
                  <p className="text-text-muted text-sm">
                    Based on your business type, I recommend setting authorized capital at ₹10 lakhs. 
                    This gives room for future investment rounds without immediate compliance burden.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                <button className="btn-secondary">
                  <i className="fa-solid fa-arrow-left mr-2"></i>
                  Previous
                </button>
                <button className="btn-primary">
                  Save & Continue
                  <i className="fa-solid fa-arrow-right ml-2"></i>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
