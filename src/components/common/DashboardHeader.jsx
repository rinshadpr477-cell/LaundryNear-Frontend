import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { IoMenu, IoClose } from 'react-icons/io5'
import { routeGuardContext } from '../../context/AuthContext'
import { searchKeyContext } from '../../context/ContextShare'
import SERVER_URL from '../../services/serverURL'

function DashboardHeader({ title, showSearch = false }) {
  const navigate = useNavigate()
  const { setRole, setAuthorisedUser } = useContext(routeGuardContext)
  const { searchKey, setSearchKey } = useContext(searchKeyContext)

  const [open, setOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const existingUser =
    JSON.parse(sessionStorage.getItem("existingUser")) || {}

  const profileImage = existingUser?.profile
    ? `${SERVER_URL}/uploads/${existingUser.profile}`
    : "https://cdn-icons-png.flaticon.com/512/149/149071.png"

  const handleProfile = () => {
    setProfileOpen(false)
    if (existingUser?.role === "admin") navigate('/admin-profile')
    else if (existingUser?.role === "shop") navigate('/shop-profile')
    else if (existingUser?.role === "delivery") navigate('/delivery-profile')
    else navigate('/customer-profile')
  }

  const handleLogout = () => {
    sessionStorage.clear()
    setSearchKey("")
    setRole("")
    setAuthorisedUser(false)
    navigate("/")
  }

  return (
    <header className="sticky top-0 z-50 bg-[#F8F7F4]/90 backdrop-blur-xl border-b border-black/5">
      <div className="h-24 px-8 md:px-12 flex items-center justify-between">

        <div>
          <h1 className="font-serif text-5xl tracking-[-2px] text-[#1A1A1A]">
            LaundryNear
          </h1>
          <p className="text-[10px] uppercase tracking-[5px] text-[#7B614D] mt-1">
            {title}
          </p>
        </div>

        {showSearch && (
          <div className="flex items-center">
            <input type="text" placeholder="Search shops..." value={searchKey} onChange={(e) => setSearchKey(e.target.value)} className="w-[450px] px-5 py-3 rounded-2xl border border-[#E3D7C8] bg-white outline-none focus:border-[#7B614D]" />
          </div>
        )}

        <div className="hidden lg:flex items-center gap-5">
         

          <div className="relative">
            <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-3">
              <div className="text-right">
                <h4 className="text-sm font-semibold text-[#1A1A1A]">
                  {existingUser?.username}
                </h4>
                <p className="text-xs text-[#7B614D] capitalize">
                  {existingUser?.role}
                </p>
              </div>

              <img src={profileImage}  alt="" className="w-11 h-11 rounded-full object-cover border border-[#CBB89B]" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-14 w-56 bg-white rounded-3xl border border-[#E3D7C8] shadow-xl overflow-hidden">
                <div className="px-5 py-4 border-b">
                  <h3 className="font-semibold">{existingUser?.username}</h3>
                  <p className="text-xs text-gray-500">{existingUser?.email}</p>
                </div>

                <button  onClick={handleProfile} className="w-full text-left px-5 py-3 hover:bg-[#F5F1EB]"  >
                  Profile
                </button>

                <button onClick={handleLogout} className="w-full text-left px-5 py-3 text-red-500 hover:bg-[#F5F1EB]"   >  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        <button onClick={() => setOpen(!open)} className="lg:hidden">
          {open ? <IoClose size={26} /> : <IoMenu size={26} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t">
          <button onClick={handleProfile} className="w-full text-left px-6 py-4 border-b">
            Profile
          </button>
          <button onClick={handleLogout} className="w-full text-left px-6 py-4 text-red-500">
            Logout
          </button>
        </div>
      )}
    </header>
  )
}

export default DashboardHeader