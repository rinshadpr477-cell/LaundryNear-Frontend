import React, { useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar'
import { getAllAdminShopsAPI, approveShopAPI } from '../../services/allAPI'
import { FaStore } from "react-icons/fa"
import { toast } from 'react-toastify'

function AdminShops() {

  const [shops, setShops] = useState([])
  const [loading, setLoading] = useState(false)


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
      const result = await getAllAdminShopsAPI(reqHeader)
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

  const handleApprove = async (id) => {
    try {
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        Authorization: `Bearer ${token}`
      }
      const result = await approveShopAPI(id, reqHeader)
      if (result.status === 200) {
        toast.success("Shop Approved")
        getAllShops()
      }
    } catch (err) {
      console.log(err)
      toast.error("Failed to approve shop")
    }
  }


  return (
    <div className="min-h-screen bg-[#F5F1EB]">

      <AdminSidebar />

      <main className="lg:ml-[260px] px-8 py-8">


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


        <div className="bg-white border border-[#E3D7C8] rounded-3xl overflow-hidden">
          <div className="px-6 py-5 border-b border-[#E3D7C8] flex items-center gap-3">
            <FaStore className="text-[#3F2F24]" />
            <h2 className="text-2xl font-bold text-[#1A1A1A]">
              All Shops
            </h2>
          </div>


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
                    <th className="px-6 py-4">Area</th>
                    <th className="px-6 py-4">Services</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Action</th>
                  </tr>
                </thead>

                <tbody>

                  {shops.map((item) => (
                    <tr
                      key={item._id}
                      className="border-t border-[#EFE6DA] hover:bg-[#FAF7F2]"  >

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
                        {item.area}
                      </td>

                      <td className="px-6 py-4">
                        {Array.isArray(item.services)
                          ? item.services.join(", ")
                          : item.services}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${item.status === "approved"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                            }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        {
                          item.status === "pending" ? (
                            <button
                              onClick={() => handleApprove(item._id)}
                              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                            >
                              Approve
                            </button>
                          ) : (
                            <span className="text-green-600 font-semibold">
                              Approved
                            </span>
                          )
                        }
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