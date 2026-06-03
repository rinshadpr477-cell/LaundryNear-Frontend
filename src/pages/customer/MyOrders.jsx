import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EmptyState from '../../components/common/EmptyState'
import { customerOrdersAPI } from '../../services/allAPI'
import axios from 'axios'
import { toast } from 'react-toastify'

function MyOrders() {

  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loadingId, setLoadingId] = useState(null)

  useEffect(() => {
    getOrders()
  }, [])

  const getOrders = async () => {
    const token = sessionStorage.getItem("token")
    if (!token) return
    try {
      const result = await customerOrdersAPI({
        Authorization: `Bearer ${token}`
      })
      if (result.status === 200) {
        setOrders(result.data)
      }

    } catch (err) {
      console.log("GET ORDERS ERROR:", err)
      toast.error("Failed to load orders")
    }
  }

  const cancelOrder = async (id) => {
    const token = sessionStorage.getItem("token")
    try {
      await axios.put(
        `http://localhost:4000/order/cancel/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      toast.success("Order Cancelled")
      getOrders()

    } catch (err) {
      console.log("CANCEL ERROR:", err)
      toast.error("Cancel failed")
    }
  }

  const payNow = async (order) => {
    const token = sessionStorage.getItem("token")
    if (!order?._id) {
      toast.warn("Invalid order")
      return
    }

    if (!window.Razorpay) {
      toast.error("Razorpay SDK not loaded")
      return
    }

    try {
      setLoadingId(order._id)
      toast.info("Initializing payment...")

      const res = await axios.post(
        "http://localhost:4000/payment/create-order",
        {
          amount: order.amount,
          orderId: order._id
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      const razorpayOrder = res.data?.razorpayOrder
      const key = res.data?.key

      if (!razorpayOrder || !key) {
        toast.error("Payment initialization failed")
        return
      }

      const options = {
        key,
        amount: razorpayOrder.amount,
        currency: "INR",
        order_id: razorpayOrder.id,

        handler: async function (response) {
          try {
            const verify = await axios.post(
              "http://localhost:4000/payment/verify",
              {
                orderId: order._id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              },
              {
                headers: { Authorization: `Bearer ${token}` }
              }
            )
            if (verify.data?.success) {
              toast.success("Payment Successful")
              getOrders()
            } else {
              toast.error("Payment verification failed")
            }
          } catch (err) {
            console.log(err)
            toast.error("Verification error")
          }
        },
        modal: {
          ondismiss: function () {
            toast.info("Payment cancelled")
          }
        }
      }
      const rzp = new window.Razorpay(options)
      rzp.on("payment.failed", function () {
        toast.error("Payment Failed")
      })
      rzp.open()
    } catch (err) {
      console.log("PAYMENT ERROR:", err.response?.data || err)
      toast.error("Payment initiation failed")
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F1EB] lg:ml-[260px] px-8 py-8">

      <div className="mb-10">
        <h1 className="text-4xl font-bold text-[#1A1A1A]">
          My Orders
        </h1>
      </div>

      {orders.length > 0 ? (

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {orders.map((item) => (

            <div key={item._id} className="bg-white p-6 rounded-3xl">

              <h3 className="font-bold">{item.serviceType}</h3>
              <p>Status: {item.status}</p>

              {item.status === "Paid" && (
                <span className="inline-block mt-2 px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                  Paid
                </span>
              )}

              <p className="mt-2">₹{item.amount}</p>

             
              <div className="mt-4 flex gap-2">    
                <button onClick={() => navigate(`/customer/track-order/${item._id}`)} className="flex-1 bg-black text-white py-2 rounded-xl" > Track </button>  
                <button onClick={() => navigate("/shps")} className="flex-1 bg-[#F5F1EB] border border-[#E3D7C8] text-[#3F2F24] py-2 rounded-xl" > Shops </button>
              </div>

              
              {item.status === "Pending Payment" && (
                <button onClick={() => payNow(item)} disabled={loadingId === item._id} className="mt-3 w-full bg-green-600 text-white py-2 rounded-xl"  >
                  {loadingId === item._id ? "Processing..." : "Pay Now"}
                </button>
              )}

           
              {item.status !== "Delivered" &&
                item.status !== "Out for Delivery" &&
                item.status !== "Cancelled" &&
                item.status !== "Paid" && (
                  <button
                    onClick={() => cancelOrder(item._id)}
                    className="mt-3 w-full bg-red-500 text-white py-2 rounded-xl"
                  >
                    Cancel Order
                  </button>
              )}

            </div>

          ))}

        </div>

      ) : (
        <EmptyState
          title="No Orders"
          message="Start ordering laundry services"
        />
      )}

    </div>
  )
}

export default MyOrders