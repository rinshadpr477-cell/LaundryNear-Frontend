import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../../components/common/Header'
import Footer from '../../components/common/Footer'
import { getSingleShopAPI } from '../../services/allAPI'

function ShopDetails() {

  const { id } = useParams()

  const [shop, setShop] = useState({})

  useEffect(() => {
    getShopDetails()
  }, [id])

  const getShopDetails = async () => {
    try {

      const result = await getSingleShopAPI(id)

      if (result.status === 200) {
        setShop(result.data)
      }

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F1EB] text-[#1A1A1A]">

      <Header />

      <main className="pt-32 px-6 md:px-10 pb-24">

        <section className="max-w-[1200px] mx-auto bg-[#F8F4ED] border border-[#E3D7C8] rounded-[2rem] p-8 md:p-12 shadow-[0_20px_55px_rgba(63,47,36,0.08)]">

          <p className="uppercase tracking-[5px] text-xs text-[#7B614D] mb-4 font-semibold">
            Laundry Partner
          </p>

          <h1 className="text-4xl md:text-6xl font-serif mb-6">
            {shop.shopName}
          </h1>

          <div className="grid md:grid-cols-2 gap-6 text-[#6B4F3B] leading-8">

            <p>
               <span className="font-semibold">Area :</span> {shop.area}
            </p>

            <p>
               <span className="font-semibold">Owner :</span> {shop.ownerName}
            </p>

            <p>
               <span className="font-semibold">Phone :</span> {shop.phone}
            </p>

            <p>
               <span className="font-semibold">Email :</span> {shop.email}
            </p>

          </div>

          <div className="mt-10 flex flex-wrap gap-4">

            <Link
              to={`/customer/place-order/${shop._id}`}
              className="bg-[#1A1A1A] text-white px-7 py-3 rounded-full text-xs font-bold uppercase tracking-[2px] hover:bg-[#3F2F24] duration-300"
            >
              Place Order
            </Link>

            <Link
              to="/shps"
              className="border border-[#1A1A1A] px-7 py-3 rounded-full text-xs font-bold uppercase tracking-[2px] hover:bg-[#1A1A1A] hover:text-white duration-300"
            >
              Back
            </Link>

          </div>

        </section>

      </main>

      <Footer />

    </div>
  )
}

export default ShopDetails