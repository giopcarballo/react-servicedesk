import { useMemo, useState } from 'react'
import Sidebar from '../components/Sidebar'
import SidebarToggle from '../components/SidebarToggle'

const branchCards = [
  { name: 'Alabang', tickets: 2, amount: 25000 },
  { name: 'Bagong Barrio', tickets: 2, amount: 7000 },
  { name: 'EDSA Cubao', tickets: 4, amount: 79000 },
  { name: 'Fairview', tickets: 2, amount: 26000 },
  { name: 'Makati Avenue', tickets: 2, amount: 10500 },
  { name: 'North EDSA', tickets: 2, amount: 38500 },
  { name: 'Pasay Rotonda', tickets: 2, amount: 45000 },
  { name: 'Sta. Mesa', tickets: 2, amount: 21500 },
]

const servicesData = [
  { code: 'ENG01', name: 'Major HVAC Repair', department: 'Engineering', branch: 'EDSA Cubao', sla: '24-48 hours', baseRate: 50000 },
  { code: 'ENG02', name: 'Electrical System Upgrade', department: 'Engineering', branch: 'Pasay Rotonda', sla: '3 days', baseRate: 25000 },
  { code: 'ENG03', name: 'Plumbing Overhaul', department: 'Engineering', branch: 'Sta. Mesa', sla: '7 days', baseRate: 15000 },
  { code: 'HK01', name: 'Deep Cleaning Service', department: 'Housekeeping', branch: 'EDSA Cubao', sla: '6 hours', baseRate: 5000 },
  { code: 'HK02', name: 'Carpet & Upholstery Cleaning', department: 'Housekeeping', branch: 'Novaliches', sla: '1 day', baseRate: 8000 },
  { code: 'HK03', name: 'Linen Replacement', department: 'Housekeeping', branch: 'North EDSA', sla: '2 hours', baseRate: 2000 },
  { code: 'FO01', name: 'Guest Complaint Resolution', department: 'Front Office', branch: 'Makati Avenue', sla: '1-7 days', baseRate: 2500 },
  { code: 'FO02', name: 'VIP Guest Setup', department: 'Front Office', branch: 'Alabang', sla: 'Same day', baseRate: 10000 },
  { code: 'FO03', name: 'Room Transfer Assistance', department: 'Front Office', branch: 'Bagong Barrio', sla: '30 mins', baseRate: 1500 },
  { code: 'FNB01', name: 'Kitchen Equipment Repair', department: 'F&B', branch: 'EDSA Cubao', sla: '4 hours', baseRate: 12000 },
  { code: 'FNB02', name: 'Banquet Setup Service', department: 'F&B', branch: 'Pasay Rotonda', sla: '1 day', baseRate: 20000 },
  { code: 'FNB03', name: 'In-Room Dining Setup', department: 'F&B', branch: 'Sta. Mesa', sla: '2 hours', baseRate: 6500 },
  { code: 'IT01', name: 'Network Infrastructure Setup', department: 'IT', branch: 'North EDSA', sla: '3-5 days', baseRate: 35000 },
  { code: 'IT02', name: 'POS System Maintenance', department: 'IT', branch: 'Makati Avenue', sla: '4-6 hours', baseRate: 8000 },
  { code: 'IT03', name: 'CCTV System Upgrade', department: 'IT', branch: 'Alabang', sla: '1-3 days', baseRate: 15000 },
  { code: 'SEC01', name: 'Access Control System Install', department: 'Security', branch: 'Fairview', sla: '2-3 days', baseRate: 18000 },
  { code: 'SEC02', name: 'Emergency Response Training', department: 'Security', branch: 'Bagong Barrio', sla: '1 day', baseRate: 5500 },
  { code: 'SEC03', name: 'Fire Safety Inspection', department: 'Security', branch: 'EDSA Cubao', sla: '4-6 hours', baseRate: 12000 },
]

const departmentOptions = ['All Departments', ...new Set(servicesData.map((s) => s.department))]
const branchOptions = ['All Branches', ...new Set(servicesData.map((s) => s.branch))]

const deptBadgeClasses = {
  Engineering: 'bg-amber-100 text-amber-700',
  IT: 'bg-cyan-100 text-cyan-700',
  Housekeeping: 'bg-emerald-100 text-emerald-700',
  'F&B': 'bg-pink-100 text-pink-700',
  Security: 'bg-rose-100 text-rose-700',
  'Front Office': 'bg-violet-100 text-violet-700',
}

function formatCurrency(value) {
  return `₱${value.toLocaleString('en-PH')}`
}

function SectionE() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState('pricing')
  const [deptFilter, setDeptFilter] = useState('All Departments')
  const [branchFilter, setBranchFilter] = useState('All Branches')

  const filteredServices = useMemo(() => {
    return servicesData.filter((service) => {
      const byDept = deptFilter === 'All Departments' || service.department === deptFilter
      const byBranch = branchFilter === 'All Branches' || service.branch === branchFilter
      return byDept && byBranch
    })
  }, [deptFilter, branchFilter])

  const grandTotalTickets = branchCards.reduce((sum, card) => sum + card.tickets, 0)
  const grandTotalAmount = branchCards.reduce((sum, card) => sum + card.amount, 0)

  const resetFilters = () => {
    setDeptFilter('All Departments')
    setBranchFilter('All Branches')
  }

  const metrics = [
    { label: 'Active Requests', icon: '📄', value: 0 },
    { label: 'Open Problems', icon: '⚠️', value: 0 },
    { label: 'Pending Changes', icon: '📦', value: 0 },
    { label: 'Tasks Due Today', icon: '☑️', value: 0 },
  ]

  return (
    <div className="min-h-screen bg-[#f5f6fb] text-gray-800">
      <Sidebar collapsed={sidebarCollapsed} />
      <SidebarToggle collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed((prev) => !prev)} />

      <div className={`transition-all duration-300 ${sidebarCollapsed ? '' : 'with-sidebar'}`}>
        <header className="bg-gradient-to-br from-[#1f3c8e] via-[#2f5fcc] to-[#418cf4] text-white shadow-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <span className="text-2xl">📘</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold leading-tight">ServiceDesk</h1>
                  <p className="text-sm text-white/80">IT Service Management Platform</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/10 border border-white/10 px-4 py-2 rounded-xl backdrop-blur">
                <div className="w-11 h-11 rounded-full bg-indigo-500 flex items-center justify-center font-semibold border border-white/30">AD</div>
                <div>
                  <p className="text-sm font-semibold">Admin User</p>
                  <p className="text-xs text-white/80">System Administrator</p>
                </div>
                <span className="text-xs bg-amber-300 text-slate-900 font-semibold px-2 py-1 rounded-full border border-white">0</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              {metrics.map((metric) => (
                <div key={metric.label} className="bg-white/15 border border-white/20 rounded-2xl px-4 py-3 flex items-center gap-3">
                  <div className="text-2xl">{metric.icon}</div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-white/80">{metric.label}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-2 flex flex-wrap gap-2 shadow-sm">
            <button
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                activeTab === 'pricing'
                  ? 'bg-gradient-to-r from-[#1f3c8e] to-[#3b82f6] text-white border-transparent shadow'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-[#3b82f6] hover:text-[#3b82f6]'
              }`}
              onClick={() => setActiveTab('pricing')}
            >
              <span>🔖</span> Service Pricing History
            </button>
            <button
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                activeTab === 'collection'
                  ? 'bg-gradient-to-r from-[#1f3c8e] to-[#3b82f6] text-white border-transparent shadow'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-[#3b82f6] hover:text-[#3b82f6]'
              }`}
              onClick={() => setActiveTab('collection')}
            >
              <span>📊</span> Collection per Branch & Department
            </button>
          </div>

          {activeTab === 'pricing' && (
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-gray-100">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Service Pricing History</h2>
                    <p className="text-sm text-gray-500">List of service pricing records per ticket</p>
                  </div>
                  <button className="px-4 py-2 text-xs font-semibold bg-[#1f3c8e] text-white rounded-lg shadow-sm">ACTIVE</button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-6 py-4">
                  {branchCards.map((card) => (
                    <div key={card.name} className="border border-gray-200 rounded-xl p-4 bg-white shadow-[0_6px_18px_-10px_rgba(0,0,0,0.25)]">
                      <p className="text-sm font-semibold text-gray-900">{card.name}</p>
                      <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
                        <span>Tickets</span>
                        <span className="font-semibold text-[#1f3c8e]">{card.tickets}</span>
                      </div>
                      <div className="mt-1 flex items-center justify-between text-sm text-gray-500">
                        <span>Total Amount</span>
                        <span className="font-semibold text-[#1f3c8e]">{formatCurrency(card.amount)}</span>
                      </div>
                    </div>
                  ))}

                  <div className="border border-[#5b6ef5] rounded-xl p-4 bg-gradient-to-br from-[#4f46e5] to-[#6366f1] text-white shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold">Grand Total</p>
                        <p className="text-xs text-white/80">Total Tickets</p>
                        <p className="text-xl font-bold mt-1">{grandTotalTickets}</p>
                      </div>
                      <div className="text-3xl"></div>
                    </div>
                    <div className="mt-3">
                      <p className="text-xs text-white/80">Combined Total</p>
                      <p className="text-2xl font-bold">{formatCurrency(grandTotalAmount)}</p>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-4">
                  <div className="bg-[#e9f2ff] text-[#1f3c8e] border border-[#cddfff] rounded-xl px-4 py-3 text-sm">
                    <span className="font-semibold">Purpose: </span>
                    View service pricing history and transaction records per ticket. Use filters to search by department or branch location.
                  </div>
                </div>

                <div className="px-6 pb-4 flex flex-wrap items-end gap-4">
                  <div className="flex-1 min-w-[200px]">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Department</label>
                    <select
                      className="w-full mt-2 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      value={deptFilter}
                      onChange={(event) => setDeptFilter(event.target.value)}
                    >
                      {departmentOptions.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Hotel Sogo Branch</label>
                    <select
                      className="w-full mt-2 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      value={branchFilter}
                      onChange={(event) => setBranchFilter(event.target.value)}
                    >
                      {branchOptions.map((branch) => (
                        <option key={branch} value={branch}>
                          {branch}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    className="h-10 px-4 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50"
                    onClick={resetFilters}
                  >
                    Reset filters
                  </button>
                  <div className="ml-auto text-xs text-gray-500">
                    Showing {filteredServices.length} of {servicesData.length} records
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-[960px] w-full text-sm">
                    <thead className="bg-gray-50 text-gray-600 uppercase text-[11px] tracking-[0.2em]">
                      <tr>
                        <th className="text-left px-4 py-3">Service Code</th>
                        <th className="text-left px-4 py-3">Service Name</th>
                        <th className="text-left px-4 py-3">Department</th>
                        <th className="text-left px-4 py-3">Hotel Sogo Branch</th>
                        <th className="text-left px-4 py-3">SLA</th>
                        <th className="text-left px-4 py-3">Base Rate</th>
                        <th className="text-center px-4 py-3">Details</th>
                        <th className="text-center px-4 py-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredServices.map((service) => (
                        <tr key={service.code} className="border-t border-gray-100 hover:bg-gray-50">
                          <td className="px-4 py-4">
                            <span className="px-3 py-1 rounded-md bg-emerald-50 text-emerald-700 font-semibold text-xs">
                              {service.code}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <p className="font-semibold text-gray-900">{service.name}</p>
                          </td>
                          <td className="px-4 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                deptBadgeClasses[service.department] || 'bg-gray-100 text-gray-600'
                              }`}
                            >
                              {service.department}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-700">{service.branch}</td>
                          <td className="px-4 py-4">
                            <span className="px-3 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold">
                              {service.sla}
                            </span>
                          </td>
                          <td className="px-4 py-4 font-semibold text-gray-900">{formatCurrency(service.baseRate)}</td>
                          <td className="px-4 py-4 text-center">
                            <button className="px-3 py-1.5 text-xs font-semibold rounded-md border border-gray-200 text-gray-700 hover:bg-gray-100">
                              View
                            </button>
                          </td>
                          <td className="px-4 py-4 text-center">
                            <button className="px-3 py-1.5 text-xs font-semibold rounded-md bg-[#1f3c8e] text-white hover:bg-[#17306f]">
                              Select
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
                <div className="flex items-center gap-3">
                  <span className="text-xl">📝</span>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">Recent Service Requests</h3>
                    <p className="text-xs text-gray-500">Service request history for this ticket</p>
                  </div>
                </div>
                <div className="mt-6 text-center text-gray-500 text-sm py-10 border border-dashed border-gray-200 rounded-xl">
                  No service requests recorded yet
                </div>
              </div>
            </div>
          )}

          {activeTab === 'collection' && (
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 text-center text-gray-600">
              Collection per branch & department view coming soon.
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default SectionE
