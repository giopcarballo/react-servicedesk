function Header({ collapsed }) {
  return (
    <div className={`bg-gradient-to-r from-blue-600 to-blue-800 text-white transition-all duration-300 ${collapsed ? '' : 'with-sidebar'}`}>
      <div className="max-w-[1600px] mx-auto px-6 py-4">
        <div className="flex justify-between items-center mb-5">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <span>🖥️</span> ServiceDesk
            </h1>
            <div className="text-blue-200 text-sm mt-1">IT Service Management Platform</div>
          </div>
          <div className="flex items-center gap-3 bg-white/10 rounded-lg px-4 py-2 cursor-pointer">
            <div className="relative w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
              AD
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-[10px] font-bold flex items-center justify-center">3</span>
            </div>
            <div>
              <div className="font-semibold text-sm">Admin User</div>
              <div className="text-xs text-blue-200 flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                System Administrator
              </div>
            </div>
            <span className="text-xs ml-2">▼</span>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white/10 rounded-lg p-4 flex items-center gap-3">
            <div className="text-2xl">📋</div>
            <div>
              <div className="text-xs text-blue-200 mb-1">Active Requests</div>
              <div className="text-2xl font-bold">0</div>
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 flex items-center gap-3">
            <div className="text-2xl">⚠️</div>
            <div>
              <div className="text-xs text-blue-200 mb-1">Open Problems</div>
              <div className="text-2xl font-bold">0</div>
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 flex items-center gap-3">
            <div className="text-2xl">🔄</div>
            <div>
              <div className="text-xs text-blue-200 mb-1">Pending Changes</div>
              <div className="text-2xl font-bold">0</div>
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 flex items-center gap-3">
            <div className="text-2xl">✅</div>
            <div>
              <div className="text-xs text-blue-200 mb-1">Tasks Due Today</div>
              <div className="text-2xl font-bold">0</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
