import React from 'react'
import { GiWashingMachine } from "react-icons/gi";

function Preloader() {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#F5F1EB] flex items-center justify-center">

      <div className="text-center">

        <div className="w-28 h-28 rounded-full border border-[#D8CBB8] flex items-center justify-center mx-auto mb-8 bg-white shadow-sm animate-pulse">

          <GiWashingMachine className="text-5xl text-[#3F2F24]" />

        </div>

        <h1 className="text-5xl md:text-6xl font-serif text-[#1A1A1A] tracking-tight">
          LaundryNear
        </h1>

        <p className="uppercase tracking-[8px] text-xs text-[#6B4F3B] mt-6">
          Premium Laundry Care
        </p>

        <div className="w-40 h-[1px] bg-[#3F2F24] mx-auto mt-8 animate-pulse"></div>

      </div>

    </div>
  )
}

export default Preloader