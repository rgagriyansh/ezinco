import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Building, Users, FileText, Award, CheckCircle, IndianRupee, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export function PricingCalculator() {
  const [companyType, setCompanyType] = useState('pvt-ltd')
  const [directors, setDirectors] = useState(2)
  const [shareholders, setShareholders] = useState(2)
  const [authorizedCapital, setAuthorizedCapital] = useState('100000')
  const [addons, setAddons] = useState({
    gst: false,
    trademark: false,
    startupIndia: false,
    msme: false,
    dsc: true
  })

  const companyTypes = [
    { id: 'pvt-ltd', name: 'Private Limited Company', basePrice: 5999, govtFee: 2000 },
    { id: 'opc', name: 'One Person Company (OPC)', basePrice: 4999, govtFee: 2000 },
    { id: 'llp', name: 'Limited Liability Partnership', basePrice: 5499, govtFee: 1500 },
    { id: 'partnership', name: 'Partnership Firm', basePrice: 2999, govtFee: 500 },
    { id: 'proprietorship', name: 'Sole Proprietorship', basePrice: 999, govtFee: 0 }
  ]

  const addonsList = [
    { id: 'gst', name: 'GST Registration', price: 999, icon: '📋' },
    { id: 'trademark', name: 'Trademark Registration', price: 4999, icon: '™️' },
    { id: 'startupIndia', name: 'Startup India + DPIIT', price: 2999, icon: '🚀' },
    { id: 'msme', name: 'MSME/Udyam Registration', price: 499, icon: '🏭' },
    { id: 'dsc', name: 'Digital Signature (DSC)', price: 999, icon: '✍️' }
  ]

  const capitalOptions = [
    { value: '100000', label: '₹1 Lakh', stampDuty: 1000 },
    { value: '500000', label: '₹5 Lakh', stampDuty: 2500 },
    { value: '1000000', label: '₹10 Lakh', stampDuty: 5000 },
    { value: '2500000', label: '₹25 Lakh', stampDuty: 10000 },
    { value: '5000000', label: '₹50 Lakh', stampDuty: 15000 },
    { value: '10000000', label: '₹1 Crore', stampDuty: 25000 }
  ]

  const calculation = useMemo(() => {
    const selectedType = companyTypes.find(t => t.id === companyType)
    const selectedCapital = capitalOptions.find(c => c.value === authorizedCapital)
    
    // Base professional fee
    let professionalFee = selectedType.basePrice
    
    // Extra directors fee (beyond 2)
    const extraDirectors = Math.max(0, directors - 2)
    const directorFee = extraDirectors * 1500
    
    // Government fees
    let govtFee = selectedType.govtFee
    
    // Stamp duty based on capital
    const stampDuty = companyType === 'pvt-ltd' || companyType === 'opc' 
      ? selectedCapital.stampDuty 
      : 0
    
    // Addons
    let addonTotal = 0
    Object.entries(addons).forEach(([key, value]) => {
      if (value) {
        const addon = addonsList.find(a => a.id === key)
        if (addon) addonTotal += addon.price
      }
    })
    
    const subtotal = professionalFee + directorFee + addonTotal
    const govtTotal = govtFee + stampDuty
    const total = subtotal + govtTotal
    
    // Discount for bundles
    const discount = addonTotal > 5000 ? Math.round(subtotal * 0.1) : 0
    const finalTotal = total - discount

    return {
      professionalFee,
      directorFee,
      addonTotal,
      subtotal,
      govtFee,
      stampDuty,
      govtTotal,
      discount,
      total: finalTotal
    }
  }, [companyType, directors, authorizedCapital, addons])

  const toggleAddon = (id) => {
    setAddons(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary-hover p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Calculator className="w-8 h-8" />
          <h2 className="text-2xl font-display font-bold">Pricing Calculator</h2>
        </div>
        <p className="text-white/80">Get instant estimate for your business registration</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Company Type */}
        <div>
          <label className="block text-sm font-semibold text-text mb-3 flex items-center gap-2">
            <Building size={18} className="text-primary" />
            Type of Company
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {companyTypes.map(type => (
              <button
                key={type.id}
                onClick={() => setCompanyType(type.id)}
                className={`p-3 rounded-lg border-2 text-left transition-all ${
                  companyType === type.id 
                    ? 'border-primary bg-primary-bg' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="font-medium text-text">{type.name}</div>
                <div className="text-sm text-text-muted">From ₹{type.basePrice.toLocaleString()}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Directors & Shareholders */}
        {(companyType === 'pvt-ltd' || companyType === 'llp') && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-text mb-2 flex items-center gap-2">
                <Users size={18} className="text-primary" />
                Directors
              </label>
              <select
                value={directors}
                onChange={(e) => setDirectors(Number(e.target.value))}
                className="w-full p-3 rounded-lg border border-border focus:outline-none focus:border-primary"
              >
                {[2, 3, 4, 5, 6, 7].map(n => (
                  <option key={n} value={n}>{n} {n === 2 ? '(Min)' : ''}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-text mb-2 flex items-center gap-2">
                <Users size={18} className="text-primary" />
                Shareholders
              </label>
              <select
                value={shareholders}
                onChange={(e) => setShareholders(Number(e.target.value))}
                className="w-full p-3 rounded-lg border border-border focus:outline-none focus:border-primary"
              >
                {[2, 3, 4, 5, 6, 7].map(n => (
                  <option key={n} value={n}>{n} {n === 2 ? '(Min)' : ''}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Authorized Capital */}
        {(companyType === 'pvt-ltd' || companyType === 'opc') && (
          <div>
            <label className="block text-sm font-semibold text-text mb-3 flex items-center gap-2">
              <IndianRupee size={18} className="text-primary" />
              Authorized Capital
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {capitalOptions.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setAuthorizedCapital(opt.value)}
                  className={`p-2 rounded-lg border-2 text-center transition-all text-sm ${
                    authorizedCapital === opt.value 
                      ? 'border-primary bg-primary-bg font-medium' 
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Addons */}
        <div>
          <label className="block text-sm font-semibold text-text mb-3 flex items-center gap-2">
            <Award size={18} className="text-primary" />
            Additional Services
          </label>
          <div className="space-y-2">
            {addonsList.map(addon => (
              <button
                key={addon.id}
                onClick={() => toggleAddon(addon.id)}
                className={`w-full p-3 rounded-lg border-2 flex items-center justify-between transition-all ${
                  addons[addon.id] 
                    ? 'border-primary bg-primary-bg' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{addon.icon}</span>
                  <span className="font-medium text-text">{addon.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-text-muted">₹{addon.price.toLocaleString()}</span>
                  {addons[addon.id] && <CheckCircle size={20} className="text-primary" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="bg-gray-50 rounded-xl p-5 space-y-3">
          <h3 className="font-semibold text-text flex items-center gap-2">
            <FileText size={18} className="text-primary" />
            Price Breakdown
          </h3>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-muted">Professional Fee</span>
              <span className="text-text">₹{calculation.professionalFee.toLocaleString()}</span>
            </div>
            {calculation.directorFee > 0 && (
              <div className="flex justify-between">
                <span className="text-text-muted">Additional Directors</span>
                <span className="text-text">₹{calculation.directorFee.toLocaleString()}</span>
              </div>
            )}
            {calculation.addonTotal > 0 && (
              <div className="flex justify-between">
                <span className="text-text-muted">Additional Services</span>
                <span className="text-text">₹{calculation.addonTotal.toLocaleString()}</span>
              </div>
            )}
            <div className="border-t border-border pt-2 flex justify-between">
              <span className="text-text-muted">Subtotal</span>
              <span className="text-text font-medium">₹{calculation.subtotal.toLocaleString()}</span>
            </div>
            {calculation.discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Bundle Discount (10%)</span>
                <span>-₹{calculation.discount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-text-muted">
              <span>Government Fee</span>
              <span>₹{calculation.govtFee.toLocaleString()}</span>
            </div>
            {calculation.stampDuty > 0 && (
              <div className="flex justify-between text-text-muted">
                <span>Stamp Duty (approx)</span>
                <span>₹{calculation.stampDuty.toLocaleString()}</span>
              </div>
            )}
          </div>

          <div className="border-t-2 border-primary pt-3 flex justify-between items-center">
            <span className="text-lg font-bold text-text">Total Estimate</span>
            <span className="text-2xl font-bold text-primary">₹{calculation.total.toLocaleString()}</span>
          </div>
          
          <p className="text-xs text-text-dim">
            * Government fees & stamp duty are approximate and may vary by state
          </p>
        </div>

        {/* CTA */}
        <div className="space-y-3">
          <a
            href="https://wa.me/919871090091?text=Hi! I want to register a company. My estimated budget is ₹"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full btn-primary py-3 flex items-center justify-center gap-2"
          >
            <i className="fa-brands fa-whatsapp text-xl"></i>
            Get Started on WhatsApp
          </a>
          <Link
            to="/contact"
            className="w-full btn-secondary py-3 flex items-center justify-center gap-2"
          >
            Request Callback
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  )
}
