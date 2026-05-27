import { useState } from 'react';
import { Link,  useNavigate } from 'react-router-dom';
const Sidebar = () => {
const navigate = useNavigate()
const [selectedMenu, setSelectedMenue] = useState();
  const menuItems = [
    'Dashboard',
    'Entries',
    'Settings',
  ]

  return ( 
    <aside className="sticky top-0 h-screen w-60 overflow-y-auto bg-[#1e1b3a] text-gray-200 flex flex-col justify-between px-4 py-5 border-r border-white/5">

  {/* HEADER */}
  <div>
    <div className="flex items-center gap-2 mb-10">
      <div className="w-8 h-8 rounded-md bg-white/10 flex items-center justify-center text-sm font-medium">
        M
      </div>

      <div className="leading-tight">
        <h1 className="text-sm font-semibold tracking-wide">My Diary</h1>
        <p className="text-[11px] text-gray-400">Dashboard</p>
      </div>
    </div>

    {/* NAV */}
    <nav className="space-y-1">
      {menuItems.map((item, index) => (
        <button
          key={item}
          className={`w-full text-left px-3 py-2 text-[12px] rounded-md transition-colors
            ${
              item === selectedMenu
                ? "bg-white/10 text-white"
                : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
            }`}
            onClick={()=>{ navigate(`/${item}`)
                          setSelectedMenue(item)}}
        >
          {item}
        </button>
      ))}
    </nav>
  </div>

  {/* FOOTER CARD */}
  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
    <p className="text-xs font-medium text-white mb-1">
      Keep going
    </p>

    <p className="text-[11px] text-gray-400 mb-3 leading-snug">
      Your thoughts matter more than you think.
    </p>

    <button className="w-full bg-white text-[#1e1b3a] text-[12px] py-1.5 rounded-md font-medium hover:bg-gray-200 transition">
          <Link to="/entries/create">+ New Entry</Link>
    </button>
  </div>

</aside>
  )
}

export default Sidebar;