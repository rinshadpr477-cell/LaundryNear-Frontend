import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MdDashboard, MdDryCleaning } from "react-icons/md"
import { FaBoxOpen, FaHome } from "react-icons/fa"
import { FaStore, FaTruckFast } from "react-icons/fa6"
import { IoSettingsSharp } from "react-icons/io5"

function ShopSidebar() {
  const location = useLocation()
  const menuItems = [
    { name: "Dashboard", path: "/shop-dashboard", icon: <MdDashboard /> },
    { name: "Orders", path: "/shop-orders", icon: <FaBoxOpen /> },
    { name: "Shop Profile", path: "/shop-profile", icon: <FaStore /> },
    { name: "Home", path: "/", icon: <FaHome /> },

  ]

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 w-[260px] h-screen bg-[#101010] text-white px-5 py-6 flex-col border-r border-white/10 z-50">
      <div className="mb-8 px-2">
        <h1 className="text-2xl font-bold tracking-tight">LaundryNear</h1>
        <p className="uppercase tracking-[4px] text-[11px] text-white/35 mt-2">Shop Panel</p>
      </div>
      <nav className="flex flex-col gap-1.5">
        {menuItems.map(item => {
          const active = location.pathname === item.path
          return (
            <Link key={item.name} to={item.path} className={`group flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium duration-300 ${active ? "bg-white text-[#111111]" : "text-white/55 hover:bg-white/10 hover:text-white"}`}>
              <span className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg ${active ? "bg-[#F5F1EB] text-[#111111]" : "bg-white/5 text-white/55 group-hover:bg-white/10 group-hover:text-white"}`}>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>
      <div className="mt-auto bg-white/5 border border-white/10 rounded-2xl p-4">
        <p className="text-xs uppercase tracking-[3px] text-white/30 mb-2">Shop</p>
        <p className="text-sm text-white/65 leading-6">Manage orders and services</p>
      </div>
    </aside>
  )
}

export default ShopSidebar