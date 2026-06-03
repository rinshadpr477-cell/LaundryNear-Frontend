import React, { useEffect, useState } from 'react'
import DeliverySidebar from './DeliverySidebar'
import {
  deliveryOrdersAPI,
  pickupOrderAPI,
  deliverOrderAPI
} from '../../services/allAPI'

function DeliveryOrders() {

  const [orders, setOrders] = useState([])

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

  useEffect(() => {
    getDeliveryOrders()
  }, [])

  const handlePickupOrder = async (id) => {

    const token = sessionStorage.getItem("token")

    const reqHeader = {
      Authorization: `Bearer ${token}`
    }

    const result = await pickupOrderAPI(id, reqHeader)

    if (result.status === 200) {
      getDeliveryOrders()
    }
  }

  const handleDeliverOrder = async (id) => {

    const token = sessionStorage.getItem("token")

    const reqHeader = {
      Authorization: `Bearer ${token}`
    }

    const result = await deliverOrderAPI(id, reqHeader)

    if (result.status === 200) {
      getDeliveryOrders()
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F1EB]">
      <DeliverySidebar />
      <main className="lg:ml-[260px] px-8 py-8">
        <div className="mb-8 bg-white border border-[#E6DDD2] rounded-3xl p-7">
          <p className="uppercase tracking-[5px] text-xs text-[#7B614D] mb-3">
            Delivery Panel
          </p>
          <h1 className="text-4xl font-bold text-[#1A1A1A]">
            Delivery Orders
          </h1>
          <p className="text-[#6B4F3B] mt-3">
            Manage pickups and completed deliveries.
          </p>
        </div>

        <div className="grid gap-5">

          {
            orders.length > 0 ? (
              orders.map((item) => (
                <div  key={item._id} className="bg-white border border-[#E3D7C8] rounded-3xl p-6"  >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                    <div>
                      <h3 className="text-xl font-bold text-[#1A1A1A]">
                        {item.customerName}
                      </h3>

                      <p className="text-sm text-[#7B614D] mt-2">
                        Service: {item.serviceType}
                      </p>

                      <p className="text-sm text-[#7B614D] mt-2">
                        Phone: {item.phone}
                      </p>

                      <p className="text-sm text-[#7B614D] mt-2">
                        Address: {item.address}
                      </p>

                    </div>

                    <div className="flex flex-col gap-3 lg:items-end">

                      <span className="px-4 py-2 rounded-full bg-[#F5F1EB] text-sm font-semibold">
                        {item.status}
                      </span>

                      {
                        item.status === "Ready for Delivery" && (
                          <button  onClick={() => handlePickupOrder(item._id)}  className="bg-[#1A1A1A] text-white px-5 py-3 rounded-2xl text-sm font-semibold hover:bg-[#3F2F24]" > Pick Up Order</button>
                        )
                      }

                      {
                        item.status === "Out for Delivery" && (
                          <button
                            onClick={() => handleDeliverOrder(item._id)}
                            className="bg-green-600 text-white px-5 py-3 rounded-2xl text-sm font-semibold hover:bg-green-700"
                          >
                            Mark Delivered
                          </button>
                        )
                      }

                    </div>

                  </div>

                </div>

              ))

            ) : (

              <div className="bg-white border border-[#E3D7C8] rounded-3xl p-10 text-center">
                <h2 className="text-2xl font-bold text-[#1A1A1A]">
                  No Delivery Orders
                </h2>
                <p className="text-[#7B614D] mt-3">
                  Orders ready for delivery will appear here.
                </p>
              </div>
            )
          }
        </div>
      </main>
    </div>
  )
}

export default DeliveryOrders