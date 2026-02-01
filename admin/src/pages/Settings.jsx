import { useState, useEffect } from 'react'
import { 
  Settings as SettingsIcon, 
  Key, 
  Globe, 
  Save, 
  CheckCircle, 
  XCircle,
  Loader2,
  Eye,
  EyeOff
} from 'lucide-react'
import { API_URL } from '../api'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    openaiApiKey: '',
    humanizerApiKey: '',
    humanizerApiUrl: '',
    defaultCTA: '',
    websiteUrl: '',
    maxPostsPerDay: 48
  })
  const [apiStatus, setApiStatus] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showOpenAI, setShowOpenAI] = useState(false)
  const [showHumanizer, setShowHumanizer] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  async function fetchSettings() {
    try {
      const [settingsRes, statusRes] = await Promise.all([
        fetch(`${API_URL}/api/settings`),
        fetch(`${API_URL}/api/settings/api-status`)
      ])
      
      const settingsData = await settingsRes.json()
      const statusData = await statusRes.json()
      
      setSettings(settingsData)
      setApiStatus(statusData)
    } catch (error) {
      console.error('Failed to fetch settings:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSaveSettings() {
    setSaving(true)
    try {
      await fetch(`${API_URL}/api/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          defaultCTA: settings.defaultCTA,
          websiteUrl: settings.websiteUrl,
          maxPostsPerDay: parseInt(settings.maxPostsPerDay)
        })
      })
      alert('Settings saved successfully!')
    } catch (error) {
      alert('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  async function handleSaveApiKeys() {
    setSaving(true)
    try {
      const keysToUpdate = {}
      
      // Only send keys if they've been changed (not starting with ****)
      if (settings.openaiApiKey && !settings.openaiApiKey.startsWith('****')) {
        keysToUpdate.openaiApiKey = settings.openaiApiKey
      }
      if (settings.humanizerApiKey && !settings.humanizerApiKey.startsWith('****')) {
        keysToUpdate.humanizerApiKey = settings.humanizerApiKey
      }
      if (settings.humanizerApiUrl) {
        keysToUpdate.humanizerApiUrl = settings.humanizerApiUrl
      }

      if (Object.keys(keysToUpdate).length === 0) {
        alert('No changes to save')
        setSaving(false)
        return
      }

      await fetch(`${API_URL}/api/settings/api-keys`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(keysToUpdate)
      })
      
      alert('API keys updated successfully!')
      fetchSettings() // Refresh to get masked values
    } catch (error) {
      alert('Failed to update API keys')
    } finally {
      setSaving(false)
    }
  }

  function handleChange(field, value) {
    setSettings(prev => ({ ...prev, [field]: value }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-text-muted mt-1">
          Configure API keys and general settings
        </p>
      </div>

      {/* API Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={`p-4 rounded-xl border ${
          apiStatus?.openaiConfigured 
            ? 'bg-success/10 border-success/20' 
            : 'bg-error/10 border-error/20'
        }`}>
          <div className="flex items-center gap-3">
            {apiStatus?.openaiConfigured ? (
              <CheckCircle className="w-6 h-6 text-success" />
            ) : (
              <XCircle className="w-6 h-6 text-error" />
            )}
            <div>
              <p className="font-medium">OpenAI API</p>
              <p className="text-sm text-text-muted">
                {apiStatus?.openaiConfigured ? 'Configured' : 'Not configured'}
              </p>
            </div>
          </div>
        </div>
        
        <div className={`p-4 rounded-xl border ${
          apiStatus?.humanizerConfigured 
            ? 'bg-success/10 border-success/20' 
            : 'bg-warning/10 border-warning/20'
        }`}>
          <div className="flex items-center gap-3">
            {apiStatus?.humanizerConfigured ? (
              <CheckCircle className="w-6 h-6 text-success" />
            ) : (
              <XCircle className="w-6 h-6 text-warning" />
            )}
            <div>
              <p className="font-medium">Humanizer API</p>
              <p className="text-sm text-text-muted">
                {apiStatus?.humanizerConfigured ? 'Configured' : 'Optional - Basic humanization active'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* API Keys Section */}
      <div className="bg-surface rounded-xl p-6 border border-border">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Key className="w-5 h-5 text-primary" />
          API Keys
        </h2>

        <div className="space-y-6">
          {/* OpenAI API Key */}
          <div>
            <label className="block text-sm font-medium mb-2">
              OpenAI API Key <span className="text-error">*</span>
            </label>
            <div className="relative">
              <input
                type={showOpenAI ? 'text' : 'password'}
                value={settings.openaiApiKey}
                onChange={(e) => handleChange('openaiApiKey', e.target.value)}
                placeholder="sk-..."
                className="w-full bg-surface-light border border-border rounded-lg px-4 py-3 pr-12 focus:outline-none focus:border-primary font-mono text-sm"
              />
              <button
                type="button"
                onClick={() => setShowOpenAI(!showOpenAI)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text"
              >
                {showOpenAI ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-text-muted text-xs mt-2">
              Required for AI content generation. Get yours at{' '}
              <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                platform.openai.com
              </a>
            </p>
          </div>

          {/* Humanizer API Key */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Rephrasy AI API Key <span className="text-text-muted">(Recommended)</span>
            </label>
            <div className="relative">
              <input
                type={showHumanizer ? 'text' : 'password'}
                value={settings.humanizerApiKey}
                onChange={(e) => handleChange('humanizerApiKey', e.target.value)}
                placeholder="Your Rephrasy API key"
                className="w-full bg-surface-light border border-border rounded-lg px-4 py-3 pr-12 focus:outline-none focus:border-primary font-mono text-sm"
              />
              <button
                type="button"
                onClick={() => setShowHumanizer(!showHumanizer)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text"
              >
                {showHumanizer ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-text-muted text-xs mt-2">
              Get your API key at{' '}
              <a href="https://rephrasy.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                rephrasy.ai
              </a>
              {' '}• Uses v3 model with professional style
            </p>
          </div>

          {/* Humanizer API URL */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Humanizer API URL
            </label>
            <input
              type="text"
              value={settings.humanizerApiUrl}
              onChange={(e) => handleChange('humanizerApiUrl', e.target.value)}
              placeholder="https://v2-humanizer.rephrasy.ai/api"
              className="w-full bg-surface-light border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary text-sm"
            />
            <p className="text-text-muted text-xs mt-2">
              Default: Rephrasy AI (https://v2-humanizer.rephrasy.ai/api)
            </p>
          </div>

          <button
            onClick={handleSaveApiKeys}
            disabled={saving}
            className="flex items-center gap-2 bg-primary hover:bg-primary-dark disabled:opacity-50 text-white px-6 py-3 rounded-lg transition-colors"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save API Keys
          </button>
        </div>
      </div>

      {/* General Settings */}
      <div className="bg-surface rounded-xl p-6 border border-border">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Globe className="w-5 h-5 text-secondary" />
          General Settings
        </h2>

        <div className="space-y-6">
          {/* Default CTA */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Default Call-to-Action
            </label>
            <textarea
              value={settings.defaultCTA}
              onChange={(e) => handleChange('defaultCTA', e.target.value)}
              placeholder="Ready to start your business? Contact us at..."
              rows={3}
              className="w-full bg-surface-light border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary resize-none"
            />
            <p className="text-text-muted text-xs mt-2">
              This CTA will be added at the end of all generated blog posts
            </p>
          </div>

          {/* Website URL */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Website URL
            </label>
            <input
              type="url"
              value={settings.websiteUrl}
              onChange={(e) => handleChange('websiteUrl', e.target.value)}
              placeholder="https://ezincorporate.in"
              className="w-full bg-surface-light border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary"
            />
          </div>

          {/* Max Posts Per Day */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Maximum Posts Per Day
            </label>
            <input
              type="number"
              value={settings.maxPostsPerDay}
              onChange={(e) => handleChange('maxPostsPerDay', e.target.value)}
              min="1"
              max="100"
              className="w-full bg-surface-light border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary"
            />
            <p className="text-text-muted text-xs mt-2">
              Limits auto-posting to prevent excessive API usage
            </p>
          </div>

          <button
            onClick={handleSaveSettings}
            disabled={saving}
            className="flex items-center gap-2 bg-secondary hover:bg-secondary/80 disabled:opacity-50 text-white px-6 py-3 rounded-lg transition-colors"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Settings
          </button>
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-surface-light rounded-xl p-6 border border-border">
        <h3 className="font-semibold mb-4">Need Help?</h3>
        <div className="space-y-3 text-sm text-text-muted">
          <p>
            <strong className="text-text">OpenAI API:</strong> Used for generating blog content. 
            You need a ChatGPT Plus or API subscription. Uses GPT-4 for best quality.
          </p>
          <p>
            <strong className="text-text">Rephrasy AI (Humanizer):</strong> Recommended for making 
            AI-generated text undetectable. Uses v3 model with professional writing style. 
            If not configured, basic text transformations will be applied.
          </p>
          <p>
            <strong className="text-text">Rephrasy Models Available:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li><strong>v3</strong> - Recommended, best quality</li>
            <li>Undetectable Model v2 - Good for bypassing AI detectors</li>
            <li>SEO Model - Optimized for search engines</li>
          </ul>
          <p className="mt-2">
            <strong className="text-text">Pricing:</strong> Word-based (0.1 credits flat + 0.1 credits per 100 words)
          </p>
        </div>
      </div>
    </div>
  )
}
