import React, { useContext, useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { IoMenu, IoClose } from "react-icons/io5"
import { routeGuardContext } from "../../context/AuthContext"
import { searchKeyContext } from "../../context/ContextShare"
import SERVER_URL from "../../services/serverURL"
import { useDebouncedSearch } from "../../hooks/useDebouncedSearch"

function Header() {
  const [open, setOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)

  const navigate = useNavigate()
  const { setRole, setAuthorisedUser } = useContext(routeGuardContext)
  const { searchKey, setSearchKey } = useContext(searchKeyContext)

  const debouncedSearch = useDebouncedSearch(searchKey, 300)

  const existingUser = JSON.parse(sessionStorage.getItem("existingUser"))

  const profileImage = existingUser?.profile
    ? `${SERVER_URL}/uploads/${existingUser.profile}`
    : "https://cdn-icons-png.flaticon.com/512/149/149071.png"

  const suggestions = useMemo(() => {
    if (!debouncedSearch) return []
    return []
  }, [debouncedSearch])

  const highlightText = (text, query) => {
    if (!query) return text
    const parts = text.split(new RegExp(`(${query})`, "gi"))
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={i} className="bg-yellow-200 font-semibold">{part}</span>
      ) : part
    )
  }

  const goToShop = (shopName) => {
    setSearchKey(shopName)
    setShowSuggestions(false)
    navigate("/shps")
  }

  const handleLogout = () => {
    sessionStorage.clear()
    setRole("")
    setAuthorisedUser(false)
    setSearchKey("")
    navigate("/")
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#F8F7F4]/90 backdrop-blur-xl border-b border-black/5">
      <div className="h-20 px-5 md:px-12 flex items-center justify-between">

        <nav className="hidden lg:flex items-center gap-8 text-xs font-medium uppercase">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/shps">Shops</Link>
        </nav>

        <Link to="/" className="font-serif text-3xl md:text-4xl tracking-[-2px]">
          LaundryNear
        </Link>

        <div className="hidden lg:flex relative">
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-12 w-full bg-white border rounded-xl shadow-lg">
              {suggestions.map((shop) => (
                <div key={shop.id}  onMouseDown={() => goToShop(shop.name)}  className="px-4 py-3 hover:bg-[#F5F1EB] cursor-pointer text-sm" >
                  {highlightText(shop.name, searchKey)}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          {existingUser ? (
            <div className="relative">
              <img src={profileImage} onClick={() => setProfileOpen(!profileOpen)} className="w-10 h-10 rounded-full border cursor-pointer"/>

              {profileOpen && (
                <div className="absolute right-0 top-12 w-52 bg-white border rounded-xl shadow-lg">
                  <button onClick={() => navigate("/customer-dashboard")} className="w-full text-left px-4 py-3 hover:bg-[#F5F1EB]">
                    Dashboard
                  </button>
                  <button onClick={() => navigate("/customer-profile")} className="w-full text-left px-4 py-3 hover:bg-[#F5F1EB]">
                    Profile
                  </button>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-red-500">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/auth" className="px-5 py-2 border rounded-full">
              Login
            </Link>
          )}
        </div>

        
        <div className="lg:hidden">
          {existingUser ? (
            <button onClick={() => setOpen(!open)}>
              {open ? <IoClose size={25} /> : <IoMenu size={25} />}
            </button>
          ) : (
            <Link to="/auth" className="px-4 py-1 border rounded-full text-sm">
              Login
            </Link>
          )}
        </div>

      </div>

      
      {open && existingUser && (
        <div className="lg:hidden bg-white border-t">
          <button onClick={() => navigate("/customer-dashboard")} className="w-full text-left px-6 py-4 border-b">
            Dashboard
          </button>
          <button onClick={() => navigate("/customer-profile")} className="w-full text-left px-6 py-4 border-b">
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

export default Header