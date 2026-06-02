import React, { useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar'
import { adminAllOrdersAPI } from '../../services/allAPI'
import { FaBoxOpen } from "react-icons/fa"

function AdminOrders() {

  const [orders, setOrders] = useState([])

  const getAllOrders = async () => {
    const token = sessionStorage.getItem("token")

    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`
      }

      const result = await adminAllOrdersAPI(reqHeader)
      console.log(result)

      if (result.status === 200) {
        setOrders(result.data)
      }
    }
  }

  useEffect(() => {
    getAllOrders()
  }, [])

  return (
    <div className="min-h-screen bg-[#F5F1EB]">
      <AdminSidebar />

      <main className="lg:ml-[260px] px-8 py-8">

        <div className="mb-8 bg-white border border-[#E6DDD2] rounded-3xl p-7">
          <p className="uppercase tracking-[5px] text-xs text-[#7B614D] mb-3">
            Admin Panel
          </p>

          <h1 className="text-4xl font-bold text-[#1A1A1A]">
            Manage Orders
          </h1>

          <p className="text-[#6B4F3B] mt-3">
            View all customer laundry orders across the platform.
          </p>
        </div>

        <div className="bg-white border border-[#E3D7C8] rounded-3xl overflow-hidden">

          <div className="px-6 py-5 border-b border-[#E3D7C8] flex items-center gap-3">
            <FaBoxOpen className="text-[#3F2F24]" />

            <h2 className="text-2xl font-bold text-[#1A1A1A]">
              All Orders
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">

              <thead className="bg-[#FAF7F2]">
                <tr>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Service</th>
                  <th className="px-6 py-4">Quantity</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Amount</th>
                </tr>
              </thead>

              <tbody>
                {
                  orders.map((item) => (
                    <tr
                      key={item._id}
                      className="border-t border-[#EFE6DA] hover:bg-[#FAF7F2]"
                    >
                      <td className="px-6 py-4 font-semibold">
                        {item.customerName}
                      </td>

                      <td className="px-6 py-4">
                        {item.phone}
                      </td>

                      <td className="px-6 py-4">
                        {item.serviceType}
                      </td>

                      <td className="px-6 py-4">
                        {item.quantity}
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
                  ))
                }
              </tbody>

            </table>
          </div>

        </div>

      </main>
    </div>
  )
}

export default AdminOrders