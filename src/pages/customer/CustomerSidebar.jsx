import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MdDashboard } from "react-icons/md"
import { RiStore2Fill } from "react-icons/ri"
import { FaBoxOpen, FaHome, FaUser } from "react-icons/fa"

function CustomerSidebar() {
  const location = useLocation()

  const menuItems = [
    { name: "Dashboard", path: "/customer-dashboard", icon: <MdDashboard /> },
    { name: "My Orders", path: "/my-orders", icon: <FaBoxOpen /> },
    { name: "Shops", path: "/shps", icon: <RiStore2Fill /> },
    { name: "Profile", path: "/customer-profile", icon: <FaUser /> },
    { name: "Home", path: "/", icon: <FaHome /> }
  ]

  return (
    <>

      <aside className="hidden lg:flex fixed left-0 top-0 w-[260px] h-screen bg-[#101010] text-white px-5 py-6 flex-col border-r border-white/10 z-50">
        <div className="mb-8 px-2">
          <h1 className="text-2xl font-bold">LaundryNear</h1>
          <p className="uppercase tracking-[4px] text-[11px] text-white/35 mt-2">
            Customer Panel
          </p>
        </div>

        <nav className="flex flex-col gap-1.5">
          {menuItems.map((item) => {
            const active = location.pathname === item.path

            return (
              <Link key={item.name} to={item.path} className={`group flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium duration-300 ${active ? "bg-white text-black" : "text-white/55 hover:bg-white/10 hover:text-white"}`}>
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </aside>


      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#101010] border-t border-white/10 z-50">
        <div className="flex justify-around items-center py-3">
          {menuItems.map((item) => {
            const active = location.pathname === item.path

            return (
              <Link key={item.name} to={item.path} className={`flex flex-col items-center text-xs ${active ? "text-white" : "text-white/50"}`}>
                <span className="text-xl">{item.icon}</span>
                <span className="mt-1">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default CustomerSidebar