import React, { useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar'
import { getAllShopsAPI } from '../../services/allAPI'
import { FaStore } from "react-icons/fa"
import { toast } from 'react-toastify'

function AdminShops() {

  const [shops, setShops] = useState([])
  const [loading, setLoading] = useState(false)

  // ---------------- GET SHOPS ----------------
  const getAllShops = async () => {

    try {
      setLoading(true)

      const token = sessionStorage.getItem("token")

      if (!token) {
        toast.error("Unauthorized access")
        return
      }

      const reqHeader = {
        Authorization: `Bearer ${token}`
      }

      const result = await getAllShopsAPI(reqHeader)

      if (result.status === 200) {
        setShops(result.data || [])
      } else {
        toast.error("Failed to fetch shops")
      }

    } catch (err) {
      console.log(err)
      toast.error("Server error while fetching shops")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllShops()
  }, [])

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen bg-[#F5F1EB]">

      <AdminSidebar />

      <main className="lg:ml-[260px] px-8 py-8">

        {/* HEADER */}
        <div className="mb-8 bg-white border border-[#E6DDD2] rounded-3xl p-7">

          <p className="uppercase tracking-[5px] text-xs text-[#7B614D] mb-3">
            Admin Panel
          </p>

          <h1 className="text-4xl font-bold text-[#1A1A1A]">
            Manage Shops
          </h1>

          <p className="text-[#6B4F3B] mt-3">
            View all registered laundry shops on the platform.
          </p>

        </div>

        {/* TABLE */}
        <div className="bg-white border border-[#E3D7C8] rounded-3xl overflow-hidden">

          {/* TITLE */}
          <div className="px-6 py-5 border-b border-[#E3D7C8] flex items-center gap-3">
            <FaStore className="text-[#3F2F24]" />
            <h2 className="text-2xl font-bold text-[#1A1A1A]">
              All Shops
            </h2>
          </div>

          {/* LOADING */}
          {loading ? (
            <div className="p-10 text-center text-[#6B4F3B]">
              Loading shops...
            </div>
          ) : shops.length === 0 ? (
            <div className="p-10 text-center text-[#6B4F3B]">
              No shops found
            </div>
          ) : (

            <div className="overflow-x-auto">

              <table className="w-full text-left">

                <thead className="bg-[#FAF7F2]">
                  <tr>
                    <th className="px-6 py-4">Shop Name</th>
                    <th className="px-6 py-4">Owner</th>
                    <th className="px-6 py-4">Phone</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Services</th>
                  </tr>
                </thead>

                <tbody>

                  {shops.map((item) => (
                    <tr
                      key={item._id}
                      className="border-t border-[#EFE6DA] hover:bg-[#FAF7F2]"
                    >

                      <td className="px-6 py-4 font-semibold">
                        {item.shopName}
                      </td>

                      <td className="px-6 py-4">
                        {item.ownerName}
                      </td>

                      <td className="px-6 py-4">
                        {item.phone}
                      </td>

                      <td className="px-6 py-4">
                        {item.location}
                      </td>

                      <td className="px-6 py-4">
                        {Array.isArray(item.services)
                          ? item.services.join(", ")
                          : item.services}
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </main>

    </div>
  )
}

export default AdminShops