function SidebarToggle({ collapsed, onToggle }) {
  return (
    <button 
      className={`fixed top-4 w-8 h-8 bg-[#0f1d3d] rounded-full text-white cursor-pointer flex items-center justify-center z-[901] transition-all duration-300 text-xl font-bold shadow-lg border border-white/20 hover:bg-[#1a2d52]`}
      style={{ left: collapsed ? '44px' : '234px' }}
      onClick={onToggle}
    >
      {collapsed ? '›' : '‹'}
    </button>
  )
}

export default SidebarToggle
