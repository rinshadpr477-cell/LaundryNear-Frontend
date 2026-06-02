import React, { useEffect, useState } from 'react'
import EmptyState from '../../components/common/EmptyState'
import { customerOrdersAPI, getAllShopsAPI } from '../../services/allAPI'
import { FaBoxOpen } from "react-icons/fa"
import { FaTruckFast } from "react-icons/fa6"
import { MdDoneAll } from "react-icons/md"
import { RiStore2Fill } from "react-icons/ri"
import CustomerSidebar from './CustomerSidebar'

function CustomerDashboard() {
  const [orders, setOrders] = useState([])
  const [shops, setShops] = useState([])

  const existingUser = JSON.parse(sessionStorage.getItem("existingUser"))

  const getCustomerOrders = async () => {
    const token = sessionStorage.getItem("token")

    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`
      }

      const result = await customerOrdersAPI(reqHeader)
      console.log(result)

      if (result.status === 200) {
        setOrders(result.data)
      }
    }
  }

  const getAllShops = async () => {
    const result = await getAllShopsAPI()
    console.log(result)

    if (result.status === 200) {
      setShops(result.data)
    }
  }

  useEffect(() => {
    getCustomerOrders()
    getAllShops()
  }, [])

  const totalOrders = orders.length
  const activeOrders = orders.filter((item) => item.status !== "Delivered").length
  const completedOrders = orders.filter((item) => item.status === "Delivered").length
  const savedShops = shops.length

  return (
    <div className="min-h-screen bg-[#F5F1EB]">
      <CustomerSidebar />

      <main className="lg:ml-[260px] px-8 py-8">
        <div className="mb-8 bg-white border border-[#E6DDD2] rounded-3xl p-7">
          <p className="uppercase tracking-[5px] text-xs text-[#7B614D] mb-3">
            Customer Dashboard
          </p>

          <h1 className="text-4xl font-bold text-[#1A1A1A]">
            Welcome Back, {existingUser?.username || "Customer"}
          </h1>

          <p className="text-[#6B4F3B] mt-3 max-w-2xl leading-7">
            Manage your laundry orders, track pickups and explore nearby laundry shops.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          <div className="bg-white border border-[#E3D7C8] rounded-3xl p-6">
            <FaBoxOpen className="text-2xl text-[#3F2F24] mb-4" />
            <h2 className="text-3xl font-bold text-[#1A1A1A]">{totalOrders}</h2>
            <p className="text-[#3F2F24] font-semibold mt-2">Total Orders</p>
            <p className="text-sm text-[#7B614D] mt-1">All laundry orders</p>
          </div>

          <div className="bg-white border border-[#E3D7C8] rounded-3xl p-6">
            <FaTruckFast className="text-2xl text-[#3F2F24] mb-4" />
            <h2 className="text-3xl font-bold text-[#1A1A1A]">{activeOrders}</h2>
            <p className="text-[#3F2F24] font-semibold mt-2">Active Orders</p>
            <p className="text-sm text-[#7B614D] mt-1">Currently in progress</p>
          </div>

          <div className="bg-white border border-[#E3D7C8] rounded-3xl p-6">
            <MdDoneAll className="text-2xl text-[#3F2F24] mb-4" />
            <h2 className="text-3xl font-bold text-[#1A1A1A]">{completedOrders}</h2>
            <p className="text-[#3F2F24] font-semibold mt-2">Completed</p>
            <p className="text-sm text-[#7B614D] mt-1">Successfully delivered</p>
          </div>

          <div className="bg-white border border-[#E3D7C8] rounded-3xl p-6">
            <RiStore2Fill className="text-2xl text-[#3F2F24] mb-4" />
            <h2 className="text-3xl font-bold text-[#1A1A1A]">{savedShops}</h2>
            <p className="text-[#3F2F24] font-semibold mt-2">Nearby Shops</p>
            <p className="text-sm text-[#7B614D] mt-1">Available in your area</p>
          </div>
        </div>

        <div className="bg-white border border-[#E3D7C8] rounded-3xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-[#1A1A1A]">
                Recent Orders
              </h2>

              <p className="text-sm text-[#7B614D] mt-1">
                Your latest laundry orders
              </p>
            </div>
          </div>

          {orders.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {orders.slice(0, 3).map((item) => (
                <div
                  key={item._id}
                  className="border border-[#E3D7C8] rounded-3xl p-5 bg-[#FAF7F2]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-[#1A1A1A]">
                        {item.customerName}
                      </h3>

                      <p className="text-sm text-[#7B614D] mt-1">
                        {item.serviceType}
                      </p>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-white text-[#3F2F24] text-xs font-semibold">
                      {item.status}
                    </span>
                  </div>

                  <div className="mt-5 flex items-center justify-between text-sm">
                    <p className="text-[#7B614D]">{item.phone}</p>
                    <p className="font-bold text-[#1A1A1A]">₹{item.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No Orders Yet"
              message="You have not placed any laundry orders yet. Start by exploring nearby laundry shops."
            />
          )}
        </div>
      </main>
    </div>
  )
}

export default CustomerDashboard