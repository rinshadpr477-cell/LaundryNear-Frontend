import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deliveryOrdersAPI } from '../../services/allAPI'
import { FaBoxOpen, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa"
import { FaTruckFast } from "react-icons/fa6"
import { MdPendingActions } from "react-icons/md"
import DeliverySidebar from './DeliverySidebar'

function DeliveryDashboard() {

  const [orders, setOrders] = useState([])

  useEffect(() => {
    getDeliveryOrders()
  }, [])



  const getDeliveryOrders = async () => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`
      }
      const result = await deliveryOrdersAPI(reqHeader)
      console.log(result)
      if (result.status === 200) {
        setOrders(result.data)
      }
    }
  }

  const totalDeliveries = orders.length
  const activeDeliveries = orders.filter(item => item.status !== "Delivered").length
  const completedDeliveries = orders.filter(item => item.status === "Delivered").length
  const pendingPickups = orders.filter(item => item.status === "Ready for Delivery").length

  return (
    <div className="min-h-screen bg-[#F5F1EB]">
      <DeliverySidebar />

      <main className="lg:ml-[260px] px-8 py-8">

        <div className="mb-8 bg-white border border-[#E6DDD2] rounded-3xl p-7">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <p className="uppercase tracking-[5px] text-xs text-[#7B614D] mb-3">Delivery Dashboard</p>
              <h1 className="text-4xl font-bold text-[#1A1A1A]">Delivery Overview</h1>
              <p className="text-[#6B4F3B] mt-3">Manage assigned pickups, active deliveries and completed drops.</p>
            </div>

            <Link to="/delivery-orders">
              <button className="bg-[#1A1A1A] text-white px-5 py-3 rounded-2xl text-sm font-semibold hover:bg-[#3F2F24] duration-300">
                View Assignments
              </button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

          <div className="bg-white border border-[#E3D7C8] rounded-3xl p-6">
            <FaBoxOpen className="text-2xl text-[#3F2F24] mb-4" />
            <h2 className="text-3xl font-bold">{totalDeliveries}</h2>
            <p className="mt-2 font-semibold">Total Tasks</p>
            <p className="text-sm text-[#7B614D]">Assigned deliveries</p>
          </div>

          <div className="bg-white border border-[#E3D7C8] rounded-3xl p-6">
            <FaTruckFast className="text-2xl text-[#3F2F24] mb-4" />
            <h2 className="text-3xl font-bold">{activeDeliveries}</h2>
            <p className="mt-2 font-semibold">Active Runs</p>
            <p className="text-sm text-[#7B614D]">Currently moving</p>
          </div>

          <div className="bg-white border border-[#E3D7C8] rounded-3xl p-6">
            <FaCheckCircle className="text-2xl text-[#3F2F24] mb-4" />
            <h2 className="text-3xl font-bold">{completedDeliveries}</h2>
            <p className="mt-2 font-semibold">Completed</p>
            <p className="text-sm text-[#7B614D]">Delivered orders</p>
          </div>

          <div className="bg-white border border-[#E3D7C8] rounded-3xl p-6">
            <MdPendingActions className="text-2xl text-[#3F2F24] mb-4" />
            <h2 className="text-3xl font-bold">{pendingPickups}</h2>
            <p className="mt-2 font-semibold">Pending Pickup</p>
            <p className="text-sm text-[#7B614D]">Waiting for pickup</p>
          </div>

        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 bg-white border border-[#E3D7C8] rounded-3xl p-6">

            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-[#1A1A1A]">Assigned Orders</h2>
                <p className="text-sm text-[#7B614D] mt-1">Latest delivery tasks assigned to you</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {orders.slice(0, 4).map(item => (
                <div key={item._id} className="border border-[#E3D7C8] rounded-2xl p-5">
                  <div className="flex justify-between mb-4">
                    <h3 className="font-bold text-[#1A1A1A]">{item.customerName || "Customer Order"}</h3>
                    <span className="px-3 py-1 rounded-full bg-[#F5F1EB] text-xs">{item.status}</span>
                  </div>

                  <p className="text-sm text-[#7B614D]">{item.serviceType}</p>

                  <p className="text-sm text-[#7B614D] mt-3">
                    {item.address || "Calicut, Kerala"}
                  </p>

                  <p className="text-sm text-[#7B614D] mt-2">
                    {item.phone}
                  </p>
                </div>
              ))}
            </div>

          </div>

          <div className="space-y-6">

            <div className="bg-[#101010] text-white rounded-3xl p-6">
              <p className="uppercase tracking-[4px] text-xs text-white/40 mb-3">Quick Actions</p>
              <h3 className="text-2xl font-bold">Ready For Next Run?</h3>
              <p className="text-white/60 text-sm mt-3">Update your availability and manage delivery status.</p>

              <div className="grid gap-3 mt-6">
                <button className="w-full bg-white text-[#111111] py-3 rounded-2xl text-sm font-semibold">
                  Mark Available
                </button>

                <button className="w-full bg-white/10 border border-white/10 py-3 rounded-2xl text-sm font-semibold">
                  Contact Admin
                </button>
              </div>
            </div>

            <div className="bg-white border border-[#E3D7C8] rounded-3xl p-6">
              <p className="uppercase tracking-[4px] text-xs text-[#7B614D] mb-3">Today Plan</p>

              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-5">
                Route Summary
              </h3>

              <div className="space-y-5">

                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#F5F1EB] flex items-center justify-center">
                    <FaMapMarkerAlt />
                  </div>

                  <div>
                    <h4 className="font-bold">Pickup Zone</h4>
                    <p className="text-sm text-[#7B614D]">Calicut Town</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#F5F1EB] flex items-center justify-center">
                    <FaTruckFast />
                  </div>

                  <div>
                    <h4 className="font-bold">Active Runs</h4>
                    <p className="text-sm text-[#7B614D]">{activeDeliveries} active deliveries today</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#F5F1EB] flex items-center justify-center">
                    <FaCheckCircle />
                  </div>

                  <div>
                    <h4 className="font-bold">Completed</h4>
                    <p className="text-sm text-[#7B614D]">{completedDeliveries} orders delivered</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default DeliveryDashboard