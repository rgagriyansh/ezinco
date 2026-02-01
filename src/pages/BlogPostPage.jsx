import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Clock, Tag, ArrowLeft, Share2, Copy, Check } from 'lucide-react'
import { BlogCTA } from '../components/BlogCTA'

export function BlogPostPage() {
  const { slug } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [relatedBlogs, setRelatedBlogs] = useState([])

  useEffect(() => {
    fetchBlog()
    window.scrollTo(0, 0)
  }, [slug])

  async function fetchBlog() {
    setLoading(true)
    try {
      const apiUrl = import.meta.env.VITE_API_URL || ''
      const res = await fetch(`${apiUrl}/api/blogs`)
      const blogs = await res.json()
      const found = blogs.find(b => b.slug === slug && b.status === 'published')
      setBlog(found || null)
      
      // Get related blogs (same category, excluding current)
      if (found) {
        const related = blogs
          .filter(b => b.id !== found.id && b.status === 'published' && b.category === found.category)
          .slice(0, 3)
        setRelatedBlogs(related)
      }
    } catch (error) {
      console.error('Failed to fetch blog:', error)
      setBlog(null)
    } finally {
      setLoading(false)
    }
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  function getReadTime(content) {
    const words = content?.split(/\s+/).length || 0
    return Math.ceil(words / 200)
  }

  function handleCopyLink() {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleShare() {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.metaDescription,
        url: window.location.href
      })
    } else {
      handleCopyLink()
    }
  }

  // Simple markdown to HTML converter
  function renderContent(content) {
    if (!content) return ''
    
    return content
      // Headers
      .replace(/^### (.+)$/gm, '<h3 class="text-xl font-semibold text-text mt-8 mb-4">$1</h3>')
      .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-display font-semibold text-text mt-10 mb-4">$1</h2>')
      .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-display font-bold text-text mt-8 mb-6">$1</h1>')
      // Bold and Italic
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      // Lists
      .replace(/^- (.+)$/gm, '<li class="ml-6 mb-2 list-disc">$1</li>')
      .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-6 mb-2 list-decimal">$2</li>')
      // Paragraphs
      .replace(/\n\n/g, '</p><p class="text-text-secondary leading-relaxed mb-6">')
      // Wrap in paragraph
      .replace(/^(?!<[h|l|u])(.+)$/gm, '<p class="text-text-secondary leading-relaxed mb-6">$1</p>')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-6xl text-text-dim mb-4">
          <i className="fa-solid fa-file-circle-xmark"></i>
        </div>
        <h1 className="text-2xl font-display font-bold text-text mb-2">Article Not Found</h1>
        <p className="text-text-muted mb-6">The article you're looking for doesn't exist or has been removed.</p>
        <Link to="/blog" className="btn-primary">
          <ArrowLeft size={18} />
          Back to Blog
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-24">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-bg via-white to-accent-bg py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Back Link */}
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-text-muted hover:text-primary mb-6 transition-colors"
            >
              <ArrowLeft size={18} />
              Back to Blog
            </Link>

            {/* Category & Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {blog.category && (
                <span className="px-3 py-1 rounded-full bg-primary-bg text-primary text-sm font-medium">
                  {blog.category}
                </span>
              )}
              <span className="text-text-muted text-sm flex items-center gap-1">
                <Calendar size={14} />
                {formatDate(blog.publishedAt || blog.createdAt)}
              </span>
              <span className="text-text-muted text-sm flex items-center gap-1">
                <Clock size={14} />
                {getReadTime(blog.content)} min read
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-text mb-4 leading-tight">
              {blog.title}
            </h1>

            {/* Description */}
            <p className="text-text-muted text-lg mb-6">
              {blog.metaDescription}
            </p>

            {/* Tags & Share */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              {blog.tags && blog.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <Tag size={16} className="text-text-muted" />
                  {blog.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 rounded-full bg-surface text-text-muted text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border hover:border-primary text-text-secondary text-sm transition-colors"
                >
                  <Share2 size={16} />
                  Share
                </button>
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border hover:border-primary text-text-secondary text-sm transition-colors"
                >
                  {copied ? <Check size={16} className="text-success" /> : <Copy size={16} />}
                  {copied ? 'Copied!' : 'Copy Link'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: renderContent(blog.content) }}
          />
        </div>
      </section>

      {/* Inline CTA Box */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-display font-bold mb-3">
              Need Help Getting Started?
            </h3>
            <p className="text-white/90 mb-6 max-w-xl mx-auto">
              Our experts at EZincorporation can help you with company registration, 
              compliance, and all your business needs. Get started today!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/#pricing"
                className="px-8 py-3 bg-white text-primary font-semibold rounded-full hover:bg-white/90 transition-colors"
              >
                View Pricing
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-white/20 text-white font-semibold rounded-full hover:bg-white/30 transition-colors"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedBlogs.length > 0 && (
        <section className="py-12 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-display font-bold text-text mb-8">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map((related, index) => (
                <motion.article
                  key={related.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card card-hover p-6"
                >
                  <span className="text-xs text-primary font-medium">{related.category}</span>
                  <h3 className="text-lg font-semibold text-text mt-2 mb-3 line-clamp-2">
                    <Link to={`/blog/${related.slug}`} className="hover:text-primary transition-colors">
                      {related.title}
                    </Link>
                  </h3>
                  <p className="text-text-muted text-sm line-clamp-2 mb-4">
                    {related.metaDescription}
                  </p>
                  <Link 
                    to={`/blog/${related.slug}`}
                    className="text-primary text-sm font-medium hover:underline"
                  >
                    Read More →
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Fixed CTA */}
      <BlogCTA />
    </div>
  )
}
