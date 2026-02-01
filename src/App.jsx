import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { 
  Navigation, 
  Hero, 
  Problem, 
  Solution, 
  Features, 
  AIFeatures, 
  HowItWorks, 
  Pricing, 
  Services,
  TargetUsers,
  CTA, 
  Footer,
  Testimonials,
  FAQ,
  Partners,
  FloatingWhatsApp
} from './components'
import { HowItWorksPage } from './pages/HowItWorksPage'
import { BlogListPage } from './pages/BlogListPage'
import { BlogPostPage } from './pages/BlogPostPage'
import { ContactPage } from './pages/ContactPage'
import { PricingCalculatorPage } from './pages/PricingCalculatorPage'

function HomePage() {
  return (
    <>
      <Hero />
      <Partners />
      <Problem />
      <Solution />
      <Features />
      <AIFeatures />
      <HowItWorks />
      <Services />
      <Testimonials />
      <Pricing />
      <FAQ />
      <TargetUsers />
      <CTA />
    </>
  )
}

function AppContent() {
  const location = useLocation()
  const isBlogPage = location.pathname.startsWith('/blog')

  return (
    <div className="min-h-screen bg-bg">
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/pricing" element={<PricingCalculatorPage />} />
        </Routes>
      </main>
      {/* Hide footer padding on blog pages to account for fixed CTA */}
      <div className={isBlogPage ? 'pb-16' : ''}>
        <Footer />
      </div>
      {!isBlogPage && <FloatingWhatsApp />}
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
