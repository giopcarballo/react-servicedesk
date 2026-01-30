function SidebarToggle({ collapsed, onToggle }) {
  return (
    <button 
      className={`fixed top-4 w-5 h-5 bg-white rounded-full text-[#0f1d3d] cursor-pointer flex items-center justify-center z-[901] transition-all duration-300 text-xs font-bold shadow-md hover:scale-110`}
      style={{ left: collapsed ? '50px' : '240px' }}
      onClick={onToggle}
    >
      {collapsed ? '›' : '‹'}
    </button>
  )
}

export default SidebarToggle
