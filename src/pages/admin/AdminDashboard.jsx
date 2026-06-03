import React, { useEffect, useState } from 'react'
import { adminDashboardCountAPI, adminAllOrdersAPI } from '../../services/allAPI'
import { FaBoxOpen, FaStore, FaUsers, FaRupeeSign } from "react-icons/fa"
import AdminSidebar from './AdminSidebar'
import DashboardHeader from '../../components/common/DashboardHeader'

function AdminDashboard() {

  const [dashboardData, setDashboardData] = useState({ totalUsers: 0,totalShops: 0, totalOrders: 0, deliveredOrders: 0, revenue: 0 })

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDashboardData()
    getAllOrders()
  }, [])


  const getDashboardData = async () => {
    const token = sessionStorage.getItem("token")
    if (!token) return

    try {
      const result = await adminDashboardCountAPI({
        Authorization: `Bearer ${token}`
      })
      if (result.status === 200) {
        setDashboardData(result.data || dashboardData)
      }
    } catch (err) {
      console.log("DASHBOARD ERROR:", err)
    }
  }

 
  const getAllOrders = async () => {
    const token = sessionStorage.getItem("token")
    if (!token) return

    try {
      const result = await adminAllOrdersAPI({
        Authorization: `Bearer ${token}`
      })

      if (result.status === 200) {
        setOrders(result.data || [])
      }

    } catch (err) {
      console.log("ORDERS ERROR:", err)
    } finally {
      setLoading(false)
    }
  }

  const totalOrders = dashboardData.totalOrders || 0
  const totalShops = dashboardData.totalShops || 0
  const users = dashboardData.totalUsers || 0
  const revenue = dashboardData.revenue || 0

  return (
    <div className="min-h-screen bg-[#F5F1EB]">

      <AdminSidebar />
      <main className="lg:ml-[260px] min-h-screen">

        <DashboardHeader title="Admin Control Center" showSearch={true}/>

        <div className="p-8">

          {/* HEADER CARD */}
          <div className="mb-8 bg-white border border-[#E6DDD2] rounded-3xl p-7">
            <p className="uppercase tracking-[5px] text-xs text-[#7B614D] mb-3">
              Admin Dashboard
            </p>

            <h1 className="text-4xl font-bold text-[#1A1A1A]">
              Platform Overview
            </h1>

            <p className="text-[#6B4F3B] mt-3">
              Manage shops, users, orders and revenue from one simple dashboard.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

            <StatCard icon={<FaBoxOpen />} value={totalOrders} label="Total Orders" />
            <StatCard icon={<FaStore />} value={totalShops} label="Laundry Shops" />
            <StatCard icon={<FaUsers />} value={users} label="Users" />
            <StatCard icon={<FaRupeeSign />} value={`₹${revenue}`} label="Revenue" />

          </div>

          
          <div className="bg-white border border-[#E3D7C8] rounded-3xl overflow-hidden">

            <div className="px-6 py-5 border-b border-[#E3D7C8]">
              <h2 className="text-2xl font-bold text-[#1A1A1A]">
                Recent Orders
              </h2>
            </div>

            <div className="overflow-x-auto">

              {loading ? (
                <p className="p-6 text-gray-500">Loading orders...</p>
              ) : orders.length === 0 ? (
                <p className="p-6 text-gray-500">No orders found</p>
              ) : (

                <table className="w-full text-left">

                  <thead className="bg-[#FAF7F2]">
                    <tr>
                      <th className="px-6 py-4">Customer</th>
                      <th className="px-6 py-4">Service</th>
                      <th className="px-6 py-4">Phone</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Amount</th>
                    </tr>
                  </thead>

                  <tbody>
                    {orders.map((item) => (
                      <tr key={item._id} className="border-t hover:bg-[#FAF7F2]">

                        <td className="px-6 py-4 font-semibold">
                          {item.customerName}
                        </td>

                        <td className="px-6 py-4">
                          {item.serviceType}
                        </td>

                        <td className="px-6 py-4">
                          {item.phone}
                        </td>

                        <td className="px-6 py-4">
                          <span className="px-3 py-1 rounded-full bg-[#F5F1EB] text-[#3F2F24] text-xs font-semibold">
                            {item.status}
                          </span>
                        </td>

                        <td className="px-6 py-4 font-bold">
                          ₹{item.amount}
                        </td>

                      </tr>
                    ))}
                  </tbody>

                </table>
              )}

            </div>

          </div>

        </div>

      </main>
    </div>
  )
}

const StatCard = ({ icon, value, label }) => (
  <div className="bg-white border border-[#E3D7C8] rounded-3xl p-6">
    <div className="text-2xl text-[#3F2F24] mb-3">{icon}</div>
    <h2 className="text-3xl font-bold text-[#1A1A1A]">{value}</h2>
    <p className="text-[#6B4F3B] mt-2">{label}</p>
  </div>
)

export default AdminDashboard