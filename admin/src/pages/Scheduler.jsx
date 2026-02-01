import { useState, useEffect } from 'react'
import { 
  Clock, 
  Play, 
  Pause, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle,
  Calendar,
  Loader2
} from 'lucide-react'
import { API_URL } from '../api'

export default function Scheduler() {
  const [status, setStatus] = useState(null)
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [triggering, setTriggering] = useState(false)
  const [interval, setInterval] = useState(30)

  useEffect(() => {
    fetchData()
    const refreshInterval = setInterval(fetchData, 30000) // Refresh every 30 seconds
    return () => clearInterval(refreshInterval)
  }, [])

  async function fetchData() {
    try {
      const [statusRes, historyRes] = await Promise.all([
        fetch(`${API_URL}/api/scheduler/status`),
        fetch(`${API_URL}/api/scheduler/history`)
      ])
      
      const statusData = await statusRes.json()
      const historyData = await historyRes.json()
      
      setStatus(statusData)
      setHistory(historyData)
      setInterval(statusData.postIntervalMinutes || 30)
    } catch (error) {
      console.error('Failed to fetch scheduler data:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleToggle() {
    try {
      const res = await fetch(`${API_URL}/api/scheduler/toggle`, { method: 'PUT' })
      const data = await res.json()
      setStatus(prev => ({ ...prev, autoPostEnabled: data.autoPostEnabled }))
    } catch (error) {
      alert('Failed to toggle auto-posting')
    }
  }

  async function handleTrigger() {
    setTriggering(true)
    try {
      const res = await fetch(`${API_URL}/api/scheduler/trigger`, { method: 'POST' })
      const result = await res.json()
      
      if (result.success) {
        alert(`Blog published: ${result.blog.title}`)
        fetchData()
      } else {
        alert(`Failed: ${result.reason}`)
      }
    } catch (error) {
      alert('Failed to trigger post')
    } finally {
      setTriggering(false)
    }
  }

  async function handleUpdateInterval() {
    try {
      const res = await fetch(`${API_URL}/api/scheduler/interval`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ intervalMinutes: parseInt(interval) })
      })
      const result = await res.json()
      alert(result.message)
      fetchData()
    } catch (error) {
      alert('Failed to update interval')
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
        <h1 className="text-3xl font-bold">Auto-Posting Scheduler</h1>
        <p className="text-text-muted mt-1">
          Configure automatic blog posting at regular intervals
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Status Card */}
        <div className="bg-surface rounded-xl p-6 border border-border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Scheduler Status
            </h2>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              status?.autoPostEnabled 
                ? 'bg-success/20 text-success' 
                : 'bg-error/20 text-error'
            }`}>
              {status?.autoPostEnabled ? 'Active' : 'Disabled'}
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-surface-light rounded-lg">
              <div>
                <p className="font-medium">Auto-Posting</p>
                <p className="text-text-muted text-sm">
                  {status?.autoPostEnabled 
                    ? 'Posts will be generated automatically' 
                    : 'Enable to start auto-posting'}
                </p>
              </div>
              <button
                onClick={handleToggle}
                className={`w-14 h-7 rounded-full transition-colors relative ${
                  status?.autoPostEnabled ? 'bg-success' : 'bg-surface-light border border-border'
                }`}
              >
                <span className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all ${
                  status?.autoPostEnabled ? 'left-8' : 'left-1'
                }`} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-surface-light rounded-lg">
                <p className="text-text-muted text-sm">Posts Today</p>
                <p className="text-2xl font-bold">{status?.postsToday || 0}</p>
                <p className="text-text-muted text-xs">Max: {status?.maxPostsPerDay}/day</p>
              </div>
              <div className="p-4 bg-surface-light rounded-lg">
                <p className="text-text-muted text-sm">Interval</p>
                <p className="text-2xl font-bold">{status?.postIntervalMinutes || 30}</p>
                <p className="text-text-muted text-xs">minutes</p>
              </div>
            </div>

            <div className="p-4 bg-surface-light rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Last Post</span>
                <span>
                  {status?.lastPostTime 
                    ? new Date(status.lastPostTime).toLocaleString()
                    : 'Never'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Next Post</span>
                <span className={status?.autoPostEnabled ? 'text-primary' : ''}>
                  {status?.nextPostTime && status?.autoPostEnabled
                    ? new Date(status.nextPostTime).toLocaleString()
                    : 'N/A'}
                </span>
              </div>
            </div>

            <button
              onClick={handleTrigger}
              disabled={triggering || !status?.canPost}
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg transition-colors"
            >
              {triggering ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Generate & Post Now
                </>
              )}
            </button>
          </div>
        </div>

        {/* Configuration Card */}
        <div className="bg-surface rounded-xl p-6 border border-border">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-secondary" />
            Configuration
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Posting Interval (minutes)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={interval}
                  onChange={(e) => setInterval(e.target.value)}
                  min="1"
                  max="1440"
                  className="flex-1 bg-surface-light border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                />
                <button
                  onClick={handleUpdateInterval}
                  className="px-4 py-2 bg-secondary hover:bg-secondary/80 text-white rounded-lg transition-colors"
                >
                  Update
                </button>
              </div>
              <p className="text-text-muted text-xs mt-2">
                Recommended: 30 minutes minimum for quality content
              </p>
            </div>

            {/* Quick Presets */}
            <div>
              <label className="block text-sm font-medium mb-2">Quick Presets</label>
              <div className="grid grid-cols-3 gap-2">
                {[15, 30, 60].map(mins => (
                  <button
                    key={mins}
                    onClick={() => setInterval(mins)}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      parseInt(interval) === mins 
                        ? 'border-primary bg-primary/10 text-primary' 
                        : 'border-border hover:border-primary'
                    }`}
                  >
                    {mins} min
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
              <p className="text-warning text-sm font-medium">Important Notes</p>
              <ul className="text-text-muted text-xs mt-2 space-y-1">
                <li>• Server must be running for scheduler to work</li>
                <li>• Ensure OpenAI API key is configured</li>
                <li>• Add keywords before enabling auto-posting</li>
                <li>• Posts are created as published by default</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Posting History */}
      <div className="bg-surface rounded-xl p-6 border border-border">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Recent Auto-Generated Posts</h2>
          <button
            onClick={fetchData}
            className="p-2 hover:bg-surface-light rounded-lg transition-colors"
          >
            <RefreshCw className="w-5 h-5 text-text-muted" />
          </button>
        </div>

        {history.length > 0 ? (
          <div className="space-y-3">
            {history.map(post => (
              <div 
                key={post.id}
                className="flex items-center justify-between p-4 bg-surface-light rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                  <div>
                    <p className="font-medium">{post.title}</p>
                    <p className="text-text-muted text-sm">
                      Keyword: {post.keyword} • /{post.slug}
                    </p>
                  </div>
                </div>
                <span className="text-text-muted text-sm">
                  {new Date(post.publishedAt).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-text-muted">
            <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No auto-generated posts yet</p>
            <p className="text-sm">Enable auto-posting or trigger a manual post to get started</p>
          </div>
        )}
      </div>
    </div>
  )
}
