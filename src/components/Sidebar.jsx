import { useNavigate, useLocation } from 'react-router-dom'
import logo from '../assets/GCG.png'

function Sidebar({ collapsed, onNavigate }) {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  const handleNavigate = (module, path) => {
    if (onNavigate) {
      onNavigate(module)
    } else {
      navigate(path)
    }
  }

  return (
    <div 
      className={`sidebar fixed left-0 top-0 h-screen w-[250px] bg-gray-800 pt-5 z-[900] transition-transform duration-300 overflow-y-auto ${collapsed ? '-translate-x-full' : ''}`}
    >
      <nav>
        <div className="px-4 py-3 flex items-center justify-center mx-3 mb-2">
          <img src={logo} alt="Logo" className="max-w-[170px] h-auto rounded-lg" />
        </div>
        
        <div 
          className={`flex items-center gap-3 px-5 py-3.5 text-sm font-medium cursor-pointer border-l-[3px] transition-all ${
            isActive('/dashboard') 
              ? 'text-white border-l-blue-500 bg-white/[0.12]' 
              : 'text-gray-300 border-transparent hover:bg-white/10 hover:text-white hover:border-l-blue-500'
          }`}
          onClick={() => handleNavigate('dashboard', '/dashboard')}
        >
          <span className="text-lg w-6 text-center">📈</span>
          <span>Dashboard</span>
        </div>

        <div 
          className={`flex items-center gap-3 px-5 py-3.5 text-sm font-medium cursor-pointer border-l-[3px] transition-all ${
            isActive('/servicedesk') 
              ? 'text-white border-l-blue-500 bg-white/[0.12]' 
              : 'text-gray-300 border-transparent hover:bg-white/10 hover:text-white hover:border-l-blue-500'
          }`}
          onClick={() => handleNavigate('myview', '/servicedesk')}
        >
          <span className="text-lg w-6 text-center">📊</span>
          <span>My View</span>
        </div>

        <div className="h-px bg-white/[0.12] mx-4 my-2"></div>

        <div 
          className={`flex items-center gap-3 px-5 py-3.5 text-sm font-medium cursor-pointer border-l-[3px] transition-all ${
            isActive('/requests') 
              ? 'text-white border-l-blue-500 bg-white/[0.12]' 
              : 'text-gray-300 border-transparent hover:bg-white/10 hover:text-white hover:border-l-blue-500'
          }`}
          onClick={() => handleNavigate('requests', '/requests')}
        >
          <span className="text-lg w-6 text-center">📋</span>
          <span>Requests</span>
          <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">5</span>
        </div>

        <div className="h-px bg-white/[0.12] mx-4 my-2"></div>

        <div 
          className={`flex items-center gap-3 px-5 py-3.5 text-sm font-medium cursor-pointer border-l-[3px] transition-all ${
            isActive('/ticket-intake') 
              ? 'text-white border-l-blue-500 bg-white/[0.12]' 
              : 'text-gray-300 border-transparent hover:bg-white/10 hover:text-white hover:border-l-blue-500'
          }`}
          onClick={() => handleNavigate('intake', '/ticket-intake')}
        >
          <span className="text-lg w-6 text-center">🛠️</span>
          <span>Service Configuration</span>
        </div>

        <div 
          className={`flex items-center gap-3 px-5 py-3.5 text-sm font-medium cursor-pointer border-l-[3px] transition-all ${
            isActive('/section-e') 
              ? 'text-white border-l-blue-500 bg-white/[0.12]' 
              : 'text-gray-300 border-transparent hover:bg-white/10 hover:text-white hover:border-l-blue-500'
          }`}
          onClick={() => handleNavigate('financial', '/section-e')}
        >
          <span className="text-lg w-6 text-center">💳</span>
          <span>Financials</span>
        </div>

        <div className="h-px bg-white/[0.12] mx-4 my-2"></div>

        <div 
          className={`flex items-center gap-3 px-5 py-3.5 text-sm font-medium cursor-pointer border-l-[3px] transition-all ${
            isActive('/admin') 
              ? 'text-white border-l-blue-500 bg-white/[0.12]' 
              : 'text-gray-300 border-transparent hover:bg-white/10 hover:text-white hover:border-l-blue-500'
          }`}
          onClick={() => handleNavigate('admin', '/admin')}
        >
          <span className="text-lg w-6 text-center">⚙️</span>
          <span>Admin</span>
        </div>
      </nav>
    </div>
  )
}

export default Sidebar
