import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  FileText, 
  PenTool, 
  Settings, 
  Clock, 
  Tags,
  Zap
} from 'lucide-react'

// Pages
import Dashboard from './pages/Dashboard'
import BlogList from './pages/BlogList'
import BlogEditor from './pages/BlogEditor'
import Keywords from './pages/Keywords'
import Scheduler from './pages/Scheduler'
import SettingsPage from './pages/Settings'

function Sidebar() {
  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/blogs', icon: FileText, label: 'Blog Posts' },
    { to: '/editor', icon: PenTool, label: 'Create Blog' },
    { to: '/keywords', icon: Tags, label: 'Keywords' },
    { to: '/scheduler', icon: Clock, label: 'Scheduler' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ]

  return (
    <aside className="w-64 bg-surface min-h-screen p-4 border-r border-border">
      <div className="flex items-center gap-2 mb-8 px-2">
        <Zap className="w-8 h-8 text-primary" />
        <span className="text-xl font-bold">EZinco Admin</span>
      </div>
      
      <nav className="space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-text-muted hover:bg-surface-light hover:text-text'
              }`
            }
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

function App() {
  return (
    <Router>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-8 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/blogs" element={<BlogList />} />
            <Route path="/editor" element={<BlogEditor />} />
            <Route path="/editor/:id" element={<BlogEditor />} />
            <Route path="/keywords" element={<Keywords />} />
            <Route path="/scheduler" element={<Scheduler />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
