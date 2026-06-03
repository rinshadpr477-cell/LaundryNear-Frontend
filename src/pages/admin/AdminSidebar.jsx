import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MdDashboard } from "react-icons/md"
import { RiStore2Fill } from "react-icons/ri"
import { FaUsers, FaBoxOpen, FaUser, FaHome } from "react-icons/fa"
import { IoSettingsSharp } from "react-icons/io5"

function AdminSidebar() {
  const location = useLocation()
  const menuItems = [
    { name: "Dashboard", path: "/admin-dashboard", icon: <MdDashboard /> },
    { name: "Manage Shops", path: "/admin-shops", icon: <RiStore2Fill /> },
    { name: "Users", path: "/admin-users", icon: <FaUsers /> },
    { name: "Orders", path: "/admin-orders", icon: <FaBoxOpen /> },
    { name: "Profile", path: "/admin-profile", icon: <FaUser /> },
    { name: "Home", path: "/", icon: <FaHome /> },

  ]

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 w-[260px] h-screen bg-[#101010] text-white px-5 py-6 flex-col border-r border-white/10 z-50">
      <div className="mb-8 px-2">
        <h1 className="text-2xl font-bold tracking-tight">LaundryNear</h1>
        <p className="uppercase tracking-[4px] text-[11px] text-white/35 mt-2">Admin Panel</p>
      </div>
      <nav className="flex flex-col gap-1.5">
        {menuItems.map((item) => {
          const active = location.pathname === item.path
          return (
            <Link key={item.name} to={item.path} className={`group flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium duration-300 ${active ? "bg-white text-[#111111] shadow-sm" : "text-white/55 hover:bg-white/10 hover:text-white"}`}>
              <span className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg duration-300 ${active ? "bg-[#F5F1EB] text-[#111111]" : "bg-white/5 text-white/55 group-hover:bg-white/10 group-hover:text-white"}`}>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>
      <div className="mt-auto bg-white/5 border border-white/10 rounded-2xl p-4">
        <p className="text-xs uppercase tracking-[3px] text-white/30 mb-2">System</p>
        <p className="text-sm text-white/65 leading-6">Laundry management dashboard</p>
      </div>
    </aside>
  )
}

export default AdminSidebar