import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../components/common/Footer'
import DashboardHeader from '../../components/common/DashboardHeader'
import { getAllShopsAPI } from '../../services/allAPI'
import { searchKeyContext } from '../../context/ContextShare'

function Shps() {

  const [allShops, setAllShops] = useState([])

  const { searchKey } = useContext(searchKeyContext)

  const token = sessionStorage.getItem("token")

  useEffect(() => {
    getShops()
  }, [])

  const getShops = async () => {

    try {

      const result = await getAllShopsAPI()

      if (result.status === 200) {
        setAllShops(result.data)
      }

    } catch (err) {
      console.log(err)
    }
  }

  const filteredShops = allShops.filter((item) =>
    item.shopName?.toLowerCase().includes(searchKey.toLowerCase()) ||
    item.area?.toLowerCase().includes(searchKey.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#F5F1EB] text-[#1A1A1A]">

      {
        token &&
        <DashboardHeader
          title="Laundry Shops"
          showSearch={true}
        />
      }

      <main className="pt-10 px-6 md:px-10 pb-24">

        {
          !token ?

            <div className="max-w-3xl mx-auto mt-24 bg-[#F8F4ED] border border-[#E3D7C8] rounded-[2rem] p-12 text-center shadow-[0_20px_55px_rgba(63,47,36,0.08)]">

              <h2 className="text-4xl font-serif mb-4">
                Login Required
              </h2>

              <p className="text-[#6B4F3B] leading-8 mb-8">
                Please login to view available laundry shops and place orders.
              </p>

              <Link
                to="/auth"
                className="inline-block bg-[#1A1A1A] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#3F2F24] duration-300"
              >
                Login Now
              </Link>

            </div>

            :

            <>
              <section className="max-w-[1500px] mx-auto mb-14 mt-8">

                <p className="uppercase tracking-[6px] text-xs text-[#7B614D] mb-4 font-semibold">
                  Nearby Laundry Shops
                </p>

                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">

                  <div>

                    <h1 className="text-4xl md:text-6xl font-serif leading-tight">
                      Trusted Laundry
                      <br className="hidden md:block" />
                      Partners Near You
                    </h1>

                    <p className="text-[#6B4F3B] mt-5 max-w-2xl leading-8">
                      Browse premium laundry shops and choose the best service available in your area.
                    </p>

                  </div>

                  <div className="bg-[#F8F4ED] border border-[#E3D7C8] rounded-3xl px-7 py-5 shadow-[0_18px_45px_rgba(63,47,36,0.08)]">

                    <p className="text-3xl font-serif">
                      {filteredShops.length}
                    </p>

                    <p className="text-xs uppercase tracking-[4px] text-[#7B614D] mt-1">
                      Active Shops
                    </p>

                  </div>

                </div>

              </section>

              <section className="max-w-[1500px] mx-auto grid md:grid-cols-2 xl:grid-cols-3 gap-7">

                {
                  filteredShops.length > 0 ?

                    filteredShops.map((item) => (

                      <article
                        key={item._id}
                        className="group bg-[#F8F4ED] border border-[#E3D7C8] rounded-[2rem] p-7 shadow-[0_20px_55px_rgba(63,47,36,0.08)] hover:shadow-[0_28px_70px_rgba(63,47,36,0.14)] hover:-translate-y-1 duration-300"
                      >

                        <div className="flex items-start justify-between gap-4">

                          <div>

                            <p className="text-[10px] uppercase tracking-[4px] text-[#7B614D] font-bold mb-3">
                              Laundry Partner
                            </p>

                            <h2 className="text-2xl font-serif">
                              {item.shopName}
                            </h2>

                          </div>

                          <div className="w-14 h-14 rounded-full bg-[#E8DCCB] border border-[#CBB89B] flex items-center justify-center text-xl">
                            
                          </div>

                        </div>

                        <div className="mt-7 space-y-3 text-[#6B4F3B]">

                          <p> {item.area}</p>
                          <p> {item.ownerName}</p>
                          <p> {item.phone}</p>

                        </div>

                        <div className="mt-7 pt-6 border-t border-[#E3D7C8] flex items-center justify-between">

                          <p className="text-xs uppercase tracking-[3px] text-[#7B614D]">
                            Fast Pickup
                          </p>

                          <Link
                            to={`/shop-details/${item._id}`}
                            className="bg-[#1A1A1A] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-[2px] hover:bg-[#3F2F24] duration-300"
                          >
                            View Details
                          </Link>

                        </div>

                      </article>

                    ))

                    :

                    <div className="col-span-full text-center py-20">

                      <h2 className="text-3xl font-serif mb-3">
                        No Shops Found
                      </h2>

                      <p className="text-[#6B4F3B]">
                        Try searching with another keyword.
                      </p>

                    </div>
                }

              </section>
            </>
        }

      </main>

      <Footer />

    </div>
  )
}

export default Shps