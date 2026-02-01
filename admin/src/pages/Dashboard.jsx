import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  FileText, 
  Clock, 
  TrendingUp, 
  Zap,
  Play,
  AlertCircle,
  CheckCircle
} from 'lucide-react'

function StatCard({ icon: Icon, label, value, subValue, color = 'primary' }) {
  const colors = {
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    error: 'bg-error/10 text-error'
  }

  return (
    <div className="bg-surface rounded-xl p-6 border border-border">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-text-muted text-sm">{label}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
          {subValue && <p className="text-text-muted text-sm mt-1">{subValue}</p>}
        </div>
        <div className={`p-3 rounded-lg ${colors[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  )
}

function RecentBlog({ blog }) {
  return (
    <Link 
      to={`/editor/${blog.id}`}
      className="block p-4 bg-surface-light rounded-lg hover:bg-surface-light/80 transition-colors"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="font-medium truncate">{blog.title}</h3>
          <p className="text-text-muted text-sm mt-1">/{blog.slug}</p>
        </div>
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          blog.status === 'published' 
            ? 'bg-success/20 text-success' 
            : 'bg-warning/20 text-warning'
        }`}>
          {blog.status}
        </span>
      </div>
    </Link>
  )
}

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalBlogs: 0,
    publishedBlogs: 0,
    drafts: 0,
    postsToday: 0
  })
  const [recentBlogs, setRecentBlogs] = useState([])
  const [schedulerStatus, setSchedulerStatus] = useState(null)
  const [apiStatus, setApiStatus] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const [blogsRes, schedulerRes, apiRes] = await Promise.all([
        fetch('/api/blogs'),
        fetch('/api/scheduler/status'),
        fetch('/api/settings/api-status')
      ])

      const blogs = await blogsRes.json()
      const scheduler = await schedulerRes.json()
      const api = await apiRes.json()

      setStats({
        totalBlogs: blogs.length,
        publishedBlogs: blogs.filter(b => b.status === 'published').length,
        drafts: blogs.filter(b => b.status === 'draft').length,
        postsToday: scheduler.postsToday || 0
      })
      setRecentBlogs(blogs.slice(0, 5))
      setSchedulerStatus(scheduler)
      setApiStatus(api)
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleManualPost() {
    try {
      const res = await fetch('/api/scheduler/trigger', { method: 'POST' })
      const result = await res.json()
      if (result.success) {
        alert(`Blog published: ${result.blog.title}`)
        fetchData()
      } else {
        alert(`Failed: ${result.reason}`)
      }
    } catch (error) {
      alert('Failed to trigger post')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-text-muted mt-1">Overview of your blog management system</p>
      </div>

      {/* API Status Alerts */}
      {apiStatus && (!apiStatus.openaiConfigured || !apiStatus.humanizerConfigured) && (
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
          <div className="flex items-center gap-2 text-warning">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">Configuration Required</span>
          </div>
          <p className="text-text-muted text-sm mt-2">
            {!apiStatus.openaiConfigured && 'OpenAI API key not configured. '}
            {!apiStatus.humanizerConfigured && 'Humanizer API not configured. '}
            <Link to="/settings" className="text-primary hover:underline">Go to Settings</Link>
          </p>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={FileText}
          label="Total Blog Posts"
          value={stats.totalBlogs}
          color="primary"
        />
        <StatCard
          icon={CheckCircle}
          label="Published"
          value={stats.publishedBlogs}
          color="success"
        />
        <StatCard
          icon={Clock}
          label="Drafts"
          value={stats.drafts}
          color="warning"
        />
        <StatCard
          icon={TrendingUp}
          label="Posts Today"
          value={stats.postsToday}
          subValue={`Max: ${schedulerStatus?.maxPostsPerDay || 48}/day`}
          color="primary"
        />
      </div>

      {/* Scheduler Status & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scheduler Card */}
        <div className="bg-surface rounded-xl p-6 border border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Auto-Posting</h2>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              schedulerStatus?.autoPostEnabled 
                ? 'bg-success/20 text-success' 
                : 'bg-error/20 text-error'
            }`}>
              {schedulerStatus?.autoPostEnabled ? 'Active' : 'Disabled'}
            </span>
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-text-muted">Interval</span>
              <span>Every {schedulerStatus?.postIntervalMinutes || 30} minutes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Last Post</span>
              <span>
                {schedulerStatus?.lastPostTime 
                  ? new Date(schedulerStatus.lastPostTime).toLocaleString()
                  : 'Never'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Next Post</span>
              <span>
                {schedulerStatus?.nextPostTime 
                  ? new Date(schedulerStatus.nextPostTime).toLocaleString()
                  : 'N/A'}
              </span>
            </div>
          </div>

          <button
            onClick={handleManualPost}
            disabled={!apiStatus?.openaiConfigured}
            className="mt-4 w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg transition-colors"
          >
            <Play className="w-4 h-4" />
            Generate & Post Now
          </button>
        </div>

        {/* Quick Actions */}
        <div className="bg-surface rounded-xl p-6 border border-border">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link 
              to="/editor"
              className="flex items-center gap-3 p-4 bg-surface-light rounded-lg hover:bg-primary/10 transition-colors"
            >
              <Zap className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">Create New Blog</p>
                <p className="text-text-muted text-sm">Generate AI content with humanization</p>
              </div>
            </Link>
            <Link 
              to="/keywords"
              className="flex items-center gap-3 p-4 bg-surface-light rounded-lg hover:bg-primary/10 transition-colors"
            >
              <FileText className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">Manage Keywords</p>
                <p className="text-text-muted text-sm">Add or edit target keywords</p>
              </div>
            </Link>
            <Link 
              to="/scheduler"
              className="flex items-center gap-3 p-4 bg-surface-light rounded-lg hover:bg-primary/10 transition-colors"
            >
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">Configure Scheduler</p>
                <p className="text-text-muted text-sm">Set posting intervals and limits</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Blogs */}
      <div className="bg-surface rounded-xl p-6 border border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Blog Posts</h2>
          <Link to="/blogs" className="text-primary hover:underline text-sm">
            View all
          </Link>
        </div>
        
        {recentBlogs.length > 0 ? (
          <div className="space-y-3">
            {recentBlogs.map(blog => (
              <RecentBlog key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <p className="text-text-muted text-center py-8">
            No blog posts yet. Create your first one!
          </p>
        )}
      </div>
    </div>
  )
}
