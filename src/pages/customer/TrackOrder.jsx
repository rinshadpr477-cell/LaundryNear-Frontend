import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { singleOrderAPI } from '../../services/allAPI'

function TrackOrder() {

  const { id } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)


  const steps = [
    "Pending Payment",
    "Accepted",
    "Picked Up",
    "In Washing",
    "Ironing",
    "Ready",
    "Out for Delivery",
    "Delivered"
  ]


  const getOrderDetails = async () => {
    const token = sessionStorage.getItem("token")
    if (!token) {
      navigate('/auth')
      return
    }
    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    try {
      const result = await singleOrderAPI(id, reqHeader)
      if (result.status === 200) {
        setOrder(result.data)
      } else {
        navigate('/customer/my-orders')
      }
    } catch (err) {
      console.log("TRACK ERROR:", err)
      navigate('/customer/my-orders')
    }
  }

  useEffect(() => {
    getOrderDetails()   
    const interval = setInterval(() => {
      getOrderDetails()
    }, 5000)
    return () => clearInterval(interval)

  }, [id])

  const currentIndex = steps.indexOf(order?.status)
  const safeIndex = currentIndex === -1 ? 0 : currentIndex

  return (
    <div className="min-h-screen bg-[#F5F1EB] lg:ml-[260px] px-8 py-8">

      
      <div className="max-w-5xl mx-auto mb-10">
        <p className="uppercase tracking-[5px] text-xs text-[#7B614D] mb-3">
          Track Order
        </p>

        <h1 className="text-4xl font-bold text-[#1A1A1A]">
          Live Order Tracking
        </h1>
      </div>

     
      <div className="max-w-5xl mx-auto bg-white rounded-3xl p-8 border border-[#E7DED1]">

       
        <div className="mb-10">
          <h2 className="text-xl font-bold">
            Order ID: {order?._id}
          </h2>

          <p className="text-[#6B4F3B] mt-2">
            Current Status: <span className="font-semibold text-black">
              {order?.status}
            </span>
          </p>
        </div>

        
        <div className="space-y-6">
          {steps.map((step, index) => {
            const completed = index <= safeIndex
            return (
              <div key={index} className="flex items-center gap-5">

                
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
                  ${completed ? 'bg-[#1A1A1A] text-white' : 'bg-[#EFE7DD] text-[#8A7563]'}`}>
                  {index + 1}
                </div>
           
                <div>
                  <h3 className={`text-lg font-semibold
                    ${completed ? 'text-[#1A1A1A]' : 'text-[#9B8A7A]'}`}>
                    {step}
                  </h3>
                </div>

              </div>
            )
          })}

        </div>

       
        <div className="mt-10">
          <Link to="/my-orders"  className="inline-block bg-[#1A1A1A] text-white px-6 py-3 rounded-2xl hover:bg-[#3F2F24] duration-300" >
            Back To Orders
          </Link>
        </div>

      </div>
    </div>
  )
}

export default TrackOrder