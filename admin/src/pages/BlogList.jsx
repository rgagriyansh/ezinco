import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ExternalLink,
  Eye,
  EyeOff,
  Filter
} from 'lucide-react'
import { API_URL } from '../api'

export default function BlogList() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    fetchBlogs()
  }, [])

  async function fetchBlogs() {
    try {
      const res = await fetch(`${API_URL}/api/blogs`)
      const data = await res.json()
      setBlogs(data)
    } catch (error) {
      console.error('Failed to fetch blogs:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this blog?')) return
    
    try {
      await fetch(`${API_URL}/api/blogs/${id}`, { method: 'DELETE' })
      setBlogs(blogs.filter(b => b.id !== id))
    } catch (error) {
      alert('Failed to delete blog')
    }
  }

  async function handleTogglePublish(blog) {
    try {
      const endpoint = blog.status === 'published' ? 'unpublish' : 'publish'
      const res = await fetch(`${API_URL}/api/blogs/${blog.id}/${endpoint}`, { method: 'PUT' })
      const updated = await res.json()
      setBlogs(blogs.map(b => b.id === blog.id ? updated : b))
    } catch (error) {
      alert('Failed to update blog status')
    }
  }

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.keyword?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || blog.status === statusFilter
    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Blog Posts</h1>
          <p className="text-text-muted mt-1">{blogs.length} total posts</p>
        </div>
        <Link
          to="/editor"
          className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create New
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          <input
            type="text"
            placeholder="Search by title, slug, or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:border-primary"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-text-muted" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-surface border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>
        </div>
      </div>

      {/* Blog Table */}
      <div className="bg-surface rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-surface-light border-b border-border">
                <th className="text-left px-6 py-4 font-medium">Title</th>
                <th className="text-left px-6 py-4 font-medium">Slug</th>
                <th className="text-left px-6 py-4 font-medium">Keyword</th>
                <th className="text-left px-6 py-4 font-medium">Status</th>
                <th className="text-left px-6 py-4 font-medium">Date</th>
                <th className="text-right px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBlogs.length > 0 ? (
                filteredBlogs.map(blog => (
                  <tr key={blog.id} className="border-b border-border hover:bg-surface-light/50">
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <p className="font-medium truncate">{blog.title}</p>
                        {blog.isAutoGenerated && (
                          <span className="text-xs text-primary">Auto-generated</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <code className="text-sm text-text-muted bg-surface-light px-2 py-1 rounded">
                        /{blog.slug}
                      </code>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm">{blog.keyword || '-'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        blog.status === 'published' 
                          ? 'bg-success/20 text-success' 
                          : 'bg-warning/20 text-warning'
                      }`}>
                        {blog.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-muted">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleTogglePublish(blog)}
                          className="p-2 hover:bg-surface-light rounded-lg transition-colors"
                          title={blog.status === 'published' ? 'Unpublish' : 'Publish'}
                        >
                          {blog.status === 'published' ? (
                            <EyeOff className="w-4 h-4 text-text-muted" />
                          ) : (
                            <Eye className="w-4 h-4 text-success" />
                          )}
                        </button>
                        <Link
                          to={`/editor/${blog.id}`}
                          className="p-2 hover:bg-surface-light rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4 text-text-muted" />
                        </Link>
                        <a
                          href={`https://ezincorporation.in/blog/${blog.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 hover:bg-surface-light rounded-lg transition-colors"
                          title="View"
                        >
                          <ExternalLink className="w-4 h-4 text-text-muted" />
                        </a>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          className="p-2 hover:bg-error/10 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-error" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-text-muted">
                    {searchTerm || statusFilter !== 'all' 
                      ? 'No blogs match your filters' 
                      : 'No blog posts yet. Create your first one!'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
