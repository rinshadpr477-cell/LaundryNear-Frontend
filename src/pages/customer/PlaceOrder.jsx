import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getSingleShopAPI, placeOrderAPI } from '../../services/allAPI'
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

function PlaceOrder() {
  const { shopId } = useParams()
  const navigate = useNavigate()

  const [shop, setShop] = useState(null)

  const savedForm = sessionStorage.getItem("placeOrderForm")

  const [formData, setFormData] = useState(
    savedForm
      ? JSON.parse(savedForm)
      : {
        customerName: "",
        phone: "",
        address: "",
        serviceType: "",
        quantity: "",
        amount: ""
      }
  )

  useEffect(() => {
    getShopDetails()
  }, [])

  useEffect(() => {
    sessionStorage.setItem(
      "placeOrderForm",
      JSON.stringify(formData)
    )
  }, [formData])

  const getShopDetails = async () => {
    try {
      const result = await getSingleShopAPI(shopId)

      if (result.status === 200) {
        setShop(result.data)
      } else {
        navigate('/shps')
      }
    } catch (err) {
      console.log(err)
      navigate('/shps')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handlePlaceOrder = async () => {

    const { customerName, phone, address, serviceType, quantity, amount } = formData

    if (
      !customerName.trim() ||
      !phone.trim() ||
      !address.trim() ||
      !serviceType.trim() ||
      !quantity ||
      !amount
    ) {
      toast.warning("Please fill the form completely")
      return
    }

    if (!/^\d{10}$/.test(phone)) {
      toast.warning("Please enter a valid 10 digit phone number")
      return
    }

    if (quantity <= 0) {
      toast.warning("Quantity must be greater than 0")
      return
    }

    if (amount <= 0) {
      toast.warning("Amount must be greater than 0")
      return
    }

    const token = sessionStorage.getItem("token")

    if (token) {

      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }

      const reqBody = {
        shopId,
        customerName,
        phone,
        address,
        serviceType,
        quantity,
        amount
      }

      try {

        const result = await placeOrderAPI(reqBody, reqHeader)
        console.log(result)
        if (result.status === 200) {
          toast.success("Order placed successfully")
          sessionStorage.removeItem("placeOrderForm")
          setFormData({
            customerName: "",
            phone: "",
            address: "",
            serviceType: "",
            quantity: "",
            amount: ""
          })
          navigate('/my-orders')
        }
      } catch (err) {
        console.log(err)
        toast.error("Order placing failed")
      }
    } else {
      toast.warning("Please login first")
      navigate('/auth')
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F1EB] lg:ml-[260px] px-8 py-8">

      <div className="mb-10">
        <p className="uppercase tracking-[5px] text-xs text-[#7B614D] mb-3">
          Place Order
        </p>

        <h1 className="text-4xl font-bold text-[#1A1A1A]">
          Schedule Your Laundry Pickup
        </h1>

        <p className="mt-3 text-[#6B4F3B] max-w-2xl">
          You are ordering from {shop?.shopName}. Select service and pickup details.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-[#E7DED1]">
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">Pickup Details</h2>

          <input type="text" name="customerName" value={formData.customerName} onChange={handleChange} placeholder="Full Name" className="w-full mb-5 border border-[#E7DED1] bg-[#FCFAF8] rounded-2xl px-4 py-3 outline-none focus:border-[#3F2F24]" />
          <input type="tel" maxLength={10} name="phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "") })} placeholder="Phone Number" className="w-full mb-5 border border-[#E7DED1] bg-[#FCFAF8] rounded-2xl px-4 py-3 outline-none focus:border-[#3F2F24]" />
          <textarea rows="4" name="address" value={formData.address} onChange={handleChange} placeholder="Pickup Address" className="w-full mb-5 border border-[#E7DED1] bg-[#FCFAF8] rounded-2xl px-4 py-3 outline-none focus:border-[#3F2F24]" />
          <select name="serviceType" value={formData.serviceType} onChange={handleChange} className="w-full mb-5 border border-[#E7DED1] bg-[#FCFAF8] rounded-2xl px-4 py-3 outline-none focus:border-[#3F2F24]">

            <option value="">Select Service</option>
            <option value="Wash & Fold">Wash & Fold</option>
            <option value="Wash & Iron">Wash & Iron</option>
            <option value="Dry Cleaning">Dry Cleaning</option>
            <option value="Iron Only">Iron Only</option>

          </select>

          <input type="number" min="1" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Quantity" className="w-full mb-5 border border-[#E7DED1] bg-[#FCFAF8] rounded-2xl px-4 py-3 outline-none focus:border-[#3F2F24]" />
          <input type="number" min="1" name="amount" value={formData.amount} onChange={handleChange} placeholder="Amount" className="w-full mb-6 border border-[#E7DED1] bg-[#FCFAF8] rounded-2xl px-4 py-3 outline-none focus:border-[#3F2F24]" />

          <button onClick={handlePlaceOrder} className="bg-[#1A1A1A] text-white px-6 py-3 rounded-2xl font-medium hover:bg-[#3F2F24] duration-300">
            Confirm Order
          </button>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-[#E7DED1] h-fit">

          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">
            Order Summary
          </h2>

          <div className="space-y-5">

            <div className="flex justify-between">
              <p className="text-[#6B4F3B]">Shop</p>
              <p className="font-semibold text-[#1A1A1A]">{shop?.shopName}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-[#6B4F3B]">Area</p>
              <p className="font-semibold text-[#1A1A1A]">{shop?.area}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-[#6B4F3B]">Service</p>
              <p className="font-semibold text-[#1A1A1A]">
                {formData.serviceType || "Not selected"}
              </p>
            </div>

            <div className="flex justify-between">
              <p className="text-[#6B4F3B]">Quantity</p>
              <p className="font-semibold text-[#1A1A1A]">
                {formData.quantity || 0}
              </p>
            </div>

            <div className="border-t border-[#E7DED1] pt-4 flex justify-between">
              <p className="font-semibold text-[#1A1A1A]">Amount</p>
              <p className="font-semibold text-[#1A1A1A]">
                ₹{formData.amount || 0}
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default PlaceOrder