import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Clock, Tag, ArrowRight, Search } from 'lucide-react'
import { BlogCTA } from '../components/BlogCTA'

export function BlogListPage() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    fetchBlogs()
  }, [])

  async function fetchBlogs() {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || ''
      const res = await fetch(`${apiUrl}/api/blogs`)
      const data = await res.json()
      // Only show published blogs
      setBlogs(data.filter(b => b.status === 'published'))
    } catch (error) {
      console.error('Failed to fetch blogs:', error)
      // Fallback to empty array
      setBlogs([])
    } finally {
      setLoading(false)
    }
  }

  const categories = ['all', ...new Set(blogs.map(b => b.category).filter(Boolean))]

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.metaDescription?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory
    return matchesSearch && matchesCategory
  })

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

  return (
    <div className="min-h-screen pb-24">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-bg via-white to-accent-bg py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="section-badge mb-4">
              <i className="fa-solid fa-newspaper"></i>
              Our Blog
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-text mb-4">
              Insights for <span className="text-gradient">Indian Entrepreneurs</span>
            </h1>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              Expert guides on company registration, compliance, taxation, and growing your business in India
            </p>
          </motion.div>

          {/* Search & Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 max-w-3xl mx-auto"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-full border border-border bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-6 py-3 rounded-full border border-border bg-white focus:outline-none focus:border-primary"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredBlogs.map((blog, index) => (
                <motion.article
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card card-hover overflow-hidden group"
                >
                  {/* Thumbnail Placeholder */}
                  <div className="h-48 bg-gradient-to-br from-primary-bg to-accent-bg flex items-center justify-center">
                    <div className="text-6xl text-primary/20">
                      <i className="fa-solid fa-file-lines"></i>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Category & Read Time */}
                    <div className="flex items-center gap-3 mb-3">
                      {blog.category && (
                        <span className="px-3 py-1 rounded-full bg-primary-bg text-primary text-xs font-medium">
                          {blog.category}
                        </span>
                      )}
                      <span className="text-text-muted text-xs flex items-center gap-1">
                        <Clock size={12} />
                        {getReadTime(blog.content)} min read
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-display font-semibold text-text mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      <Link to={`/blog/${blog.slug}`}>
                        {blog.title}
                      </Link>
                    </h2>

                    {/* Description */}
                    <p className="text-text-muted text-sm line-clamp-3 mb-4">
                      {blog.metaDescription}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-text-dim text-xs flex items-center gap-1">
                        <Calendar size={12} />
                        {formatDate(blog.publishedAt || blog.createdAt)}
                      </span>
                      <Link 
                        to={`/blog/${blog.slug}`}
                        className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all"
                      >
                        Read More
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl text-text-dim mb-4">
                <i className="fa-solid fa-folder-open"></i>
              </div>
              <h3 className="text-xl font-semibold text-text mb-2">No articles found</h3>
              <p className="text-text-muted">
                {searchTerm || selectedCategory !== 'all' 
                  ? 'Try adjusting your search or filter'
                  : 'Check back soon for new content'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Fixed CTA */}
      <BlogCTA />
    </div>
  )
}
