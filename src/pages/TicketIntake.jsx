import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import SidebarToggle from '../components/SidebarToggle'

const serviceCategories = [
  {
    id: 'big',
    name: 'Business Intelligence Group',
    icon: '📊',
    templates: [
      { id: 'big01', name: 'Feasibility Study', type: 'service', desc: 'Comprehensive feasibility study preparation', code: 'BIG01', baseRate: 50000, sla: '45-90 days' },
      { id: 'big02', name: 'Data Analysis', type: 'service', desc: 'Business data analysis and reporting', code: 'BIG02', baseRate: 25000, sla: '7-14 days' },
      { id: 'big03', name: 'Market Research', type: 'service', desc: 'Market research and competitive analysis', code: 'BIG03', baseRate: 35000, sla: '14-30 days' },
    ]
  },
  {
    id: 'it',
    name: 'IT Department',
    icon: '💻',
    templates: [
      { id: 'it01', name: 'Hardware Setup', type: 'service', desc: 'Computer and hardware installation', code: 'IT01', baseRate: 2500, sla: '4 hours' },
      { id: 'it02', name: 'Network Issue', type: 'incident', desc: 'Network connectivity problems', code: 'IT02', baseRate: 1500, sla: '2 hours' },
      { id: 'it03', name: 'Software Installation', type: 'service', desc: 'Software setup and configuration', code: 'IT03', baseRate: 2000, sla: '4 hours' },
      { id: 'it04', name: 'Email Setup', type: 'service', desc: 'Email account setup and configuration', code: 'IT04', baseRate: 1000, sla: '2 hours' },
    ]
  },
  {
    id: 'facilities',
    name: 'Facilities Management',
    icon: '🏢',
    templates: [
      { id: 'fac01', name: 'AC Maintenance', type: 'service', desc: 'Air conditioning service and repair', code: 'FAC01', baseRate: 3500, sla: '4 hours' },
      { id: 'fac02', name: 'Plumbing Issue', type: 'incident', desc: 'Plumbing repairs and maintenance', code: 'FAC02', baseRate: 2500, sla: '2 hours' },
      { id: 'fac03', name: 'Electrical Work', type: 'service', desc: 'Electrical repairs and installation', code: 'FAC03', baseRate: 3000, sla: '4 hours' },
    ]
  },
  {
    id: 'housekeeping',
    name: 'Housekeeping',
    icon: '🧹',
    templates: [
      { id: 'hk01', name: 'Room Cleaning', type: 'service', desc: 'Standard room cleaning service', code: 'HK01', baseRate: 500, sla: '1 hour' },
      { id: 'hk02', name: 'Deep Cleaning', type: 'service', desc: 'Deep cleaning and sanitization', code: 'HK02', baseRate: 1500, sla: '2 hours' },
      { id: 'hk03', name: 'Laundry Service', type: 'service', desc: 'Laundry and dry cleaning', code: 'HK03', baseRate: 300, sla: '24 hours' },
    ]
  },
]

function TicketIntake() {
  const navigate = useNavigate()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [filterType, setFilterType] = useState('all')
  const [showTicketModal, setShowTicketModal] = useState(false)
  const [ticketType, setTicketType] = useState('service')

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

  const getFilteredTemplates = () => {
    if (!selectedCategory) return []
    const category = serviceCategories.find(c => c.id === selectedCategory)
    if (!category) return []
    if (filterType === 'all') return category.templates
    return category.templates.filter(t => t.type === filterType)
  }

  const handleCreateTicket = () => {
    alert(`✅ Ticket Created!\n\nType: ${ticketType.toUpperCase()}\nService: ${selectedTemplate?.name}\nCode: ${selectedTemplate?.code}\nEstimated Cost: ₱${selectedTemplate?.baseRate?.toLocaleString()}`)
    setShowTicketModal(false)
    setSelectedTemplate(null)
  }

  return (
    <div className="font-sans bg-gray-50 min-h-screen text-gray-800">
      <Sidebar collapsed={sidebarCollapsed} onNavigate={navigateToModule} />
      <SidebarToggle collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      {/* Header */}
      <div className={`bg-gradient-to-br from-amber-900 to-amber-600 text-white shadow-lg transition-all duration-300 ${sidebarCollapsed ? '' : 'with-sidebar'}`}>
        <div className="max-w-7xl mx-auto px-4 pt-4 pb-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center flex-wrap gap-4 mb-5">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-3 mb-2">
                <span className="text-3xl">📥</span>
                Ticket Intake & Classification
              </h1>
              <div className="text-base opacity-90">Service Catalog & Template Management</div>
            </div>
            <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-lg cursor-pointer transition-all hover:bg-white/15">
              <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center font-semibold text-white border-2 border-white/30 relative">
                AD
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-gray-800 text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-amber-900 min-w-[18px] text-center animate-pulse">3</span>
              </div>
              <div className="flex flex-col leading-tight">
                <div className="font-semibold text-sm">Admin User</div>
                <div className="text-xs opacity-80 flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  System Administrator
                </div>
              </div>
              <span className="ml-2 opacity-70">▼</span>
            </div>
          </div>
        </div>
      </div>

      <div className={`max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 transition-all duration-300 ${sidebarCollapsed ? '' : 'with-sidebar'}`}>
        <div className="grid grid-cols-[280px_1fr] gap-6">
          {/* Sidebar - Categories */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-bold text-gray-800">Service Categories</h3>
            </div>
            <div className="p-2">
              {serviceCategories.map((category) => (
                <div
                  key={category.id}
                  className={`p-3 rounded-lg cursor-pointer transition-all flex items-center gap-3 ${selectedCategory === category.id ? 'bg-amber-100 border-l-4 border-l-amber-500' : 'hover:bg-gray-50'}`}
                  onClick={() => { setSelectedCategory(category.id); setSelectedTemplate(null); }}
                >
                  <span className="text-xl">{category.icon}</span>
                  <div>
                    <div className="font-medium text-gray-800">{category.name}</div>
                    <div className="text-xs text-gray-500">{category.templates.length} templates</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content - Templates */}
          <div>
            {selectedCategory ? (
              <>
                {/* Filter Bar */}
                <div className="bg-white rounded-xl p-4 mb-6 border border-gray-200 flex gap-4 items-center">
                  <span className="text-sm text-gray-600">Filter by type:</span>
                  <div className="flex gap-2">
                    {['all', 'service', 'incident'].map((type) => (
                      <button
                        key={type}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filterType === type ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        onClick={() => setFilterType(type)}
                      >
                        {type === 'all' ? '📋 All' : type === 'service' ? '🔧 Service' : '🚨 Incident'}
                      </button>
                    ))}
                  </div>
                  <button
                    className="ml-auto px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-semibold hover:bg-amber-600"
                    onClick={() => setShowTicketModal(true)}
                  >
                    + New Ticket
                  </button>
                </div>

                {/* Templates Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getFilteredTemplates().map((template) => (
                    <div
                      key={template.id}
                      className={`bg-white rounded-xl p-5 border-2 cursor-pointer transition-all ${selectedTemplate?.id === template.id ? 'border-amber-500 shadow-lg' : 'border-gray-200 hover:border-amber-300 hover:shadow-md'}`}
                      onClick={() => setSelectedTemplate(template)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${template.type === 'service' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>
                          {template.type === 'service' ? '🔧 Service' : '🚨 Incident'}
                        </span>
                        <span className="font-mono text-xs text-gray-500">{template.code}</span>
                      </div>
                      <h4 className="font-bold text-gray-800 mb-2">{template.name}</h4>
                      <p className="text-sm text-gray-500 mb-3">{template.desc}</p>
                      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                        <div>
                          <div className="text-xs text-gray-500">Base Rate</div>
                          <div className="font-bold text-gray-800">₱{template.baseRate.toLocaleString()}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gray-500">SLA</div>
                          <div className="font-semibold text-amber-600">{template.sla}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
                <div className="text-5xl mb-4">📂</div>
                <div className="text-lg font-semibold text-gray-800 mb-2">Select a Category</div>
                <div className="text-sm text-gray-500">Choose a service category from the sidebar to view available templates</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Ticket Modal */}
      {showTicketModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowTicketModal(false)}>
          <div className="bg-white rounded-xl w-full max-w-2xl m-4 shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Create New Ticket</h2>
            </div>
            <div className="p-6 space-y-6">
              {/* Ticket Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Ticket Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer text-center transition-all ${ticketType === 'incident' ? 'border-amber-500 bg-amber-50' : 'border-gray-200 hover:border-amber-300'}`}
                    onClick={() => setTicketType('incident')}
                  >
                    <div className="text-2xl mb-2">🚨</div>
                    <div className="font-semibold">Incident Report</div>
                    <div className="text-xs text-gray-500">Unexpected issues</div>
                  </div>
                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer text-center transition-all ${ticketType === 'service' ? 'border-amber-500 bg-amber-50' : 'border-gray-200 hover:border-amber-300'}`}
                    onClick={() => setTicketType('service')}
                  >
                    <div className="text-2xl mb-2">🔧</div>
                    <div className="font-semibold">Service Request</div>
                    <div className="text-xs text-gray-500">Planned services</div>
                  </div>
                </div>
              </div>

              {/* Category & Service */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                  <select 
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                    value={selectedCategory || ''}
                    onChange={(e) => { setSelectedCategory(e.target.value); setSelectedTemplate(null); }}
                  >
                    <option value="">Select category</option>
                    {serviceCategories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Service</label>
                  <select 
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                    value={selectedTemplate?.id || ''}
                    onChange={(e) => {
                      const cat = serviceCategories.find(c => c.id === selectedCategory)
                      const template = cat?.templates.find(t => t.id === e.target.value)
                      setSelectedTemplate(template)
                    }}
                    disabled={!selectedCategory}
                  >
                    <option value="">Select service</option>
                    {getFilteredTemplates().map(template => (
                      <option key={template.id} value={template.id}>{template.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea className="w-full border border-gray-300 rounded-lg px-4 py-2.5 h-24" placeholder="Describe the request..."></textarea>
              </div>

              {/* Pricing Preview */}
              {selectedTemplate && (
                <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                  <div className="text-sm font-semibold text-amber-800 mb-2">Pricing Preview</div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-xs text-gray-500">Service Code</div>
                      <div className="font-bold text-gray-800">{selectedTemplate.code}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Base Rate</div>
                      <div className="font-bold text-gray-800">₱{selectedTemplate.baseRate.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">SLA</div>
                      <div className="font-bold text-amber-600">{selectedTemplate.sla}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button className="px-4 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50" onClick={() => setShowTicketModal(false)}>Cancel</button>
              <button className="px-4 py-2 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600" onClick={handleCreateTicket} disabled={!selectedTemplate}>Create Ticket</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TicketIntake
