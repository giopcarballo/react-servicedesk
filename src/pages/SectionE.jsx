import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import SidebarToggle from '../components/SidebarToggle'

const servicesData = [
  { id: 1, code: 'ENG-001', name: 'AC Repair', department: 'Engineering', baseRate: 2500, unit: 'per service', sla: '4 hours' },
  { id: 2, code: 'IT-001', name: 'Network Setup', department: 'IT', baseRate: 3500, unit: 'per setup', sla: '8 hours' },
  { id: 3, code: 'HK-001', name: 'Deep Cleaning', department: 'Housekeeping', baseRate: 1500, unit: 'per room', sla: '2 hours' },
  { id: 4, code: 'MNT-001', name: 'Plumbing Repair', department: 'Maintenance', baseRate: 2000, unit: 'per service', sla: '4 hours' },
  { id: 5, code: 'ENG-002', name: 'Electrical Work', department: 'Engineering', baseRate: 3000, unit: 'per hour', sla: '2 hours' },
]

const collectionByBranch = [
  { branch: 'Manila Main', collected: 125000, target: 150000 },
  { branch: 'Quezon City', collected: 98000, target: 100000 },
  { branch: 'Makati', collected: 156000, target: 120000 },
  { branch: 'Cebu', collected: 75000, target: 80000 },
]

const collectionByDept = [
  { dept: 'Engineering', icon: '🔧', collected: 185000 },
  { dept: 'IT Support', icon: '💻', collected: 125000 },
  { dept: 'Housekeeping', icon: '🧹', collected: 98000 },
  { dept: 'Maintenance', icon: '🔨', collected: 156000 },
]

function SectionE() {
  const navigate = useNavigate()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState('pricing')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDept, setSelectedDept] = useState('all')
  const [showPricingModal, setShowPricingModal] = useState(false)
  const [selectedService, setSelectedService] = useState(null)

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

  const filteredServices = servicesData.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.code.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDept = selectedDept === 'all' || service.department === selectedDept
    return matchesSearch && matchesDept
  })

  const totalCollected = collectionByBranch.reduce((sum, b) => sum + b.collected, 0)
  const totalTarget = collectionByBranch.reduce((sum, b) => sum + b.target, 0)

  return (
    <div className="font-sans bg-gray-50 min-h-screen text-gray-800">
      <Sidebar collapsed={sidebarCollapsed} onNavigate={navigateToModule} />
      <SidebarToggle collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      {/* Header */}
      <div className={`bg-gradient-to-br from-indigo-900 to-indigo-600 text-white shadow-lg transition-all duration-300 ${sidebarCollapsed ? '' : 'with-sidebar'}`}>
        <div className="max-w-7xl mx-auto px-4 pt-4 pb-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center flex-wrap gap-4 mb-5">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-3 mb-2">
                <span className="text-3xl">💳</span>
                Section E: Financial & Closure
              </h1>
              <div className="text-base opacity-90">Service Pricing & Collection Management</div>
            </div>
            <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-lg cursor-pointer transition-all hover:bg-white/15">
              <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center font-semibold text-white border-2 border-white/30 relative">
                AD
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-gray-800 text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-indigo-900 min-w-[18px] text-center animate-pulse">3</span>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
            <div className="bg-white/10 rounded-xl p-3.5 flex items-center gap-3">
              <div className="text-xl">💰</div>
              <div>
                <div className="text-xs opacity-80 mb-1">Total Collection</div>
                <div className="text-2xl font-bold">₱{(totalCollected / 1000).toFixed(0)}K</div>
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-3.5 flex items-center gap-3">
              <div className="text-xl">🎯</div>
              <div>
                <div className="text-xs opacity-80 mb-1">Target</div>
                <div className="text-2xl font-bold">₱{(totalTarget / 1000).toFixed(0)}K</div>
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-3.5 flex items-center gap-3">
              <div className="text-xl">📊</div>
              <div>
                <div className="text-xs opacity-80 mb-1">Achievement</div>
                <div className="text-2xl font-bold">{Math.round((totalCollected / totalTarget) * 100)}%</div>
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-3.5 flex items-center gap-3">
              <div className="text-xl">📋</div>
              <div>
                <div className="text-xs opacity-80 mb-1">Services</div>
                <div className="text-2xl font-bold">{servicesData.length}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 transition-all duration-300 ${sidebarCollapsed ? '' : 'with-sidebar'}`}>
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 bg-white p-2 rounded-lg shadow-sm border border-gray-200">
          <button
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${activeTab === 'pricing' ? 'bg-indigo-500 text-white' : 'bg-transparent text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('pricing')}
          >
            <span>💰</span>Service Pricing
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${activeTab === 'collection' ? 'bg-indigo-500 text-white' : 'bg-transparent text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('collection')}
          >
            <span>📊</span>Collection Summary
          </button>
        </div>

        {/* Pricing Tab */}
        {activeTab === 'pricing' && (
          <div>
            {/* Filters */}
            <div className="bg-white rounded-xl p-4 mb-6 border border-gray-200 flex gap-4 flex-wrap">
              <div className="flex-1 min-w-[200px]">
                <input 
                  type="text" 
                  placeholder="Search services..." 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select 
                className="border border-gray-300 rounded-lg px-4 py-2.5"
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
              >
                <option value="all">All Departments</option>
                <option value="Engineering">Engineering</option>
                <option value="IT">IT</option>
                <option value="Housekeeping">Housekeeping</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>

            {/* Services Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left p-4 font-semibold text-gray-700">Code</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Service Name</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Department</th>
                    <th className="text-right p-4 font-semibold text-gray-700">Base Rate</th>
                    <th className="text-center p-4 font-semibold text-gray-700">SLA</th>
                    <th className="text-center p-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredServices.map((service) => (
                    <tr key={service.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-4 font-mono text-indigo-600">{service.code}</td>
                      <td className="p-4 font-medium text-gray-800">{service.name}</td>
                      <td className="p-4 text-gray-600">{service.department}</td>
                      <td className="p-4 text-right">
                        <div className="font-bold text-gray-800">₱{service.baseRate.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">{service.unit}</div>
                      </td>
                      <td className="p-4 text-center">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">{service.sla}</span>
                      </td>
                      <td className="p-4 text-center">
                        <button 
                          className="px-3 py-1 bg-indigo-500 text-white rounded text-xs font-semibold hover:bg-indigo-600"
                          onClick={() => { setSelectedService(service); setShowPricingModal(true); }}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Collection Tab */}
        {activeTab === 'collection' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* By Branch */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>🏢</span> Collection by Branch
              </h3>
              <div className="space-y-4">
                {collectionByBranch.map((branch, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">{branch.branch}</span>
                      <span className="text-gray-600">
                        ₱{(branch.collected / 1000).toFixed(0)}K / ₱{(branch.target / 1000).toFixed(0)}K
                      </span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-3 rounded-full ${(branch.collected / branch.target) >= 1 ? 'bg-green-500' : (branch.collected / branch.target) >= 0.8 ? 'bg-amber-500' : 'bg-red-500'}`}
                        style={{ width: `${Math.min((branch.collected / branch.target) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-right mt-1">
                      <span className={`font-semibold ${(branch.collected / branch.target) >= 1 ? 'text-green-600' : 'text-gray-500'}`}>
                        {Math.round((branch.collected / branch.target) * 100)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* By Department */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>📊</span> Collection by Department
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {collectionByDept.map((dept, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
                    <div className="text-3xl mb-2">{dept.icon}</div>
                    <div className="text-sm font-medium text-gray-600 mb-1">{dept.dept}</div>
                    <div className="text-xl font-bold text-gray-800">₱{(dept.collected / 1000).toFixed(0)}K</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary Stats */}
            <div className="lg:col-span-2 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-6 text-white">
              <h3 className="text-lg font-bold mb-4">📈 Overall Collection Statistics</h3>
              <div className="grid grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold">₱{(totalCollected / 1000).toFixed(0)}K</div>
                  <div className="text-sm opacity-80">Total Collected</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">₱{(totalTarget / 1000).toFixed(0)}K</div>
                  <div className="text-sm opacity-80">Total Target</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">{Math.round((totalCollected / totalTarget) * 100)}%</div>
                  <div className="text-sm opacity-80">Achievement Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">₱{((totalTarget - totalCollected) / 1000).toFixed(0)}K</div>
                  <div className="text-sm opacity-80">Remaining</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pricing Modal */}
      {showPricingModal && selectedService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowPricingModal(false)}>
          <div className="bg-white rounded-xl p-6 w-full max-w-md m-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Service Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Service Code</span>
                <span className="font-semibold text-indigo-600">{selectedService.code}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Service Name</span>
                <span className="font-semibold">{selectedService.name}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Department</span>
                <span className="font-semibold">{selectedService.department}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Base Rate</span>
                <span className="font-bold text-lg">₱{selectedService.baseRate.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">SLA</span>
                <span className="font-semibold">{selectedService.sla}</span>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button className="flex-1 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50" onClick={() => setShowPricingModal(false)}>Close</button>
              <button className="flex-1 py-2 bg-indigo-500 text-white rounded-lg font-semibold hover:bg-indigo-600" onClick={() => { alert('Service request submitted!'); setShowPricingModal(false); }}>Request Service</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SectionE
