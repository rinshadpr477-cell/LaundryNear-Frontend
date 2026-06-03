import React, { useEffect, useState } from 'react'
import ShopSidebar from './ShopSidebar'
import {shopOrdersAPI,acceptOrderAPI,updateOrderStatusAPI} from '../../services/allAPI'

function ShopOrders() {

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

  const handleAcceptOrder = async (id) => {
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      Authorization: `Bearer ${token}`
    }
    const result = await acceptOrderAPI(id, reqHeader)
    if (result.status === 200) {
      getShopOrders()
    }
  }

  const handleUpdateStatus = async (id, status) => {
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      Authorization: `Bearer ${token}`
    }
    const reqBody = { status }
    const result = await updateOrderStatusAPI(id, reqBody, reqHeader)
    if (result.status === 200) {
      getShopOrders()
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F1EB]">
      <ShopSidebar />

      <main className="lg:ml-[260px] px-8 py-8">

        <div className="mb-8 bg-white border border-[#E6DDD2] rounded-3xl p-7">
          <p className="uppercase tracking-[5px] text-xs text-[#7B614D] mb-3">
            Shop Orders
          </p>

          <h1 className="text-4xl font-bold text-[#1A1A1A]">
            Manage Orders
          </h1>

          <p className="text-[#6B4F3B] mt-3">
            Accept customer orders and update delivery status.
          </p>
        </div>

        <div className="bg-white border border-[#E3D7C8] rounded-3xl p-6">

          {
            shopOrders.length > 0 ? (
              <div className="grid gap-5">
                {
                  shopOrders.map((item) => (
                    <div key={item._id}  className="border border-[#E3D7C8] rounded-2xl p-5"  >
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                        <div>
                          <h3 className="text-xl font-bold text-[#1A1A1A]">
                            {item.customerName}
                          </h3>

                          <p className="text-sm text-[#7B614D] mt-2">
                            Service: {item.serviceType}
                          </p>

                          <p className="text-sm text-[#7B614D] mt-1">
                            Quantity: {item.quantity}
                          </p>

                          <p className="text-sm text-[#7B614D] mt-1">
                            Phone: {item.phone}
                          </p>

                          <p className="text-sm text-[#7B614D] mt-1">
                            Address: {item.address}
                          </p>
                        </div>

                        <div className="flex flex-col gap-3 lg:items-end">

                          <h3 className="text-2xl font-bold text-[#1A1A1A]">
                            ₹{item.amount}
                          </h3>

                          <span className="px-4 py-2 rounded-full bg-[#F5F1EB] text-sm font-semibold text-[#3F2F24]">
                            {item.status}
                          </span>

                          {
                            item.status === "Pending" ? (
                              <button onClick={() => handleAcceptOrder(item._id)}  className="bg-[#1A1A1A] text-white px-5 py-3 rounded-2xl text-sm font-semibold hover:bg-[#3F2F24] duration-300" >
                                Accept Order
                              </button>
                            ) : (
                              <select   value={item.status} onChange={(e) => handleUpdateStatus(item._id, e.target.value)} className="border border-[#D8C7B8] bg-white px-4 py-3 rounded-2xl text-sm font-semibold outline-none" >
                                <option value="Accepted">Accepted</option>
                                <option value="Processing">Processing</option>
                                <option value="Ready for Delivery">Ready for Delivery</option>
                                <option value="Out for Delivery">Out for Delivery</option>
                                <option value="Delivered">Delivered</option>
                              </select>
                            )
                          }

                        </div>

                      </div>
                    </div>
                  ))
                }
              </div>
            ) : (
              <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-[#1A1A1A]">
                  No Orders Found
                </h2>

                <p className="text-[#7B614D] mt-3">
                  New customer orders will appear here.
                </p>
              </div>
            )
          }

        </div>

      </main>
    </div>
  )
}

export default ShopOrders