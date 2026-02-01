import { useState, useEffect } from 'react'
import { Plus, Trash2, Tag, MessageSquare, Save, Loader2 } from 'lucide-react'

export default function Keywords() {
  const [data, setData] = useState({ keywords: [], sentences: [] })
  const [newKeyword, setNewKeyword] = useState('')
  const [newSentence, setNewSentence] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchKeywords()
  }, [])

  async function fetchKeywords() {
    try {
      const res = await fetch('/api/keywords')
      const result = await res.json()
      setData(result)
    } catch (error) {
      console.error('Failed to fetch keywords:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleAddKeyword() {
    if (!newKeyword.trim()) return
    
    setSaving(true)
    try {
      const res = await fetch('/api/keywords/keyword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword: newKeyword.trim() })
      })
      const result = await res.json()
      setData(result)
      setNewKeyword('')
    } catch (error) {
      alert('Failed to add keyword')
    } finally {
      setSaving(false)
    }
  }

  async function handleDeleteKeyword(keyword) {
    if (!confirm(`Delete keyword "${keyword}"?`)) return
    
    try {
      const res = await fetch(`/api/keywords/keyword/${encodeURIComponent(keyword)}`, {
        method: 'DELETE'
      })
      const result = await res.json()
      setData(result)
    } catch (error) {
      alert('Failed to delete keyword')
    }
  }

  async function handleAddSentence() {
    if (!newSentence.trim()) return
    
    setSaving(true)
    try {
      const res = await fetch('/api/keywords/sentence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sentence: newSentence.trim() })
      })
      const result = await res.json()
      setData(result)
      setNewSentence('')
    } catch (error) {
      alert('Failed to add sentence')
    } finally {
      setSaving(false)
    }
  }

  async function handleDeleteSentence(index) {
    if (!confirm('Delete this sentence?')) return
    
    try {
      const res = await fetch(`/api/keywords/sentence/${index}`, {
        method: 'DELETE'
      })
      const result = await res.json()
      setData(result)
    } catch (error) {
      alert('Failed to delete sentence')
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
        <h1 className="text-3xl font-bold">Keywords & Sentences</h1>
        <p className="text-text-muted mt-1">
          Manage target keywords for auto-generated blog posts
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Keywords Section */}
        <div className="bg-surface rounded-xl p-6 border border-border">
          <div className="flex items-center gap-2 mb-6">
            <Tag className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Target Keywords</h2>
          </div>

          {/* Add Keyword Form */}
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddKeyword()}
              placeholder="Enter a keyword..."
              className="flex-1 bg-surface-light border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
            />
            <button
              onClick={handleAddKeyword}
              disabled={saving || !newKeyword.trim()}
              className="flex items-center gap-2 bg-primary hover:bg-primary-dark disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-colors"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              Add
            </button>
          </div>

          {/* Keywords List */}
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {data.keywords.length > 0 ? (
              data.keywords.map((keyword, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 bg-surface-light rounded-lg group"
                >
                  <span>{keyword}</span>
                  <button
                    onClick={() => handleDeleteKeyword(keyword)}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-error/10 rounded transition-all"
                  >
                    <Trash2 className="w-4 h-4 text-error" />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-text-muted text-center py-8">
                No keywords added yet
              </p>
            )}
          </div>

          <p className="text-text-muted text-sm mt-4">
            {data.keywords.length} keywords • Used for auto-generating blog posts
          </p>
        </div>

        {/* Sentences Section */}
        <div className="bg-surface rounded-xl p-6 border border-border">
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare className="w-5 h-5 text-secondary" />
            <h2 className="text-xl font-semibold">CTA Sentences</h2>
          </div>

          {/* Add Sentence Form */}
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={newSentence}
              onChange={(e) => setNewSentence(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddSentence()}
              placeholder="Enter a sentence..."
              className="flex-1 bg-surface-light border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
            />
            <button
              onClick={handleAddSentence}
              disabled={saving || !newSentence.trim()}
              className="flex items-center gap-2 bg-secondary hover:bg-secondary/80 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-colors"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              Add
            </button>
          </div>

          {/* Sentences List */}
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {data.sentences.length > 0 ? (
              data.sentences.map((sentence, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 bg-surface-light rounded-lg group"
                >
                  <span className="text-sm">{sentence}</span>
                  <button
                    onClick={() => handleDeleteSentence(index)}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-error/10 rounded transition-all flex-shrink-0 ml-2"
                  >
                    <Trash2 className="w-4 h-4 text-error" />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-text-muted text-center py-8">
                No sentences added yet
              </p>
            )}
          </div>

          <p className="text-text-muted text-sm mt-4">
            {data.sentences.length} sentences • Used as variations in generated content
          </p>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-primary/10 border border-primary/20 rounded-xl p-6">
        <h3 className="font-semibold text-primary mb-2">Tips for Better Content</h3>
        <ul className="text-text-muted text-sm space-y-1">
          <li>• Add specific keywords related to your services (e.g., "GST registration online")</li>
          <li>• Include location-based keywords (e.g., "company registration in Mumbai")</li>
          <li>• Add long-tail keywords for better SEO (e.g., "how to register startup in India 2025")</li>
          <li>• CTA sentences will be randomly used in generated content for variety</li>
        </ul>
      </div>
    </div>
  )
}
