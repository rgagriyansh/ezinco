import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  Sparkles, 
  Wand2, 
  Save, 
  Send, 
  ArrowLeft,
  RefreshCw,
  Eye,
  FileText,
  Loader2
} from 'lucide-react'
import { API_URL } from '../api'

export default function BlogEditor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = !!id

  const [blog, setBlog] = useState({
    title: '',
    slug: '',
    metaDescription: '',
    content: '',
    originalContent: '',
    keyword: '',
    tags: [],
    category: 'Business Incorporation',
    status: 'draft'
  })
  const [keywords, setKeywords] = useState([])
  const [loading, setLoading] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [humanizing, setHumanizing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    fetchKeywords()
    if (isEditing) {
      fetchBlog()
    }
  }, [id])

  async function fetchBlog() {
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/blogs/${id}`)
      const data = await res.json()
      setBlog(data)
    } catch (error) {
      console.error('Failed to fetch blog:', error)
      navigate('/blogs')
    } finally {
      setLoading(false)
    }
  }

  async function fetchKeywords() {
    try {
      const res = await fetch(`${API_URL}/api/keywords`)
      const data = await res.json()
      setKeywords(data.keywords || [])
    } catch (error) {
      console.error('Failed to fetch keywords:', error)
    }
  }

  async function handleGenerateContent() {
    if (!blog.keyword) {
      alert('Please select or enter a keyword first')
      return
    }

    setGenerating(true)
    try {
      const res = await fetch(`${API_URL}/api/generate/complete-blog`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          keyword: blog.keyword,
          autoHumanize: false // We'll humanize separately for more control
        })
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Failed to generate content')
      }

      const data = await res.json()
      setBlog(prev => ({
        ...prev,
        title: data.title,
        slug: data.slug,
        metaDescription: data.metaDescription,
        content: data.content,
        originalContent: data.content
      }))
    } catch (error) {
      alert(error.message)
    } finally {
      setGenerating(false)
    }
  }

  async function handleHumanize() {
    if (!blog.content) {
      alert('No content to humanize')
      return
    }

    setHumanizing(true)
    try {
      const res = await fetch(`${API_URL}/api/generate/humanize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: blog.content })
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Failed to humanize content')
      }

      const data = await res.json()
      setBlog(prev => ({
        ...prev,
        content: data.humanizedText
      }))
    } catch (error) {
      alert(error.message)
    } finally {
      setHumanizing(false)
    }
  }

  async function handleSave(publish = false) {
    setSaving(true)
    try {
      const method = isEditing ? 'PUT' : 'POST'
      const url = isEditing ? `${API_URL}/api/blogs/${id}` : `${API_URL}/api/blogs`
      
      const blogData = {
        ...blog,
        status: publish ? 'published' : blog.status,
        publishedAt: publish ? new Date().toISOString() : blog.publishedAt
      }

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogData)
      })

      if (!res.ok) throw new Error('Failed to save')

      const saved = await res.json()
      
      if (publish) {
        alert('Blog published successfully!')
      }
      
      navigate(`/editor/${saved.id}`)
    } catch (error) {
      alert('Failed to save blog')
    } finally {
      setSaving(false)
    }
  }

  async function handlePublish() {
    if (!blog.title || !blog.content) {
      alert('Please add title and content before publishing')
      return
    }
    await handleSave(true)
  }

  function handleChange(field, value) {
    setBlog(prev => ({ ...prev, [field]: value }))
  }

  function generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .substring(0, 60)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/blogs')}
            className="p-2 hover:bg-surface rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">
              {isEditing ? 'Edit Blog Post' : 'Create New Blog'}
            </h1>
            <p className="text-text-muted text-sm">
              {isEditing ? `Editing: ${blog.title}` : 'Generate AI content and humanize it'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg hover:bg-surface-light transition-colors"
          >
            <Eye className="w-4 h-4" />
            {showPreview ? 'Edit' : 'Preview'}
          </button>
          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg hover:bg-surface-light transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Draft
          </button>
          <button
            onClick={handlePublish}
            disabled={saving || !blog.content}
            className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            Publish
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Generation Card */}
          <div className="bg-surface rounded-xl p-6 border border-border">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              AI Content Generator
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Target Keyword</label>
                <div className="flex gap-2">
                  <select
                    value={blog.keyword}
                    onChange={(e) => handleChange('keyword', e.target.value)}
                    className="flex-1 bg-surface-light border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                  >
                    <option value="">Select a keyword...</option>
                    {keywords.map(kw => (
                      <option key={kw} value={kw}>{kw}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Or enter custom..."
                    value={keywords.includes(blog.keyword) ? '' : blog.keyword}
                    onChange={(e) => handleChange('keyword', e.target.value)}
                    className="flex-1 bg-surface-light border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleGenerateContent}
                  disabled={generating || !blog.keyword}
                  className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg transition-colors"
                >
                  {generating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Generate Content
                    </>
                  )}
                </button>
                <button
                  onClick={handleHumanize}
                  disabled={humanizing || !blog.content}
                  className="flex-1 flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg transition-colors"
                >
                  {humanizing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Humanizing...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5" />
                      Humanize Text
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Title & Meta */}
          <div className="bg-surface rounded-xl p-6 border border-border space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Blog Title</label>
              <input
                type="text"
                value={blog.title}
                onChange={(e) => {
                  handleChange('title', e.target.value)
                  if (!isEditing) {
                    handleChange('slug', generateSlug(e.target.value))
                  }
                }}
                placeholder="Enter blog title..."
                className="w-full bg-surface-light border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary text-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">URL Slug</label>
              <div className="flex items-center gap-2">
                <span className="text-text-muted">/blog/</span>
                <input
                  type="text"
                  value={blog.slug}
                  onChange={(e) => handleChange('slug', e.target.value)}
                  placeholder="url-slug"
                  className="flex-1 bg-surface-light border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-primary font-mono text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Meta Description</label>
              <textarea
                value={blog.metaDescription}
                onChange={(e) => handleChange('metaDescription', e.target.value)}
                placeholder="SEO meta description (150-160 characters)"
                rows={2}
                className="w-full bg-surface-light border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-primary resize-none"
              />
              <p className="text-text-muted text-xs mt-1">
                {blog.metaDescription.length}/160 characters
              </p>
            </div>
          </div>

          {/* Content Editor/Preview */}
          <div className="bg-surface rounded-xl p-6 border border-border">
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-medium flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Content {showPreview ? '(Preview)' : '(Markdown)'}
              </label>
              {blog.originalContent && blog.originalContent !== blog.content && (
                <button
                  onClick={() => handleChange('content', blog.originalContent)}
                  className="flex items-center gap-1 text-xs text-text-muted hover:text-text"
                >
                  <RefreshCw className="w-3 h-3" />
                  Restore Original
                </button>
              )}
            </div>
            
            {showPreview ? (
              <div 
                className="prose max-w-none min-h-[400px] bg-surface-light rounded-lg p-6"
                dangerouslySetInnerHTML={{ 
                  __html: blog.content
                    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
                    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
                    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
                    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.+?)\*/g, '<em>$1</em>')
                    .replace(/^- (.+)$/gm, '<li>$1</li>')
                    .replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>')
                    .replace(/\n\n/g, '</p><p>')
                    .replace(/^(.+)$/gm, '<p>$1</p>')
                }}
              />
            ) : (
              <textarea
                value={blog.content}
                onChange={(e) => handleChange('content', e.target.value)}
                placeholder="Write your blog content in Markdown format..."
                rows={20}
                className="w-full bg-surface-light border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary font-mono text-sm resize-none"
              />
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Card */}
          <div className="bg-surface rounded-xl p-6 border border-border">
            <h3 className="font-semibold mb-4">Post Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-text-muted">Status</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  blog.status === 'published' 
                    ? 'bg-success/20 text-success' 
                    : 'bg-warning/20 text-warning'
                }`}>
                  {blog.status}
                </span>
              </div>
              {blog.createdAt && (
                <div className="flex items-center justify-between">
                  <span className="text-text-muted">Created</span>
                  <span className="text-sm">{new Date(blog.createdAt).toLocaleDateString()}</span>
                </div>
              )}
              {blog.publishedAt && (
                <div className="flex items-center justify-between">
                  <span className="text-text-muted">Published</span>
                  <span className="text-sm">{new Date(blog.publishedAt).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>

          {/* Category */}
          <div className="bg-surface rounded-xl p-6 border border-border">
            <h3 className="font-semibold mb-4">Category</h3>
            <select
              value={blog.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full bg-surface-light border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
            >
              <option value="Business Incorporation">Business Incorporation</option>
              <option value="Compliance">Compliance</option>
              <option value="Taxation">Taxation</option>
              <option value="Startup Tips">Startup Tips</option>
              <option value="Legal">Legal</option>
              <option value="General">General</option>
            </select>
          </div>

          {/* Tags */}
          <div className="bg-surface rounded-xl p-6 border border-border">
            <h3 className="font-semibold mb-4">Tags</h3>
            <input
              type="text"
              value={blog.tags?.join(', ') || ''}
              onChange={(e) => handleChange('tags', e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
              placeholder="tag1, tag2, tag3"
              className="w-full bg-surface-light border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
            />
            <p className="text-text-muted text-xs mt-2">Separate tags with commas</p>
          </div>

          {/* Quick Info */}
          <div className="bg-surface rounded-xl p-6 border border-border">
            <h3 className="font-semibold mb-4">Content Stats</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-muted">Words</span>
                <span>{blog.content.split(/\s+/).filter(Boolean).length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Characters</span>
                <span>{blog.content.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Read Time</span>
                <span>{Math.ceil(blog.content.split(/\s+/).filter(Boolean).length / 200)} min</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
