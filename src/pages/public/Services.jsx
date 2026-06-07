import React from 'react'
import Header from '../../components/common/Header'
import Footer from '../../components/common/Footer'

const services = [
  {
    id: 1,
    name: "Wash & Fold",
    description: "Everyday laundry washed, dried and neatly folded.",
    price: 80
  },
  {
    id: 2,
    name: "Wash & Iron",
    description: "Fresh washing with professional ironing for daily wear.",
    price: 120
  },
  {
    id: 3,
    name: "Dry Cleaning",
    description: "Premium care for delicate and expensive garments.",
    price: 180
  },
  {
    id: 4,
    name: "Steam Ironing",
    description: "Professional steam ironing for wrinkle-free clothing.",
    price: 50
  },
  {
    id: 5,
    name: "Shoe Cleaning",
    description: "Deep cleaning and polishing for shoes and sneakers.",
    price: 150
  },
  {
    id: 6,
    name: "Curtain & Blanket Wash",
    description: "Heavy fabric cleaning for curtains, blankets and bedsheets.",
    price: 250
  }
]

function Services() {
  return (
    <div className="min-h-screen bg-[#F5F1EB] text-[#1A1A1A]">
      <Header />

      <main className="pt-32 px-6 md:px-10 pb-24">

        <section className="max-w-[1500px] mx-auto mb-14">

          <p className="uppercase tracking-[6px] text-xs text-[#7B614D] mb-4 font-semibold">
            Laundry Services
          </p>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">

            <div>
              <h1 className="text-4xl md:text-6xl font-serif leading-tight">
                Premium Laundry
                <br className="hidden md:block" />
                Services
              </h1>

              <p className="mt-5 text-[#6B4F3B] max-w-2xl leading-8">
                From everyday washing to premium garment care, choose the service that fits your needs.
              </p>
            </div>

            <div className="bg-[#F8F4ED] border border-[#E3D7C8] rounded-3xl px-7 py-5 shadow-[0_18px_45px_rgba(63,47,36,0.08)]">
              <p className="text-3xl font-serif">{services.length}+</p>
              <p className="text-xs uppercase tracking-[4px] text-[#7B614D] mt-1">
                Services
              </p>
            </div>

          </div>

        </section>

        <section className="max-w-[1500px] mx-auto grid md:grid-cols-2 xl:grid-cols-3 gap-7">

          {services.map((item) => (
            <article key={item.id} className="group bg-[#F8F4ED] border border-[#E3D7C8] rounded-[2rem] p-7 shadow-[0_20px_55px_rgba(63,47,36,0.08)] hover:shadow-[0_28px_70px_rgba(63,47,36,0.14)] hover:-translate-y-1 duration-300">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[4px] text-[#7B614D] font-bold mb-3">
                    Laundry Care
                  </p>

                  <h2 className="text-2xl font-serif leading-tight">
                    {item.name}
                  </h2>
                </div>

                <div className="w-14 h-14 rounded-full bg-[#E8DCCB] border border-[#CBB89B] flex items-center justify-center text-xl"> ✦ </div>

              </div>

              <p className="text-[#6B4F3B] mt-6 leading-7">
                {item.description}
              </p>

              <div className="mt-7 pt-6 border-t border-[#E3D7C8] flex items-center justify-between">

                <div>
                  <p className="text-xs uppercase tracking-[3px] text-[#7B614D]">
                    Starts From
                  </p>

                  <p className="text-2xl font-serif mt-1">
                    ₹{item.price}
                  </p>
                </div>


              </div>

            </article>

          ))}

        </section>

      </main>

      <Footer />
    </div>
  )
}

export default Services