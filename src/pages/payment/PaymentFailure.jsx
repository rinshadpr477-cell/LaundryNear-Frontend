import React from "react"
import { useNavigate } from "react-router-dom"

function PaymentFailure() {

  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F1EB]">

      <div className="bg-white p-10 rounded-3xl text-center shadow-lg">

        <h1 className="text-3xl font-bold text-red-600">
          Payment Failed ❌
        </h1>

        <p className="mt-3 text-gray-600">
          Something went wrong. Please try again.
        </p>

        <button
          onClick={() => navigate("/shps")}
          className="mt-6 bg-black text-white px-6 py-3 rounded-xl"
        >
          Back to Shops
        </button>

      </div>

    </div>
  )
}

export default PaymentFailure