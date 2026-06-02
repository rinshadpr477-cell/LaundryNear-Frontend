import React, { useEffect, useState } from 'react'
import Preloader from '../../components/common/Preloader'
import Header from "../../components/common/Header"
import Footer from "../../components/common/Footer"
import { Link } from "react-router-dom"

function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 800)
  }, [])

  if (loading) return <Preloader />
  return (
    <div className="min-h-screen bg-[#F5F1EB] text-[#1A1A1A] scroll-smooth">
      <Header />
      <main className="pt-28 overflow-hidden">
        <section className="max-w-[1500px] mx-auto px-6 md:px-10 pt-20 pb-28 grid lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-2xl">
            <p className="text-[#6B4F3B] mb-6 tracking-[7px] text-xs font-semibold uppercase">Laundry Delivery</p>
            <h1 className="text-5xl md:text-7xl xl:text-8xl font-serif leading-[0.95] tracking-tight text-[#1A1A1A]">Clean Clothes.<br />Delivered Fast.</h1>
            <p className="text-[#6B4F3B] mt-8 text-lg md:text-xl leading-9 max-w-xl">Laundry Near connects customers with trusted nearby laundry shops for pickup, washing, ironing and doorstep delivery.</p>
            <div className="flex flex-wrap gap-5 mt-10">
              <Link to="/services" className="bg-[#F8F4ED] text-[#1A1A1A] px-11 py-4 min-w-[185px] text-xs font-bold tracking-[3px] uppercase border border-[#CBB89B] rounded-full shadow-[0_18px_45px_rgba(63,47,36,0.10)] hover:bg-[#E8DCCB] hover:border-[#B89B72] hover:-translate-y-1 duration-300">Book Pickup</Link>
              <Link to="/shps" className="bg-[#F8F4ED] text-[#1A1A1A] px-11 py-4 min-w-[185px] text-xs font-bold tracking-[3px] uppercase border border-[#CBB89B] rounded-full shadow-[0_18px_45px_rgba(63,47,36,0.10)] hover:bg-[#E8DCCB] hover:border-[#B89B72] hover:-translate-y-1 duration-300">Explore Shops</Link>
            </div>
          </div>
          <div className="relative h-[540px] bg-[#DCC8AE] border border-[#CBB89B] overflow-hidden rounded-[2rem] shadow-[0_30px_80px_rgba(63,47,36,0.16)]">
            <div className="absolute inset-5 border border-white/25 rounded-[1.5rem] z-20 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-[75%] h-full overflow-hidden">
              <img className="w-full h-full object-cover opacity-90 scale-105" src="https://images.openai.com/static-rsc-4/84TQTcl0vDlWjjKI2k72Tq6rS93pDYNa6wXyyQmjYsK2LcLI3QQ4xeleh2-5G8kRU6roSEYRBxHZSScVjNWt1rccuyqjbsnS_r8jU9bxL526oUD-Llx-lQNMSOCgigjswR4TH-LKGtB43fNXG6VgAEG0uJHV-kA-318gM9aO9iXwCWg-i2uxMsKAqzzItmw3?purpose=fullsize" alt="Laundry premium service" />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#DCC8AE]"></div>
            </div>
            <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-11">
              <div>
                <p className="text-[10px] tracking-[5px] uppercase text-[#6B4F3B] font-bold mb-5">Premium Laundry</p>
                <h2 className="text-4xl md:text-5xl font-serif leading-[1.1] text-[#1A1A1A]">Luxury</h2>
              </div>
              <div className="max-w-[330px] bg-[#F5F1EB]/85 backdrop-blur-md p-7 border border-white/40 rounded-2xl shadow-[0_20px_50px_rgba(63,47,36,0.15)]">
                <p className="text-[10px] tracking-[5px] uppercase text-[#6B4F3B] font-bold mb-3">Trusted Service</p>
                <h3 className="text-3xl font-serif text-[#1A1A1A] leading-tight">Wash.<br />Iron.<br />Deliver.</h3>
                <p className="text-[#6B4F3B] mt-5 leading-7 text-sm">Elegant laundry pickup and delivery experience designed for modern lifestyles.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="max-w-[1500px] mx-auto px-6 md:px-10 pb-28">
          <div className="bg-[#F8F4ED] border border-[#E7DED1] rounded-[2rem] p-8 md:p-12 grid md:grid-cols-3 gap-8">
            <div>
              <p className="text-[#6B4F3B] tracking-[5px] text-xs font-bold uppercase mb-4">Services</p>
              <h2 className="text-3xl md:text-5xl font-serif text-[#1A1A1A] leading-tight">What we do.</h2>
            </div>
            <div className="md:col-span-2 grid sm:grid-cols-2 gap-5">
              <p className="text-[#6B4F3B] leading-7">Wash & Fold</p>
              <p className="text-[#6B4F3B] leading-7">Ironing</p>
              <p className="text-[#6B4F3B] leading-7">Dry Cleaning</p>
              <p className="text-[#6B4F3B] leading-7">Express Delivery</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Home