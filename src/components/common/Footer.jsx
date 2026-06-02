import React from 'react'
import {Link} from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-[#3F2F24] text-white">
      <div className="max-w-[1500px] mx-auto px-6 md:px-10 py-16 grid md:grid-cols-4 gap-12">
        <div>
          <h2 className="text-4xl font-serif tracking-[8px] mb-5">LAUNDRY</h2>
          <p className="text-[#D6C2A8] leading-7 text-sm">Premium laundry pickup and delivery platform connecting customers with trusted nearby laundry partners.</p>
        </div>
        <div>
          <p className="text-sm tracking-[4px] uppercase text-[#B89B72] mb-6 font-bold">Explore</p>
          <div className="flex flex-col gap-4 text-[#D6C2A8] text-sm">
            <Link to="/" className="hover:text-white duration-300">Home</Link>
            <Link to="/services" className="hover:text-white duration-300">Services</Link>
            <Link to="/shps" className="hover:text-white duration-300">Laundry Shops</Link>
            <Link to="/login" className="hover:text-white duration-300">Login</Link>
          </div>
        </div>
        <div>
          <p className="text-sm tracking-[4px] uppercase text-[#B89B72] mb-6 font-bold">Services</p>
          <div className="flex flex-col gap-4 text-[#D6C2A8] text-sm">
            <p>Wash & Fold</p>
            <p>Ironing</p>
            <p>Dry Cleaning</p>
            <p>Express Delivery</p>
          </div>
        </div>
        <div>
          <p className="text-sm tracking-[4px] uppercase text-[#B89B72] mb-6 font-bold">Contact</p>
          <div className="flex flex-col gap-4 text-[#D6C2A8] text-sm leading-7">
            <p>Calicut, Kerala</p>
            <p>laundrynear@gmail.com</p>
            <p>+91 8593923135</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-[1500px] mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row justify-between gap-4 text-sm text-[#B89B72]">
          <p>© 2026 Laundry Near. All rights reserved.</p>
          <p>Built for clean living.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer