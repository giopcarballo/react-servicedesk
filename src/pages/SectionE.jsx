import { useMemo, useRef, useState } from 'react'
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
  {
    code: 'ENG01',
    name: 'Major HVAC Repair',
    department: 'Engineering',
    branch: 'EDSA Cubao',
    sla: '24-48 hours',
    baseRate: 50000,
    description: 'Full chiller and AHU recovery with refrigerant recharge and leak isolation for guest areas.',
  },
  {
    code: 'ENG02',
    name: 'Electrical System Upgrade',
    department: 'Engineering',
    branch: 'Pasay Rotonda',
    sla: '3 days',
    baseRate: 25000,
    description: 'Panel rebalancing, breaker replacements, and load certification with compliance report.',
  },
  {
    code: 'ENG03',
    name: 'Plumbing Overhaul',
    department: 'Engineering',
    branch: 'Sta. Mesa',
    sla: '7 days',
    baseRate: 15000,
    description: 'Stack cleaning, riser pressure test, and valve kit swap for guest and service lines.',
  },
  {
    code: 'HK01',
    name: 'Deep Cleaning Service',
    department: 'Housekeeping',
    branch: 'EDSA Cubao',
    sla: '6 hours',
    baseRate: 5000,
    description: 'Detail clean with upholstery extraction and UV sanitation for premium floors.',
  },
  {
    code: 'HK02',
    name: 'Carpet & Upholstery Cleaning',
    department: 'Housekeeping',
    branch: 'Novaliches',
    sla: '1 day',
    baseRate: 8000,
    description: 'Hot water extraction, stain lift, and deodorizing for lobby and suites.',
  },
  {
    code: 'HK03',
    name: 'Linen Replacement',
    department: 'Housekeeping',
    branch: 'North EDSA',
    sla: '2 hours',
    baseRate: 2000,
    description: 'Par level restoration with shrink-wrapped fresh sets and disposal handling.',
  },
  {
    code: 'FO01',
    name: 'Guest Complaint Resolution',
    department: 'Front Office',
    branch: 'Makati Avenue',
    sla: '1-7 days',
    baseRate: 2500,
    description: 'Case handling with recovery voucher issuance and follow-through callbacks.',
  },
  {
    code: 'FO02',
    name: 'VIP Guest Setup',
    department: 'Front Office',
    branch: 'Alabang',
    sla: 'Same day',
    baseRate: 10000,
    description: 'VIP arrival prep, amenity placement, and priority concierge routing.',
  },
  {
    code: 'FO03',
    name: 'Room Transfer Assistance',
    department: 'Front Office',
    branch: 'Bagong Barrio',
    sla: '30 mins',
    baseRate: 1500,
    description: 'Coordinated move with luggage handling and room readiness verification.',
  },
  {
    code: 'FNB01',
    name: 'Kitchen Equipment Repair',
    department: 'F&B',
    branch: 'EDSA Cubao',
    sla: '4 hours',
    baseRate: 12000,
    description: 'Line equipment triage, parts replacement, and sanitation clearance.',
  },
  {
    code: 'FNB02',
    name: 'Banquet Setup Service',
    department: 'F&B',
    branch: 'Pasay Rotonda',
    sla: '1 day',
    baseRate: 20000,
    description: 'Full banquet staging with AV coordination and menu service sequencing.',
  },
  {
    code: 'FNB03',
    name: 'In-Room Dining Setup',
    department: 'F&B',
    branch: 'Sta. Mesa',
    sla: '2 hours',
    baseRate: 6500,
    description: 'Tray line prep, pantry stocking, and butler-style delivery pathing.',
  },
  {
    code: 'IT01',
    name: 'Network Infrastructure Setup',
    department: 'IT',
    branch: 'North EDSA',
    sla: '3-5 days',
    baseRate: 35000,
    description: 'Core switch staging, VLAN segmentation, and Wi-Fi heatmap optimization.',
  },
  {
    code: 'IT02',
    name: 'POS System Maintenance',
    department: 'IT',
    branch: 'Makati Avenue',
    sla: '4-6 hours',
    baseRate: 8000,
    description: 'POS terminal refresh, patching, and payment reconciliation tests.',
  },
  {
    code: 'IT03',
    name: 'CCTV System Upgrade',
    department: 'IT',
    branch: 'Alabang',
    sla: '1-3 days',
    baseRate: 15000,
    description: 'Camera repositioning, NVR firmware uplift, and retention validation.',
  },
  {
    code: 'SEC01',
    name: 'Access Control System Install',
    department: 'Security',
    branch: 'Fairview',
    sla: '2-3 days',
    baseRate: 18000,
    description: 'Badge provisioning, controller deployment, and door schedule tuning.',
  },
  {
    code: 'SEC02',
    name: 'Emergency Response Training',
    department: 'Security',
    branch: 'Bagong Barrio',
    sla: '1 day',
    baseRate: 5500,
    description: 'Tabletop drills, evacuation walkthroughs, and incident comms rehearsal.',
  },
  {
    code: 'SEC03',
    name: 'Fire Safety Inspection',
    department: 'Security',
    branch: 'EDSA Cubao',
    sla: '4-6 hours',
    baseRate: 12000,
    description: 'Extinguisher checks, alarm panel validation, and egress compliance scan.',
  },
]

const collectionRecords = [
  {
    id: 'COL-001',
    ticket: '#134842',
    branch: 'EDSA Cubao',
    department: 'Engineering',
    service: 'Major HVAC Repair',
    amountDue: 50000,
    amountPaid: 50000,
    balance: 0,
    status: 'Collected',
    date: '2025-01-15',
  },
  {
    id: 'COL-002',
    ticket: '#134856',
    branch: 'Pasay Rotonda',
    department: 'Engineering',
    service: 'Electrical System Upgrade',
    amountDue: 25000,
    amountPaid: 0,
    balance: 25000,
    status: 'Pending',
    date: '2025-01-18',
  },
  {
    id: 'COL-003',
    ticket: '#134821',
    branch: 'EDSA Cubao',
    department: 'Housekeeping',
    service: 'Deep Cleaning Service',
    amountDue: 5000,
    amountPaid: 5000,
    balance: 0,
    status: 'Collected',
    date: '2025-01-12',
  },
  {
    id: 'COL-004',
    ticket: '#134878',
    branch: 'Fairview',
    department: 'Housekeeping',
    service: 'Carpet & Upholstery Cleaning',
    amountDue: 8000,
    amountPaid: 5000,
    balance: 3000,
    status: 'Partial',
    date: '2025-01-20',
  },
  {
    id: 'COL-005',
    ticket: '#134798',
    branch: 'Makati Avenue',
    department: 'Front Office',
    service: 'Guest Complaint Resolution',
    amountDue: 2500,
    amountPaid: 2500,
    balance: 0,
    status: 'Collected',
    date: '2025-01-10',
  },
  {
    id: 'COL-006',
    ticket: '#134756',
    branch: 'Alabang',
    department: 'Front Office',
    service: 'VIP Guest Setup',
    amountDue: 10000,
    amountPaid: 0,
    balance: 10000,
    status: 'Overdue',
    date: '2025-01-05',
  },
  {
    id: 'COL-007',
    ticket: '#134834',
    branch: 'EDSA Cubao',
    department: 'F&B',
    service: 'Kitchen Equipment Repair',
    amountDue: 12000,
    amountPaid: 12000,
    balance: 0,
    status: 'Collected',
    date: '2025-01-14',
  },
  {
    id: 'COL-008',
    ticket: '#134892',
    branch: 'Pasay Rotonda',
    department: 'F&B',
    service: 'Banquet Setup Service',
    amountDue: 20000,
    amountPaid: 0,
    balance: 20000,
    status: 'Pending',
    date: '2025-01-22',
  },
  {
    id: 'COL-009',
    ticket: '#134845',
    branch: 'North EDSA',
    department: 'IT',
    service: 'Network Infrastructure Setup',
    amountDue: 35000,
    amountPaid: 35000,
    balance: 0,
    status: 'Collected',
    date: '2025-01-16',
  },
  {
    id: 'COL-010',
    ticket: '#134867',
    branch: 'Makati Avenue',
    department: 'IT',
    service: 'POS System Maintenance',
    amountDue: 8000,
    amountPaid: 4000,
    balance: 4000,
    status: 'Partial',
    date: '2025-01-19',
  },
  {
    id: 'COL-011',
    ticket: '#134812',
    branch: 'Fairview',
    department: 'Security',
    service: 'Access Control System Install',
    amountDue: 18000,
    amountPaid: 18000,
    balance: 0,
    status: 'Collected',
    date: '2025-01-11',
  },
  {
    id: 'COL-012',
    ticket: '#134889',
    branch: 'Bagong Barrio',
    department: 'Security',
    service: 'Emergency Response Training',
    amountDue: 5500,
    amountPaid: 0,
    balance: 5500,
    status: 'Pending',
    date: '2025-01-21',
  },
]

const departmentOptions = ['All Departments', ...new Set(servicesData.map((s) => s.department))]
const branchOptions = ['All Branches', ...new Set(servicesData.map((s) => s.branch))]
const collectionBranchOptions = ['', ...new Set(collectionRecords.map((c) => c.branch))]
const collectionDeptOptions = ['', ...new Set(collectionRecords.map((c) => c.department))]

const statusBadgeClasses = {
  Collected: 'bg-emerald-100 text-emerald-700',
  Pending: 'bg-amber-100 text-amber-700',
  Partial: 'bg-sky-100 text-sky-700',
  Overdue: 'bg-rose-100 text-rose-700',
}

const branchColorMap = {
  'EDSA Cubao': 'from-sky-500 to-blue-600',
  'Pasay Rotonda': 'from-indigo-500 to-purple-600',
  'Sta. Mesa': 'from-teal-500 to-emerald-600',
  'Bagong Barrio': 'from-amber-500 to-orange-600',
  Fairview: 'from-pink-500 to-rose-600',
  'North EDSA': 'from-cyan-500 to-blue-600',
  Alabang: 'from-lime-500 to-green-600',
  'Makati Avenue': 'from-fuchsia-500 to-purple-600',
}

const deptGradientMap = {
  Engineering: 'from-amber-400 to-orange-500',
  IT: 'from-cyan-400 to-sky-500',
  Housekeeping: 'from-emerald-400 to-green-500',
  'F&B': 'from-pink-400 to-rose-500',
  Security: 'from-rose-500 to-red-600',
  'Front Office': 'from-violet-500 to-indigo-500',
}

const deptBadgeClasses = {
  Engineering: 'bg-amber-100 text-amber-700',
  IT: 'bg-cyan-100 text-cyan-700',
  Housekeeping: 'bg-emerald-100 text-emerald-700',
  'F&B': 'bg-pink-100 text-pink-700',
  Security: 'bg-rose-100 text-rose-700',
  'Front Office': 'bg-violet-100 text-violet-700',
}

const deptIconMap = {
  Engineering: '🛠️',
  IT: '💻',
  Housekeeping: '🧹',
  'F&B': '🍽️',
  Security: '🔒',
  'Front Office': '🛎️',
}

function formatCurrency(value) {
  return `₱${value.toLocaleString('en-PH')}`
}

function formatDateLabel(value) {
  return new Date(value).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
}

function SectionE() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState('pricing')
  const [deptFilter, setDeptFilter] = useState('All Departments')
  const [branchFilter, setBranchFilter] = useState('All Branches')
  const [showPricingModal, setShowPricingModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedService, setSelectedService] = useState(null)
  const [severity, setSeverity] = useState('1.0')
  const [pricingNotes, setPricingNotes] = useState('')
  const [attachmentLabel, setAttachmentLabel] = useState('Click to upload supporting documents')
  const [collectionBranchFilter, setCollectionBranchFilter] = useState('')
  const [collectionDeptFilter, setCollectionDeptFilter] = useState('')
  const [collectionStatusFilter, setCollectionStatusFilter] = useState('')
  const [collectionDateFrom, setCollectionDateFrom] = useState('')
  const [collectionDateTo, setCollectionDateTo] = useState('')
  const [showCollectionDetail, setShowCollectionDetail] = useState(false)
  const [selectedCollection, setSelectedCollection] = useState(null)
  const fileInputRef = useRef(null)

  const filteredServices = useMemo(() => {
    return servicesData.filter((service) => {
      const byDept = deptFilter === 'All Departments' || service.department === deptFilter
      const byBranch = branchFilter === 'All Branches' || service.branch === branchFilter
      return byDept && byBranch
    })
  }, [deptFilter, branchFilter])

  const filteredCollections = useMemo(() => {
    return collectionRecords.filter((record) => {
      const byBranch = !collectionBranchFilter || record.branch === collectionBranchFilter
      const byDept = !collectionDeptFilter || record.department === collectionDeptFilter
      const byStatus = !collectionStatusFilter || record.status === collectionStatusFilter

      const recordDate = new Date(record.date)
      const from = collectionDateFrom ? new Date(collectionDateFrom) : null
      const to = collectionDateTo ? new Date(collectionDateTo) : null

      const byDateFrom = !from || recordDate >= from
      const byDateTo = !to || recordDate <= to

      return byBranch && byDept && byStatus && byDateFrom && byDateTo
    })
  }, [collectionBranchFilter, collectionDeptFilter, collectionStatusFilter, collectionDateFrom, collectionDateTo])

  const branchSummary = useMemo(() => {
    const map = new Map()
    filteredCollections.forEach((record) => {
      if (!map.has(record.branch)) {
        map.set(record.branch, { branch: record.branch, transactions: 0, collected: 0, due: 0 })
      }
      const item = map.get(record.branch)
      item.transactions += 1
      item.collected += record.amountPaid
      item.due += record.balance
    })
    return Array.from(map.values())
  }, [filteredCollections])

  const deptSummary = useMemo(() => {
    const map = new Map()
    filteredCollections.forEach((record) => {
      if (!map.has(record.department)) {
        map.set(record.department, { department: record.department, transactions: 0, collected: 0, due: 0 })
      }
      const item = map.get(record.department)
      item.transactions += 1
      item.collected += record.amountPaid
      item.due += record.balance
    })
    return Array.from(map.values())
  }, [filteredCollections])

  const collectionStats = useMemo(() => {
    const base = {
      Collected: { count: 0, amount: 0 },
      Pending: { count: 0, amount: 0 },
      Partial: { count: 0, amount: 0 },
      Overdue: { count: 0, amount: 0 },
    }
    filteredCollections.forEach((record) => {
      const bucket = base[record.status]
      if (!bucket) return
      bucket.count += 1
      if (record.status === 'Collected') bucket.amount += record.amountPaid
      if (record.status === 'Pending') bucket.amount += record.balance
      if (record.status === 'Partial') bucket.amount += record.balance
      if (record.status === 'Overdue') bucket.amount += record.balance
    })
    return base
  }, [filteredCollections])

  const branchTotals = useMemo(() => {
    const tickets = branchSummary.reduce((sum, item) => sum + item.transactions, 0)
    const collected = branchSummary.reduce((sum, item) => sum + item.collected, 0)
    return { tickets, collected }
  }, [branchSummary])

  const deptTotals = useMemo(() => {
    const tickets = deptSummary.reduce((sum, item) => sum + item.transactions, 0)
    const collected = deptSummary.reduce((sum, item) => sum + item.collected, 0)
    return { tickets, collected }
  }, [deptSummary])

  const grandTotalTickets = branchCards.reduce((sum, card) => sum + card.tickets, 0)
  const grandTotalAmount = branchCards.reduce((sum, card) => sum + card.amount, 0)

  const severityOptions = [
    { label: 'Normal (No adjustment)', value: '1.0' },
    { label: 'High (+25%)', value: '1.25' },
    { label: 'Critical (+50%)', value: '1.5' },
    { label: 'Emergency (+100%)', value: '2.0' },
    { label: 'Low Priority (-10%)', value: '0.9' },
  ]

  const pricingTotal = selectedService ? selectedService.baseRate * parseFloat(severity) : 0

  const openPricing = (service) => {
    setSelectedService(service)
    setSeverity('1.0')
    setPricingNotes('')
    setShowPricingModal(true)
  }

  const openDetail = (service) => {
    setSelectedService(service)
    setShowDetailModal(true)
  }

  const closePricing = () => setShowPricingModal(false)
  const closeDetail = () => setShowDetailModal(false)
  const closeCollectionDetail = () => {
    setShowCollectionDetail(false)
    setSelectedCollection(null)
  }

  const resetFilters = () => {
    setDeptFilter('All Departments')
    setBranchFilter('All Branches')
  }

  const resetCollectionFilters = () => {
    setCollectionBranchFilter('')
    setCollectionDeptFilter('')
    setCollectionStatusFilter('')
    setCollectionDateFrom('')
    setCollectionDateTo('')
  }

  const handleAttachmentClick = () => {
    if (fileInputRef.current) fileInputRef.current.click()
  }

  const handleAttachmentChange = (event) => {
    const file = event.target.files && event.target.files[0]
    if (!file) {
      setAttachmentLabel('Click to upload supporting documents')
      return
    }

    const sizeInMb = file.size / (1024 * 1024)
    const prettySize = sizeInMb >= 1 ? `${sizeInMb.toFixed(1)} MB` : `${Math.round(file.size / 1024)} KB`
    setAttachmentLabel(`${file.name} (${prettySize})`)
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
                      <p className="text-md font-semibold text-gray-900">🏨 {card.name}</p>
                      <div className="mt-3 flex items-center justify-between text-md text-gray-500">
                        <span>Tickets</span>
                        <span className="font-semibold text-[#1f3c8e]">{card.tickets}</span>
                      </div>
                      <div className="mt-1 flex items-center justify-between text-md text-gray-500">
                        <span>Total Amount</span>
                        <span className="font-semibold text-[#1f3c8e]">{formatCurrency(card.amount)}</span>
                      </div>
                    </div>
                  ))}

                  <div className="border border-[#5b6ef5] rounded-xl p-4 bg-gradient-to-br from-[#4f46e5] to-[#6366f1] text-white shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-md font-semibold">Grand Total</p>
                        <p className="text-sm text-white/80">Total Tickets</p>
                        <p className="text-2xl font-bold mt-1">{grandTotalTickets}</p>
                      </div>
                      <div className="text-3xl"></div>
                    </div>
                    <div className="mt-3">
                      <p className="text-sm text-white/80">Combined Total</p>
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
                            <button
                              className="px-3 py-1.5 text-xs font-semibold rounded-md border border-gray-200 text-gray-700 hover:bg-gray-100"
                              onClick={() => openDetail(service)}
                            >
                              View
                            </button>
                          </td>
                          <td className="px-4 py-4 text-center">
                            <button
                              className="px-3 py-1.5 text-xs font-semibold rounded-md bg-[#1f3c8e] text-white hover:bg-[#17306f]"
                              onClick={() => openPricing(service)}
                            >
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
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-5">
                <div className="flex flex-wrap items-center gap-3 justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-xl bg-[#0ea5e9]/15 text-[#0ea5e9] flex items-center justify-center text-xl">💳</div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Collection Summary</h3>
                      <p className="text-sm text-gray-500">Overview of collections per branch and department</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-100">UPDATED</span>
                </div>

                <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 shadow-[0_6px_18px_-12px_rgba(0,0,0,0.15)]">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-white text-blue-600 flex items-center justify-center text-lg border border-blue-100">🏨</div>
                    <div>
                      <p className="text-sm font-semibold text-blue-900">Collection by Branch</p>
                      <p className="text-xs text-blue-800/80">Summary of total collections grouped by Hotel SOGO branch location.</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {branchSummary.length === 0 && (
                    <div className="col-span-full text-center text-sm text-gray-500 border border-dashed border-slate-200 rounded-xl py-6">
                      No branch collections match your filters.
                    </div>
                  )}
                  {branchSummary.map((item) => {
                    const gradient = branchColorMap[item.branch] || 'from-slate-400 to-slate-600'
                    return (
                      <div key={item.branch} className="rounded-2xl border border-gray-200 bg-white shadow-sm px-5 py-4 flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                          <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${gradient} text-white flex items-center justify-center text-xl shadow-sm`}>🏢</div>
                          <div>
                            <p className="text-base font-semibold text-gray-900">{item.branch}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>Tickets</span>
                          <span className="text-base font-semibold text-gray-900">{item.transactions}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>Collected</span>
                          <span className="text-base font-bold text-emerald-600">{formatCurrency(item.collected)}</span>
                        </div>
                      </div>
                    )
                  })}

                  {branchSummary.length > 0 && (
                    <div className="rounded-2xl bg-[#5346e8] text-white shadow-lg px-5 py-4 flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-sm font-semibold">
                        <span>💰</span>
                        <span>Branch Total</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-white/90">
                        <span>Total Tickets</span>
                        <span className="text-base font-semibold">{branchTotals.tickets}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-white/90">
                        <span>Total Collected</span>
                        <span className="text-2xl font-black">{formatCurrency(branchTotals.collected)}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 shadow-[0_6px_18px_-12px_rgba(0,0,0,0.15)]">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-white text-blue-600 flex items-center justify-center text-lg border border-blue-100">📊</div>
                    <div>
                      <p className="text-sm font-semibold text-blue-900">Collection by Department</p>
                      <p className="text-xs text-blue-800/80">Summary of total collections grouped by department.</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {deptSummary.length === 0 && (
                    <div className="col-span-full text-center text-sm text-gray-500 border border-dashed border-slate-200 rounded-xl py-6">
                      No department collections match your filters.
                    </div>
                  )}
                  {deptSummary.map((item) => {
                    const gradient = deptGradientMap[item.department] || 'from-slate-400 to-slate-600'
                    return (
                      <div key={item.department} className="rounded-2xl border border-gray-200 bg-white shadow-sm px-5 py-4 flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                          <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${gradient} text-white flex items-center justify-center text-xl shadow-sm`}>
                            {deptIconMap[item.department] || '🏢'}
                          </div>
                          <div>
                            <p className="text-base font-semibold text-gray-900">{item.department}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>Tickets</span>
                          <span className="text-base font-semibold text-gray-900">{item.transactions}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>Collected</span>
                          <span className="text-base font-bold text-emerald-600">{formatCurrency(item.collected)}</span>
                        </div>
                      </div>
                    )
                  })}

                  {deptSummary.length > 0 && (
                    <div className="rounded-2xl bg-[#5346e8] text-white shadow-lg px-5 py-4 flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-sm font-semibold">
                        <span>💳</span>
                        <span>Dept Total</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-white/90">
                        <span>Total Tickets</span>
                        <span className="text-base font-semibold">{deptTotals.tickets}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-white/90">
                        <span>Total Collected</span>
                        <span className="text-2xl font-black">{formatCurrency(deptTotals.collected)}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">📊</span>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Collection Records</h3>
                      <p className="text-sm text-gray-500">Detailed list of all collection transactions</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 text-sm font-semibold rounded-lg bg-[#1f3c8e] text-white shadow-sm hover:bg-[#17306f]">
                    ➕ Add Collection
                  </button>
                </div>

                <div className="flex flex-wrap items-end gap-4 bg-slate-50/60 border border-slate-100 rounded-xl p-4">
                  <div className="min-w-[200px] flex-1">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Branch</label>
                    <select
                      className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      value={collectionBranchFilter}
                      onChange={(event) => setCollectionBranchFilter(event.target.value)}
                    >
                      <option value="">All Branches</option>
                      {collectionBranchOptions
                        .filter((branch) => branch)
                        .map((branch) => (
                          <option key={branch} value={branch}>
                            {branch}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="min-w-[200px] flex-1">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Department</label>
                    <select
                      className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      value={collectionDeptFilter}
                      onChange={(event) => setCollectionDeptFilter(event.target.value)}
                    >
                      <option value="">All Departments</option>
                      {collectionDeptOptions
                        .filter((dept) => dept)
                        .map((dept) => (
                          <option key={dept} value={dept}>
                            {dept}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="min-w-[160px]">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Status</label>
                    <select
                      className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      value={collectionStatusFilter}
                      onChange={(event) => setCollectionStatusFilter(event.target.value)}
                    >
                      <option value="">All Status</option>
                      {['Collected', 'Pending', 'Partial', 'Overdue'].map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="min-w-[160px]">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Date From</label>
                    <input
                      type="date"
                      className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      value={collectionDateFrom}
                      onChange={(event) => setCollectionDateFrom(event.target.value)}
                    />
                  </div>
                  <div className="min-w-[160px]">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">To</label>
                    <input
                      type="date"
                      className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      value={collectionDateTo}
                      onChange={(event) => setCollectionDateTo(event.target.value)}
                    />
                  </div>
                  <button
                    className="h-10 px-4 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50"
                    onClick={resetCollectionFilters}
                  >
                    🔄 Reset
                  </button>
                  <div className="ml-auto text-xs text-gray-500">
                    Showing <strong>{filteredCollections.length}</strong> of <strong>{collectionRecords.length}</strong> records
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-[1024px] w-full text-sm">
                    <thead className="bg-gray-50 text-gray-600 uppercase text-[11px] tracking-[0.2em]">
                      <tr>
                        <th className="text-left px-4 py-3">Collection ID</th>
                        <th className="text-left px-4 py-3">Ticket #</th>
                        <th className="text-left px-4 py-3">Branch</th>
                        <th className="text-left px-4 py-3">Department</th>
                        <th className="text-left px-4 py-3">Service</th>
                        <th className="text-left px-4 py-3">Amount Due</th>
                        <th className="text-left px-4 py-3">Amount Paid</th>
                        <th className="text-left px-4 py-3">Balance</th>
                        <th className="text-left px-4 py-3">Status</th>
                        <th className="text-left px-4 py-3">Date</th>
                        <th className="text-center px-4 py-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCollections.map((record) => (
                        <tr key={record.id} className="border-t border-gray-100 hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <span className="px-3 py-1 rounded-md bg-emerald-50 text-emerald-700 font-semibold text-xs">{record.id}</span>
                          </td>
                          <td className="px-4 py-3 font-semibold text-gray-900">{record.ticket}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            <span className="px-3 py-1 rounded-md bg-slate-100 text-slate-800 text-xs font-semibold">{record.branch}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                deptBadgeClasses[record.department] || 'bg-gray-100 text-gray-600'
                              }`}
                            >
                              {record.department}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">{record.service}</td>
                          <td className="px-4 py-3 font-semibold text-gray-900">{formatCurrency(record.amountDue)}</td>
                          <td className="px-4 py-3 font-semibold text-emerald-600">{formatCurrency(record.amountPaid)}</td>
                          <td
                            className={`px-4 py-3 font-semibold ${
                              record.balance === 0 ? 'text-gray-900' : 'text-rose-600'
                            }`}
                          >
                            {formatCurrency(record.balance)}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                statusBadgeClasses[record.status] || 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {record.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">{formatDateLabel(record.date)}</td>
                          <td className="px-4 py-3 text-center">
                            <button
                              className="px-3 py-1.5 text-xs font-semibold rounded-md border border-gray-200 text-gray-700 hover:bg-gray-100"
                              onClick={() => {
                                setSelectedCollection(record)
                                setShowCollectionDetail(true)
                              }}
                            >
                              👁 View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredCollections.length === 0 && (
                  <div className="text-center text-gray-500 text-sm py-8 border border-dashed border-gray-200 rounded-xl">
                    <div className="text-2xl mb-2">🔍</div>
                    <p>No collection records found matching your filters.</p>
                    <button
                      className="mt-3 px-4 py-2 text-sm font-semibold rounded-lg border border-gray-200 text-gray-700 bg-white hover:bg-gray-50"
                      onClick={resetCollectionFilters}
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-xl bg-[#22c55e]/15 text-[#22c55e] flex items-center justify-center text-xl">📈</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Collection Statistics</h3>
                    <p className="text-sm text-gray-500">Overall collection performance metrics</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                  <div className="rounded-2xl border border-emerald-200 bg-white shadow-sm p-5 space-y-3 relative overflow-hidden">
                    <div className="absolute inset-y-0 left-0 w-[6px] bg-emerald-500 rounded-l-2xl" />
                    <div className="flex items-center gap-2 text-emerald-700">
                      <span className="text-xl">✅</span>
                      <p className="text-base font-semibold">Total Collected</p>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-700">
                      <span>Transactions</span>
                      <span className="font-bold">{collectionStats.Collected.count}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-700">
                      <span>Amount</span>
                      <span className="text-xl font-bold text-emerald-600">{formatCurrency(collectionStats.Collected.amount)}</span>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-amber-200 bg-white shadow-sm p-5 space-y-3 relative overflow-hidden">
                    <div className="absolute inset-y-0 left-0 w-[6px] bg-amber-400 rounded-l-2xl" />
                    <div className="flex items-center gap-2 text-amber-700">
                      <span className="text-xl">⏳</span>
                      <p className="text-base font-semibold">Pending Collection</p>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-700">
                      <span>Transactions</span>
                      <span className="font-bold">{collectionStats.Pending.count}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-700">
                      <span>Amount</span>
                      <span className="text-xl font-bold text-amber-500">{formatCurrency(collectionStats.Pending.amount)}</span>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-blue-200 bg-white shadow-sm p-5 space-y-3 relative overflow-hidden">
                    <div className="absolute inset-y-0 left-0 w-[6px] bg-blue-500 rounded-l-2xl" />
                    <div className="flex items-center gap-2 text-blue-700">
                      <span className="text-xl">📊</span>
                      <p className="text-base font-semibold">Partial Payments</p>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-700">
                      <span>Transactions</span>
                      <span className="font-bold">{collectionStats.Partial.count}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-700">
                      <span>Balance Due</span>
                      <span className="text-xl font-bold text-blue-600">{formatCurrency(collectionStats.Partial.amount)}</span>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-rose-200 bg-white shadow-sm p-5 space-y-3 relative overflow-hidden">
                    <div className="absolute inset-y-0 left-0 w-[6px] bg-rose-500 rounded-l-2xl" />
                    <div className="flex items-center gap-2 text-rose-700">
                      <span className="text-xl">⚠️</span>
                      <p className="text-base font-semibold">Overdue</p>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-700">
                      <span>Transactions</span>
                      <span className="font-bold">{collectionStats.Overdue.count}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-700">
                      <span>Amount</span>
                      <span className="text-xl font-bold text-rose-600">{formatCurrency(collectionStats.Overdue.amount)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Collection Detail Modal */}
        {showCollectionDetail && selectedCollection && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden animate-[fadeIn_0.18s_ease]">
              <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-[#e0f2fe] via-white to-white border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-xl bg-[#0ea5e9]/15 text-[#0ea5e9] flex items-center justify-center text-xl">👁</div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Collection Details</p>
                    <h3 className="text-lg font-bold text-gray-900">{selectedCollection.id}</h3>
                  </div>
                </div>
                <button
                  className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                  onClick={closeCollectionDetail}
                  aria-label="Close collection details"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-5 bg-gray-50/80">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="px-3 py-1 rounded-md bg-slate-100 text-slate-800 text-xs font-semibold">Ticket: {selectedCollection.ticket}</div>
                  <div className="px-3 py-1 rounded-md bg-white border border-gray-200 text-xs font-semibold text-gray-700">Service: {selectedCollection.service}</div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      statusBadgeClasses[selectedCollection.status] || 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {selectedCollection.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 flex items-center justify-between">
                    <div className="text-xs uppercase tracking-[0.18em] text-gray-500">Branch</div>
                    <div className="text-sm font-semibold text-gray-900">{selectedCollection.branch}</div>
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 flex items-center justify-between">
                    <div className="text-xs uppercase tracking-[0.18em] text-gray-500">Department</div>
                    <div className="text-sm font-semibold text-gray-900">{selectedCollection.department}</div>
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 flex items-center justify-between">
                    <div className="text-xs uppercase tracking-[0.18em] text-gray-500">Date</div>
                    <div className="text-sm font-semibold text-gray-900">{formatDateLabel(selectedCollection.date)}</div>
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 flex items-center justify-between">
                    <div className="text-xs uppercase tracking-[0.18em] text-gray-500">ID</div>
                    <div className="text-sm font-semibold text-gray-900">{selectedCollection.id}</div>
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-5 space-y-4">
                  <div className="flex items-center gap-2 text-gray-800">
                    <span className="text-lg">💳</span>
                    <p className="text-sm font-semibold">Payment Breakdown</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="rounded-xl bg-amber-50 border border-amber-100 px-4 py-3">
                      <p className="text-xs text-amber-700 font-semibold">Amount Due</p>
                      <p className="text-xl font-bold text-amber-800 mt-1">{formatCurrency(selectedCollection.amountDue)}</p>
                    </div>
                    <div className="rounded-xl bg-emerald-50 border border-emerald-100 px-4 py-3">
                      <p className="text-xs text-emerald-700 font-semibold">Amount Paid</p>
                      <p className="text-xl font-bold text-emerald-800 mt-1">{formatCurrency(selectedCollection.amountPaid)}</p>
                    </div>
                    <div className="rounded-xl bg-rose-50 border border-rose-100 px-4 py-3">
                      <p className="text-xs text-rose-700 font-semibold">Balance</p>
                      <p
                        className={`text-xl font-bold mt-1 ${
                          selectedCollection.balance === 0 ? 'text-gray-900' : 'text-rose-600'
                        }`}
                      >
                        {formatCurrency(selectedCollection.balance)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-1">
                  <button
                    className="px-4 py-2 text-sm font-semibold rounded-xl border border-slate-200 text-slate-700 bg-white hover:bg-slate-50"
                    onClick={closeCollectionDetail}
                  >
                    Close
                  </button>
                  <button className="px-4 py-2 text-sm font-semibold rounded-xl bg-[#2563eb] text-white hover:bg-[#1d4ed8] shadow">
                    Download Receipt
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pricing Modal */}
        {showPricingModal && selectedService && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-3xl rounded-xl bg-white shadow-[0_24px_60px_-25px_rgba(0,0,0,0.55)] overflow-hidden animate-[fadeIn_0.2s_ease]">
              <div className="bg-gradient-to-r from-[#e7f1ff] via-[#eff6ff] to-white px-6 sm:px-8 py-5 flex items-start justify-between">
                <div className="flex gap-3">
                  <div className="text-4xl leading-none">💰</div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">Service Pricing</h3>
                    <p className="text-sm text-slate-600">Pricing breakdown for selected service</p>
                  </div>
                </div>
                <button
                  className="w-10 h-10 rounded-2xl bg-white/80 border border-slate-200 text-slate-600 hover:bg-white shadow-sm"
                  onClick={closePricing}
                  aria-label="Close pricing modal"
                >
                  ✕
                </button>
              </div>

              <div className="bg-[#f7f9fc] px-5 sm:px-8 py-6 space-y-5 max-h-[70vh] overflow-y-auto">
                <div className="bg-white border border-slate-100 rounded-2xl shadow-sm divide-y divide-slate-200">
                  <div className="flex items-center justify-between px-5 py-4">
                    <span className="text-[11px] uppercase tracking-[0.18em] text-slate-500">Service Code</span>
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">{selectedService.code}</span>
                  </div>
                  <div className="flex items-center justify-between px-5 py-4">
                    <span className="text-[11px] uppercase tracking-[0.18em] text-slate-500">Department</span>
                    <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-3 py-1 rounded-full">{selectedService.department}</span>
                  </div>
                  <div className="flex items-center justify-between px-5 py-4">
                    <span className="text-[11px] uppercase tracking-[0.18em] text-slate-500">Hotel Sogo Branch</span>
                    <span className="text-sm font-semibold text-slate-900">{selectedService.branch}</span>
                  </div>
                  <div className="flex items-center justify-between px-5 py-4">
                    <span className="text-[11px] uppercase tracking-[0.18em] text-slate-500">SLA</span>
                    <span className="text-xs font-semibold text-sky-700 bg-sky-50 px-3 py-1 rounded-full">{selectedService.sla}</span>
                  </div>
                  <div className="flex items-center justify-between px-5 py-4">
                    <span className="text-[11px] uppercase tracking-[0.18em] text-slate-500">Base Rate</span>
                    <span className="text-xl font-bold text-slate-900">{formatCurrency(selectedService.baseRate)}</span>
                  </div>
                  <div className="flex items-center justify-between px-5 py-4">
                    <span className="text-[11px] uppercase tracking-[0.18em] text-slate-500">Severity Adjustment</span>
                    <div className="min-w-[220px]">
                      <select
                        className="w-full text-sm font-semibold bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-inner focus:ring-2 focus:ring-[#5c63ff]/50 focus:border-[#5c63ff] outline-none"
                        value={severity}
                        onChange={(event) => setSeverity(event.target.value)}
                      >
                        {severityOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#5c63ff] via-[#5b56f5] to-[#7e6bff] text-white shadow-xl">
                  <div className="absolute inset-0 bg-white/5" />
                  <div className="relative px-6 py-7">
                    <p className="text-xs text-center uppercase tracking-[0.22em] text-white/80">Total Cost</p>
                    <p className="mt-2 text-4xl sm:text-5xl text-center font-black drop-shadow-sm">{formatCurrency(Math.round(pricingTotal))}</p>
                  </div>
                </div>

                <div className="p-0 space-y-3">
                  <div className="flex items-center gap-2 mt-2 text-sm font-semibold text-slate-800">
                    <span className="text-lg">📎</span>
                    <span>Attachments</span>
                  </div>
                  <div
                    className="group cursor-pointer rounded-2xl border-2 border-dashed border-[#9aa7ff] bg-[#f7f8ff] hover:border-[#7d8bff] transition p-6 text-center"
                    onClick={handleAttachmentClick}
                  >
                    <div className="text-3xl mb-2">📄</div>
                    <p className="text-sm font-semibold text-slate-800">{attachmentLabel}</p>
                    <p className="text-xs text-slate-500">JPG, PNG, PDF, DOC (Max 10MB total)</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                      onChange={handleAttachmentChange}
                    />
                  </div>
                </div>

              <div className="space-y-2">
                  <label className="text-sm mt-2 font-semibold text-slate-800">Additional Notes</label>
                  <textarea
                    className="w-full min-h-[110px] rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-inner focus:border-[#5c63ff] focus:ring-2 focus:ring-[#5c63ff]/40 outline-none"
                    placeholder="Enter any special requirements or notes for this service request..."
                    value={pricingNotes}
                    onChange={(event) => setPricingNotes(event.target.value)}
                  />
                </div>
              </div>

              <div className="px-5 sm:px-8 py-4 bg-white border-t border-slate-200 flex flex-wrap gap-3 justify-end">
                <button
                  className="px-4 py-2 text-sm font-semibold rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50"
                  onClick={closePricing}
                >
                  Cancel
                </button>
                <button className="px-4 py-2 text-sm font-semibold rounded-xl bg-[#2563eb] text-white hover:bg-[#1d4ed8] shadow-md">
                  Submit for Approval
                </button>
                <button className="px-4 py-2 text-sm font-semibold rounded-xl bg-[#10b981] text-white hover:bg-[#0f9d74] shadow-md">
                  Confirm Request
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Service Detail Modal */}
        {showDetailModal && selectedService && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 px-3 sm:px-4">
            <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden animate-[fadeIn_0.2s_ease]">
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-gray-200 bg-gray-50">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <button className="px-3 py-1.5 text-xs font-semibold rounded-md border border-gray-200 text-gray-700 hover:bg-white">← Back</button>
                  <button className="px-3 py-1.5 text-xs font-semibold rounded-md border border-gray-200 text-gray-700 hover:bg-white">Edit</button>
                  <button className="px-3 py-1.5 text-xs font-semibold rounded-md border border-gray-200 text-gray-700 hover:bg-white">Assign</button>
                  <button className="px-3 py-1.5 text-xs font-semibold rounded-md border border-gray-200 text-gray-700 hover:bg-white">Actions ▾</button>
                  <button className="px-3 py-1.5 text-xs font-semibold rounded-md border border-gray-200 text-gray-700 hover:bg-white">Reply ▾</button>
                  <button className="px-3 py-1.5 text-xs font-semibold rounded-md bg-[#2563eb] text-white shadow hover:bg-[#1d4ed8]">⏱ Timer</button>
                </div>
                <div className="flex items-center gap-2">
                  <button className="w-9 h-9 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50">⚙</button>
                  <button
                    className="w-9 h-9 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                    onClick={closeDetail}
                    aria-label="Close detail modal"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="flex flex-col md:flex-row max-h-[82vh]">
                <div className="flex-1 p-5 sm:p-6 space-y-5 overflow-y-auto">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">📋</div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                        #{selectedService.code} {selectedService.branch}
                      </h2>
                      <p className="text-sm text-gray-600">
                        by Service Request on Jan 29, 2026, 10:01 AM | DueBy: {selectedService.department}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-2">
                    {['Details', 'Resolution', 'Tasks', 'Checklist', 'Work Logs', 'Time Analysis', 'History'].map((tab, index) => (
                      <button
                        key={tab}
                        className={`px-3 py-2 text-sm font-semibold rounded-md ${
                          index === 0
                            ? 'text-[#1f3c8e] border-b-2 border-[#1f3c8e] bg-white'
                            : 'text-gray-600 hover:text-[#1f3c8e]'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-5">
                    <div className="border border-gray-200 rounded-xl">
                      <div className="px-4 py-3 border-b border-gray-100 text-sm font-semibold text-gray-800">Description</div>
                      <div className="px-4 py-4 space-y-3 text-sm text-gray-700">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div><span className="font-semibold">Service: </span>{selectedService.name}</div>
                          <div><span className="font-semibold">Service Code: </span>{selectedService.code}</div>
                          <div><span className="font-semibold">Base Rate: </span>{formatCurrency(selectedService.baseRate)}</div>
                          <div><span className="font-semibold">SLA: </span>{selectedService.sla}</div>
                        </div>
                        <p className="leading-relaxed">{selectedService.description}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="text-base">📎</span>
                          <span className="text-[#1f3c8e] font-semibold">Browse Files</span>
                          <span className="text-gray-400">or Drag files here [ Max size: 50 MB. ]</span>
                        </div>
                        <div className="flex gap-3">
                          <button className="px-4 py-2 rounded-md border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50">Reply</button>
                          <button className="px-4 py-2 rounded-md border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50">Forward</button>
                        </div>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-xl">
                      <div className="px-4 py-3 border-b border-gray-100 text-sm font-semibold text-gray-800 flex items-center justify-between">
                        <span>Conversations</span>
                        <button className="text-sm font-semibold text-[#1f3c8e]">Add Notes</button>
                      </div>
                      <div className="px-4 py-4 space-y-3">
                        <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                          <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> E-mail</label>
                          <label className="flex items-center gap-2"><input type="checkbox" /> System Notifications</label>
                          <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Notes</label>
                        </div>
                        <div className="text-gray-500 text-sm">No Conversations</div>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-xl">
                      <div className="px-4 py-3 border-b border-gray-100 text-sm font-semibold text-gray-800 flex items-center justify-between">
                        <span>Properties</span>
                        <button className="text-sm font-semibold text-[#1f3c8e]">✏ Edit</button>
                      </div>
                      <div className="px-4 py-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                        <div className="flex items-center justify-between border border-gray-100 rounded-lg px-3 py-2">
                          <span className="text-gray-500">Request Type</span>
                          <span className="font-semibold">Service</span>
                        </div>
                        <div className="flex items-center justify-between border border-gray-100 rounded-lg px-3 py-2">
                          <span className="text-gray-500">Impact</span>
                          <span className="font-semibold">2. Significant</span>
                        </div>
                        <div className="flex items-center justify-between border border-gray-100 rounded-lg px-3 py-2">
                          <span className="text-gray-500">Status</span>
                          <span className="font-semibold text-[#2563eb]">Open</span>
                        </div>
                        <div className="flex items-center justify-between border border-gray-100 rounded-lg px-3 py-2">
                          <span className="text-gray-500">Impact Details</span>
                          <span className="font-semibold">-</span>
                        </div>
                        <div className="flex items-center justify-between border border-gray-100 rounded-lg px-3 py-2">
                          <span className="text-gray-500">Mode</span>
                          <span className="font-semibold">Web Form</span>
                        </div>
                        <div className="flex items-center justify-between border border-gray-100 rounded-lg px-3 py-2">
                          <span className="text-gray-500">Urgency</span>
                          <span className="font-semibold text-amber-600">4. Low</span>
                        </div>
                        <div className="flex items-center justify-between border border-gray-100 rounded-lg px-3 py-2">
                          <span className="text-gray-500">Level</span>
                          <span className="font-semibold">Not Assigned</span>
                        </div>
                        <div className="flex items-center justify-between border border-gray-100 rounded-lg px-3 py-2">
                          <span className="text-gray-500">Priority</span>
                          <span className="font-semibold">P4</span>
                        </div>
                        <div className="flex items-center justify-between border border-gray-100 rounded-lg px-3 py-2">
                          <span className="text-gray-500">Group</span>
                          <span className="font-semibold">{selectedService.department}</span>
                        </div>
                        <div className="flex items-center justify-between border border-gray-100 rounded-lg px-3 py-2">
                          <span className="text-gray-500">Category</span>
                          <span className="font-semibold">{selectedService.branch}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-[340px] border-t md:border-t-0 md:border-l border-gray-200 p-5 sm:p-6 space-y-5 bg-gray-50 overflow-y-auto max-h-[82vh]">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-700">Status</span>
                      <span className="px-3 py-1 rounded-md bg-blue-50 text-[#1f3c8e] text-xs font-bold">OPEN</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-700">
                      <span className="text-gray-500">Priority</span>
                      <span>: Open</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-700">
                      <span className="text-gray-500">Response DueBy Time</span>
                      <span>: Feb 5, 2026, 10:01 AM</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-700">
                      <span className="text-gray-500">Technician</span>
                      <span>: John Doe</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-700">
                      <span className="text-gray-500">Group</span>
                      <span>: {selectedService.department}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-700">
                      <span className="text-gray-500">Site</span>
                      <span>: {selectedService.branch}</span>
                    </div>
                    <button className="text-sm font-semibold text-[#1f3c8e]">More Properties</button>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-700">Share</p>
                    <button className="text-sm font-semibold text-[#1f3c8e] flex items-center gap-2">
                      <span>👥</span> Share Request
                    </button>
                  </div>

                  <div className="space-y-2">
                    <button className="text-sm font-semibold text-[#1f3c8e] block">+ Associate Problem</button>
                    <div>
                      <button className="text-sm font-semibold text-[#1f3c8e] block">+ Associate Change</button>
                      <p className="text-xs text-gray-500">Change initiated due to this Request</p>
                      <p className="text-xs text-gray-500">Request caused by Change</p>
                    </div>
                    <button className="text-sm font-semibold text-[#1f3c8e] block">+ Associate Project</button>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-700">Tags</p>
                    <div className="text-sm text-gray-400">No tags added</div>
                  </div>

                  <div className="border border-gray-200 rounded-xl bg-white p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-[#1f3c8e] text-white flex items-center justify-center text-xl font-bold">
                        {selectedService.branch.slice(0, 1)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{selectedService.branch} Request</p>
                        <p className="text-xs text-gray-500">{selectedService.branch.toLowerCase().replace(/ /g, '')}@hotelsogo.com</p>
                      </div>
                    </div>
                    <div className="flex gap-3 text-sm text-[#1f3c8e]">
                      <span className="font-semibold">Requests (21)</span>
                      <span className="text-gray-400">Assets</span>
                    </div>
                    <div className="space-y-1 text-sm text-gray-700">
                      <div className="flex items-center justify-between"><span>Employee ID</span><span>-</span></div>
                      <div className="flex items-center justify-between"><span>Department Name</span><span>-</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SectionE
