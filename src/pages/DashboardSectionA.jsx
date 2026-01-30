import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import SidebarToggle from '../components/SidebarToggle'
import Header from '../components/Header'

const modules = [
  { id: 'dashboard', icon: '📊', title: 'Business Intelligence Dashboard', subtitle: 'OVERVIEW', features: ['Real-time ticket monitoring', 'Team performance metrics', 'SLA breach alerts', 'Executive summary views'], action: 'View Dashboard', color: 'dashboard' },
  { id: 'intake', icon: '📥', title: 'Ticket Intake & Classification', subtitle: 'SECTION A', features: ['Omni-channel ticket intake', 'Smart triage & prioritization', 'Auto-categorization rules', 'Duplicate detection'], action: 'Manage Intake', color: 'intake' },
  { id: 'assignment', icon: '👥', title: 'Assignment & Execution', subtitle: 'SECTION B', features: ['Intelligent auto-routing', 'Workforce scheduling', 'Mobile staff app', 'Real-time dispatch'], action: 'Manage Assignments', color: 'assignment' },
  { id: 'service', icon: '⏱️', title: 'Service Levels & Controls', subtitle: 'SECTION C', features: ['SLA & escalation engine', 'Approval workflows', 'Quality checks & sign-offs', 'Breach notifications'], action: 'Manage SLAs', color: 'service' },
  { id: 'communication', icon: '💬', title: 'Communication & Guest Experience', subtitle: 'SECTION D', features: ['Communications hub', 'Guest feedback (CSAT/NPS)', 'Auto-notifications', 'Recovery workflows'], action: 'Manage Communications', color: 'communication' },
  { id: 'financial', icon: '💳', title: 'Financial & Closure', subtitle: 'SECTION E', features: ['Billing & chargebacks', 'Ticket closure workflows', 'Resolution codes', 'Cost tracking'], action: 'Manage Financials', color: 'financial' },
  { id: 'admin', icon: '⚙️', title: 'Admin & Settings', subtitle: 'CONFIGURATION', features: ['User & role management', 'Category configuration', 'SLA policy setup', 'System preferences'], action: 'Configure System', color: 'admin' }
]

const volumeChartData = {
  week: [
    { day: 'Mon', value: 32, resolved: 28, pending: 4 },
    { day: 'Tue', value: 41, resolved: 35, pending: 6 },
    { day: 'Wed', value: 38, resolved: 32, pending: 6 },
    { day: 'Thu', value: 45, resolved: 40, pending: 5 },
    { day: 'Fri', value: 51, resolved: 44, pending: 7 },
    { day: 'Sat', value: 28, resolved: 25, pending: 3 },
    { day: 'Sun', value: 24, resolved: 22, pending: 2 }
  ]
}

function DashboardSectionA() {
  const navigate = useNavigate()
  
  // Maintenance Mode - Set to false to restore normal functionality
  const isUnderMaintenance = true
  
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [currentView, setCurrentView] = useState('landing')
  const [activeTab, setActiveTab] = useState('dispatch')
  const [selectedBar, setSelectedBar] = useState(null)
  
  // Form state for intake
  const [channel, setChannel] = useState('')
  const [requester, setRequester] = useState('')
  const [contact, setContact] = useState('')
  const [location, setLocation] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [triageData, setTriageData] = useState({ priority: 'P3', sla: '4 hours', team: 'General Pool' })
  const [validationError, setValidationError] = useState('')

  const showLanding = () => setCurrentView('landing')
  const showDashboard = () => setCurrentView('dashboard')
  const showIntake = () => setCurrentView('intake')
  const showAssignment = () => setCurrentView('assignment')

  const navigateToModule = (module) => {
    switch(module) {
      case 'dashboard': navigate('/dashboard'); break
      case 'myview': navigate('/servicedesk'); break
      case 'requests': navigate('/requests'); break
      case 'intake': navigate('/ticket-intake'); break
      case 'financial': navigate('/section-e'); break
      case 'admin': navigate('/admin'); break
      default: break
    }
  }

  const handleModuleAction = (moduleId) => {
    switch(moduleId) {
      case 'dashboard': showDashboard(); break
      case 'intake': showIntake(); break
      case 'assignment': navigate('/section-b'); break
      case 'service': navigate('/section-c'); break
      case 'communication': navigate('/section-d'); break
      case 'financial': navigate('/section-e'); break
      case 'admin': navigate('/admin'); break
    }
  }

  const updateTriage = () => {
    const triageMap = {
      'housekeeping': { priority: 'P3', sla: '4 hours', team: 'Housekeeping' },
      'maintenance': { priority: 'P2', sla: '2 hours', team: 'Engineering' },
      'engineering': { priority: 'P2', sla: '2 hours', team: 'Engineering' },
      'it-support': { priority: 'P2', sla: '2 hours', team: 'IT Support' },
      'fnb': { priority: 'P3', sla: '30 minutes', team: 'F&B Service' },
      'emergency': { priority: 'P1', sla: '15 minutes', team: 'Emergency Response' }
    }
    setTriageData(triageMap[category] || { priority: 'P3', sla: '4 hours', team: 'General Pool' })
  }

  useEffect(() => {
    updateTriage()
  }, [category])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!channel || !requester || !contact || !location || !category || !description) {
      setValidationError('Please fill in all required fields.')
      return
    }
    setValidationError('')
    alert('✅ Ticket created successfully!\n\nTicket ID: TK-' + Math.floor(Math.random() * 90000 + 10000))
    resetForm()
  }

  const resetForm = () => {
    setChannel('')
    setRequester('')
    setContact('')
    setLocation('')
    setCategory('')
    setDescription('')
    setValidationError('')
  }

  const chartTotal = volumeChartData.week.reduce((sum, d) => sum + d.value, 0)
  const chartMax = Math.max(...volumeChartData.week.map(d => d.value))
  const chartAvg = Math.round(chartTotal / volumeChartData.week.length)
  const peakDay = volumeChartData.week.reduce((max, d) => d.value > max.value ? d : max, volumeChartData.week[0])

  return (
    <div className="font-sans bg-gray-50 min-h-screen text-gray-800">
      <Sidebar collapsed={sidebarCollapsed} onNavigate={navigateToModule} />
      <SidebarToggle collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      {isUnderMaintenance ? (
        // Maintenance Mode View
        <div className={`transition-all duration-300 ${sidebarCollapsed ? '' : 'with-sidebar'}`}>
          <div className="flex items-center justify-center min-h-screen p-6">
            <div className="text-center max-w-3xl mx-auto">
              <div className="mb-8">
                <div className="inline-block animate-bounce">
                  <span className="text-9xl">🛠️</span>
                </div>
              </div>
              
              <h1 className="text-5xl font-bold text-gray-800 mb-4">We'll Be Right Back Soon!</h1>
              <p className="text-2xl text-gray-600 mb-8">
                This page is currently undergoing scheduled maintenance
              </p>
              
              <div className="bg-white border-2 border-blue-200 rounded-2xl p-8 shadow-lg mb-8">
                <div className="flex items-start gap-4 text-left">
                  <span className="text-4xl flex-shrink-0">⏰</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Maintenance Window</h3>
                    <p className="text-gray-600 text-lg">
                      We're performing system upgrades to serve you better. This page will be back online shortly.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <span className="text-3xl mb-2 block">🔧</span>
                  <h4 className="font-semibold text-gray-800 mb-1">System Upgrade</h4>
                  <p className="text-sm text-gray-600">Enhancing performance</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <span className="text-3xl mb-2 block">🚀</span>
                  <h4 className="font-semibold text-gray-800 mb-1">New Features</h4>
                  <p className="text-sm text-gray-600">Coming your way</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <span className="text-3xl mb-2 block">🔒</span>
                  <h4 className="font-semibold text-gray-800 mb-1">Security Updates</h4>
                  <p className="text-sm text-gray-600">Keeping you safe</p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></span>
                <span className="w-4 h-4 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-4 h-4 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
              </div>

              <div className="text-gray-500">
                <p className="text-lg mb-2">Thank you for your patience!</p>
                <p className="text-sm">
                  
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Header */}
          <Header 
            collapsed={sidebarCollapsed}
            subtitle="Business Intelligence Dashboard"
            showStats={false}
          />

      <div className={`max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 transition-all duration-300 ${sidebarCollapsed ? '' : 'with-sidebar'}`}>
        {/* Landing Page View */}
        {currentView === 'landing' && (
          <div>
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-6 flex items-center gap-2 flex-wrap">
              <span className="text-xl">🎯</span>
              <span className="text-gray-900 font-bold">SERVICE OPERATIONS MODULES</span>
              <span className="text-[13px] font-normal text-gray-500 normal-case tracking-normal ml-2 pl-4 border-l-2 border-gray-300">Complete Service Management Workflow</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
              {modules.map((module, idx) => (
                <div key={module.id} className={`module-card ${module.color} bg-white rounded-xl p-6 border border-gray-200 shadow-sm relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-gray-300 hover:-translate-y-1`}>
                  <div className={`absolute top-0 left-0 right-0 h-[5px] ${
                    module.color === 'dashboard' ? 'bg-red-500' :
                    module.color === 'intake' ? 'bg-amber-500' :
                    module.color === 'assignment' ? 'bg-violet-500' :
                    module.color === 'service' ? 'bg-cyan-500' :
                    module.color === 'communication' ? 'bg-emerald-500' :
                    module.color === 'financial' ? 'bg-indigo-500' :
                    'bg-gray-500'
                  }`}></div>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-3xl">{module.icon}</div>
                    <div className="flex-1">
                      <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">{module.subtitle}</div>
                      <h3 className="text-lg font-bold text-gray-800">{module.title}</h3>
                    </div>
                  </div>
                  <ul className="mb-5 pl-4">
                    {module.features.map((feature, i) => (
                      <li key={i} className="text-[13px] text-gray-500 py-1 relative pl-3 before:content-['•'] before:absolute before:left-0 before:text-red-500 before:font-bold">{feature}</li>
                    ))}
                  </ul>
                  <button 
                    className="w-full py-2.5 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                    onClick={() => handleModuleAction(module.id)}
                  >
                    <span>→</span> {module.action}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dashboard View */}
        {currentView === 'dashboard' && (
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <span className="text-red-500 cursor-pointer hover:text-red-600 hover:underline" onClick={showLanding}>🏠 Home</span>
              <span className="text-gray-300">›</span>
              <span>Business Intelligence Dashboard</span>
            </div>

            <div className="bg-white p-6 rounded-xl mb-6 border-l-4 border-violet-500">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">📊 Business Intelligence Dashboard</h2>
              <p className="text-gray-500 text-sm">Real-time ticket monitoring, performance metrics, and executive insights</p>
            </div>

            {/* Dashboard Filters */}
            <div className="bg-white p-5 rounded-xl mb-6 border border-gray-200 flex gap-4 flex-wrap items-center">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Property</label>
                <select className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 min-w-[150px]">
                  <option>All Properties</option>
                  <option>SOGO Hotel Manila</option>
                  <option>SOGO Hotel Quezon City</option>
                  <option>SOGO Hotel Makati</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Date Range</label>
                <select className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 min-w-[150px]">
                  <option>Today</option>
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>This Month</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Department</label>
                <select className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 min-w-[150px]">
                  <option>All Departments</option>
                  <option>Engineering</option>
                  <option>Housekeeping</option>
                  <option>IT Support</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Auto-Refresh</label>
                <select className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 min-w-[150px]">
                  <option value="0">Off</option>
                  <option value="30">30 seconds</option>
                  <option value="60">1 minute</option>
                  <option value="300">5 minutes</option>
                </select>
              </div>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl p-5 border border-gray-200 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-red-600"></div>
                <div className="flex justify-between items-start mb-3">
                  <div className="text-[13px] font-semibold text-gray-500 uppercase tracking-wide">Total Tickets</div>
                  <div className="text-2xl opacity-60">📋</div>
                </div>
                <div className="text-3xl font-extrabold text-gray-800 mb-2">247</div>
                <div className="inline-flex items-center gap-1 text-[13px] font-semibold px-2 py-0.5 rounded bg-green-100 text-green-800">
                  ↑ 12% <span className="font-normal opacity-70">vs last period</span>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5 border border-gray-200 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 to-red-600"></div>
                <div className="flex justify-between items-start mb-3">
                  <div className="text-[13px] font-semibold text-gray-500 uppercase tracking-wide">Critical (P1)</div>
                  <div className="text-2xl opacity-60">🚨</div>
                </div>
                <div className="text-3xl font-extrabold text-gray-800 mb-2">8</div>
                <div className="inline-flex items-center gap-1 text-[13px] font-semibold px-2 py-0.5 rounded bg-red-100 text-red-800">
                  ↑ 3 <span className="font-normal opacity-70">needs attention</span>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5 border border-gray-200 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-emerald-600"></div>
                <div className="flex justify-between items-start mb-3">
                  <div className="text-[13px] font-semibold text-gray-500 uppercase tracking-wide">SLA Compliance</div>
                  <div className="text-2xl opacity-60">✅</div>
                </div>
                <div className="text-3xl font-extrabold text-gray-800 mb-2">94.2%</div>
                <div className="inline-flex items-center gap-1 text-[13px] font-semibold px-2 py-0.5 rounded bg-green-100 text-green-800">
                  ↑ 2.1% <span className="font-normal opacity-70">improved</span>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5 border border-gray-200 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-amber-600"></div>
                <div className="flex justify-between items-start mb-3">
                  <div className="text-[13px] font-semibold text-gray-500 uppercase tracking-wide">Avg Resolution Time</div>
                  <div className="text-2xl opacity-60">⏱️</div>
                </div>
                <div className="text-3xl font-extrabold text-gray-800 mb-2">4.2h</div>
                <div className="inline-flex items-center gap-1 text-[13px] font-semibold px-2 py-0.5 rounded bg-green-100 text-green-800">
                  ↓ 18min <span className="font-normal opacity-70">faster</span>
                </div>
              </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
              <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex justify-between items-center mb-5 pb-4 border-b-2 border-gray-100 flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <h3 className="text-base font-bold text-gray-800">📈 Ticket Volume Trend</h3>
                    <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                      <span className="font-semibold">Live</span>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <button className="px-3 py-1.5 border border-gray-200 bg-white rounded-md text-xs font-semibold text-gray-500 hover:border-red-500 hover:text-red-500">📅 Day</button>
                    <button className="px-3 py-1.5 border border-red-500 bg-red-500 text-white rounded-md text-xs font-semibold">📊 Week</button>
                    <button className="px-3 py-1.5 border border-gray-200 bg-white rounded-md text-xs font-semibold text-gray-500 hover:border-red-500 hover:text-red-500">📆 Month</button>
                  </div>
                </div>
                <div className="h-64 flex items-end justify-around gap-3 px-4 py-5">
                  {volumeChartData.week.map((data, idx) => (
                    <div 
                      key={idx} 
                      className="flex flex-col items-center gap-2 flex-1 cursor-pointer"
                      onClick={() => setSelectedBar(idx)}
                    >
                      <div className="text-sm font-bold text-gray-800">{data.value}</div>
                      <div 
                        className={`w-full rounded-t-lg transition-all duration-300 bg-gradient-to-t from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 ${selectedBar === idx ? 'ring-2 ring-red-300' : ''}`}
                        style={{ height: `${(data.value / chartMax) * 180}px` }}
                      ></div>
                      <div className="text-xs font-semibold text-gray-500">{data.day}</div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between px-6 pt-4 border-t-2 border-gray-100 mt-4 bg-gradient-to-b from-gray-50 to-white flex-wrap gap-4">
                  <div className="text-center flex-1 min-w-[120px]">
                    <div className="text-[11px] text-gray-500 uppercase tracking-wide mb-1.5 font-semibold">Total Tickets</div>
                    <div className="text-3xl font-extrabold text-red-500">{chartTotal}</div>
                  </div>
                  <div className="text-center flex-1 min-w-[120px]">
                    <div className="text-[11px] text-gray-500 uppercase tracking-wide mb-1.5 font-semibold">Average</div>
                    <div className="text-3xl font-extrabold text-emerald-500">{chartAvg}</div>
                  </div>
                  <div className="text-center flex-1 min-w-[120px]">
                    <div className="text-[11px] text-gray-500 uppercase tracking-wide mb-1.5 font-semibold">Peak Period</div>
                    <div className="text-lg font-extrabold text-gray-800 mt-1.5">{peakDay.day}</div>
                    <div className="text-[10px] text-amber-500 mt-0.5 font-semibold">{peakDay.value} tickets</div>
                  </div>
                  <div className="text-center flex-1 min-w-[120px]">
                    <div className="text-[11px] text-gray-500 uppercase tracking-wide mb-1.5 font-semibold">Trend</div>
                    <div className="text-2xl font-extrabold mt-1.5 text-emerald-500">↗</div>
                    <div className="text-[10px] mt-0.5 font-semibold text-emerald-500">+12% growth</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex justify-between items-center mb-5 pb-4 border-b-2 border-gray-100">
                  <h3 className="text-base font-bold text-gray-800">🎯 Ticket Status Distribution</h3>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-48 h-48 rounded-full relative mx-auto" style={{
                    background: 'conic-gradient(#10b981 0deg 216deg, #f59e0b 216deg 288deg, #ef4444 288deg 360deg)'
                  }}>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] bg-white rounded-full"></div>
                  </div>
                  <div className="flex flex-col gap-3 mt-5 w-full">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded bg-emerald-500"></div>
                      <span className="flex-1 text-[13px] text-gray-500">Resolved</span>
                      <span className="text-sm font-bold text-gray-800">148 (60%)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded bg-amber-500"></div>
                      <span className="flex-1 text-[13px] text-gray-500">In Progress</span>
                      <span className="text-sm font-bold text-gray-800">74 (30%)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded bg-red-500"></div>
                      <span className="flex-1 text-[13px] text-gray-500">Open</span>
                      <span className="text-sm font-bold text-gray-800">25 (10%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Executive Summary */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-5 pb-4 border-b-2 border-gray-100">
                <h3 className="text-base font-bold text-gray-800">📋 Executive Summary</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
                <div className="flex flex-col gap-1">
                  <span className="uppercase text-xs tracking-wide text-gray-500 font-medium">First Response Time</span>
                  <span className="text-[15px] font-semibold text-gray-900">3.2 minutes</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="uppercase text-xs tracking-wide text-gray-500 font-medium">Resolution Rate</span>
                  <span className="text-[15px] font-semibold text-gray-900">87.5%</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="uppercase text-xs tracking-wide text-gray-500 font-medium">Escalation Rate</span>
                  <span className="text-[15px] font-semibold text-gray-900">4.2%</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="uppercase text-xs tracking-wide text-gray-500 font-medium">Active Staff</span>
                  <span className="text-[15px] font-semibold text-gray-900">42 on duty</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Intake View */}
        {currentView === 'intake' && (
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <span className="text-red-500 cursor-pointer hover:text-red-600 hover:underline" onClick={showLanding}>🏠 Home</span>
              <span className="text-gray-300">›</span>
              <span>Ticket Intake & Classification</span>
            </div>

            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-6 flex items-center gap-2 flex-wrap">
              <span className="text-xl">📥</span>
              <span className="text-gray-900 font-bold">TICKET INTAKE & CLASSIFICATION</span>
              <span className="text-[13px] font-normal text-gray-500 normal-case tracking-normal ml-2 pl-4 border-l-2 border-gray-300">Omni-Channel Ticket Creation & Smart Triage</span>
            </div>

            {validationError && (
              <div className="bg-red-50 border-l-4 border-red-600 p-3 rounded-lg mb-5">
                <div className="font-semibold text-red-800 mb-1">⚠️ Validation Error</div>
                <div className="text-[13px] text-gray-500">{validationError}</div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Form Card */}
              <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <form onSubmit={handleSubmit}>
                  <div className="mb-8">
                    <div className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2 pb-3 border-b-2 border-gray-100">
                      <span>📡</span>
                      Channel & Source
                    </div>
                    <div className="mb-5">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Channel <span className="text-red-600 ml-0.5">*</span>
                      </label>
                      <select 
                        className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-800 transition-all focus:outline-none focus:border-red-500 focus:ring-[3px] focus:ring-red-500/10"
                        value={channel}
                        onChange={(e) => setChannel(e.target.value)}
                        required
                      >
                        <option value="">Select Channel</option>
                        <option value="front-desk">Front Desk</option>
                        <option value="phone">Phone Call</option>
                        <option value="mobile-app">Mobile App</option>
                        <option value="email">Email</option>
                      </select>
                    </div>
                    <div className="mb-5">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Requester Name <span className="text-red-600 ml-0.5">*</span>
                      </label>
                      <input 
                        type="text" 
                        className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-800 transition-all focus:outline-none focus:border-red-500 focus:ring-[3px] focus:ring-red-500/10"
                        placeholder="Enter name"
                        value={requester}
                        onChange={(e) => setRequester(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-5">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Contact Information <span className="text-red-600 ml-0.5">*</span>
                      </label>
                      <input 
                        type="text" 
                        className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-800 transition-all focus:outline-none focus:border-red-500 focus:ring-[3px] focus:ring-red-500/10"
                        placeholder="Phone or email"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-8">
                    <div className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2 pb-3 border-b-2 border-gray-100">
                      <span>📍</span>
                      Location
                    </div>
                    <div className="mb-5">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Room / Area <span className="text-red-600 ml-0.5">*</span>
                      </label>
                      <input 
                        type="text" 
                        className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-800 transition-all focus:outline-none focus:border-red-500 focus:ring-[3px] focus:ring-red-500/10"
                        placeholder="e.g., Room 305, Lobby"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-8">
                    <div className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2 pb-3 border-b-2 border-gray-100">
                      <span>📝</span>
                      Request Details
                    </div>
                    <div className="mb-5">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Category <span className="text-red-600 ml-0.5">*</span>
                      </label>
                      <select 
                        className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-800 transition-all focus:outline-none focus:border-red-500 focus:ring-[3px] focus:ring-red-500/10"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                      >
                        <option value="">Select Category</option>
                        <option value="housekeeping">Housekeeping</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="engineering">Engineering</option>
                        <option value="it-support">IT Support</option>
                        <option value="fnb">Food & Beverage</option>
                        <option value="emergency">Emergency</option>
                      </select>
                    </div>
                    <div className="mb-5">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Brief Description <span className="text-red-600 ml-0.5">*</span>
                      </label>
                      <textarea 
                        className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-800 transition-all focus:outline-none focus:border-red-500 focus:ring-[3px] focus:ring-red-500/10 resize-y min-h-[100px]"
                        placeholder="Describe the issue..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button type="submit" className="px-6 py-3 rounded-lg text-sm font-semibold cursor-pointer transition-all bg-red-500 text-white hover:bg-red-600 flex items-center gap-2">
                      ✔ Create Ticket
                    </button>
                    <button type="button" className="px-6 py-3 rounded-lg text-sm font-semibold cursor-pointer transition-all bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 flex items-center gap-2" onClick={resetForm}>
                      ✕ Clear Form
                    </button>
                  </div>
                </form>
              </div>

              {/* Triage Panel */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm sticky top-5">
                <div className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-5">
                  <span>🎯</span>
                  Smart Triage
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Auto-Assigned Priority</div>
                    <div className={`text-2xl font-bold ${
                      triageData.priority === 'P1' ? 'text-red-600' :
                      triageData.priority === 'P2' ? 'text-amber-600' :
                      'text-green-600'
                    }`}>{triageData.priority}</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Target SLA</div>
                    <div className="text-xl font-bold text-gray-800">{triageData.sla}</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Assigned Team</div>
                    <div className="text-lg font-semibold text-gray-800">{triageData.team}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
        </>
      )}
    </div>
  )
}

export default DashboardSectionA
