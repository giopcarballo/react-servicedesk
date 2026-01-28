function SidebarToggle({ collapsed, onToggle }) {
  return (
    <button 
      className={`fixed top-1/2 -translate-y-1/2 w-[30px] h-[60px] bg-gray-800 border-none rounded-r-lg text-white cursor-pointer flex items-center justify-center z-[901] transition-all duration-300 text-lg hover:bg-gray-700`}
      style={{ left: collapsed ? '0' : '250px' }}
      onClick={onToggle}
    >
      {collapsed ? '▶' : '◀'}
    </button>
  )
}

export default SidebarToggle
