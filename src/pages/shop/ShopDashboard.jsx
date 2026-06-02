import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { shopOrdersAPI } from '../../services/allAPI'
import { FaBoxOpen, FaCheckCircle, FaRupeeSign, FaStar } from "react-icons/fa"
import { FaTruckFast } from "react-icons/fa6"
import ShopSidebar from './ShopSidebar'

function ShopDashboard() {

  const [shopOrders, setShopOrders] = useState([])

  const getShopOrders = async () => {
    const token = sessionStorage.getItem("token")
    if (token) {

      const reqHeader = {
        Authorization: `Bearer ${token}`
      }

      const result = await shopOrdersAPI(reqHeader)
      console.log(result)

      if (result.status === 200) {
        setShopOrders(result.data)
      }
    }
  }

  useEffect(() => {
    getShopOrders()
  }, [])

  

  const totalOrders = shopOrders.length

  const activeOrders = shopOrders.filter(
    item => item.status !== "Delivered"
  ).length

  const completedOrders = shopOrders.filter(
    item => item.status === "Delivered"
  ).length

  const revenue = shopOrders.reduce(
    (total, item) => total + Number(item.amount || 0),
    0
  )

  return (
    <div className="min-h-screen bg-[#F5F1EB]">

      <ShopSidebar />

      <main className="lg:ml-[260px] px-8 py-8">

        <div className="mb-8 bg-white border border-[#E6DDD2] rounded-3xl p-7">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div>
              <p className="uppercase tracking-[5px] text-xs text-[#7B614D] mb-3">
                Shop Dashboard
              </p>

              <h1 className="text-4xl font-bold text-[#1A1A1A]">
                Shop Overview
              </h1>

              <p className="text-[#6B4F3B] mt-3">
                Manage customer orders, services and deliveries.
              </p>
            </div>

            <Link to="/shop-orders">
              <button className="bg-[#1A1A1A] text-white px-5 py-3 rounded-2xl text-sm font-semibold hover:bg-[#3F2F24] duration-300">
                Manage Orders
              </button>
            </Link>

          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

          <div className="bg-white border border-[#E3D7C8] rounded-3xl p-6">
            <FaBoxOpen className="text-2xl text-[#3F2F24] mb-4" />
            <h2 className="text-3xl font-bold">{totalOrders}</h2>
            <p className="mt-2 font-semibold">Total Orders</p>
          </div>

          <div className="bg-white border border-[#E3D7C8] rounded-3xl p-6">
            <FaTruckFast className="text-2xl text-[#3F2F24] mb-4" />
            <h2 className="text-3xl font-bold">{activeOrders}</h2>
            <p className="mt-2 font-semibold">In Process</p>
          </div>

          <div className="bg-white border border-[#E3D7C8] rounded-3xl p-6">
            <FaCheckCircle className="text-2xl text-[#3F2F24] mb-4" />
            <h2 className="text-3xl font-bold">{completedOrders}</h2>
            <p className="mt-2 font-semibold">Completed</p>
          </div>

          <div className="bg-white border border-[#E3D7C8] rounded-3xl p-6">
            <FaRupeeSign className="text-2xl text-[#3F2F24] mb-4" />
            <h2 className="text-3xl font-bold">₹{revenue}</h2>
            <p className="mt-2 font-semibold">Revenue</p>
          </div>

        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 bg-white border border-[#E3D7C8] rounded-3xl p-6">

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Recent Orders</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-5">

              {shopOrders.slice(0, 4).map((item) => (

                <div
                  key={item._id}
                  className="border border-[#E3D7C8] rounded-2xl p-5"
                >

                  <div className="flex justify-between mb-4">
                    <h3 className="font-bold">
                      {item.customerName}
                    </h3>

                    <span className="px-3 py-1 rounded-full bg-[#F5F1EB] text-xs">
                      {item.status}
                    </span>
                  </div>

                  <p className="text-sm text-[#7B614D]">
                    {item.serviceType}
                  </p>

                  <p className="text-sm text-[#7B614D] mt-3">
                    📞 {item.phone}
                  </p>

                </div>

              ))}

            </div>

          </div>

          <div className="space-y-6">

            <div className="bg-[#101010] text-white rounded-3xl p-6">

              <p className="uppercase tracking-[4px] text-xs text-white/40 mb-3">
                Quick Actions
              </p>

              <h3 className="text-2xl font-bold">
                Keep Your Shop Active
              </h3>

              <div className="grid gap-3 mt-6">

                <Link to="/shop-orders">
                  <button className="w-full bg-white text-[#111111] py-3 rounded-2xl text-sm font-semibold">
                    Manage Orders
                  </button>
                </Link>

              </div>

            </div>

            <div className="bg-white border border-[#E3D7C8] rounded-3xl p-6">

              <p className="uppercase tracking-[4px] text-xs text-[#7B614D] mb-3">
                Rating
              </p>

              <div className="flex items-center gap-3">
                <h3 className="text-3xl font-bold">4.8</h3>
                <FaStar />
              </div>

              <p className="text-sm text-[#7B614D] mt-3">
                Customers love your service quality.
              </p>

            </div>

          </div>

        </div>

      </main>

    </div>
  )
}

export default ShopDashboard