import React, { useState } from 'react'
import { addShopAPI } from '../../services/allAPI'
import { toast } from 'react-toastify'

function ShopProfile() {

  const [shopData, setShopData] = useState({
    shopName: "",
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    area: "",
    services: []
  })

  const handleSubmit = async () => {
    const {
      shopName,
      ownerName,
      email,
      phone,
      address,
      area
    } = shopData
    if (!shopName || !ownerName || !email || !phone || !address || !area) {
      toast.warning("Please fill all fields")
      return
    }
    try {
      const result = await addShopAPI(shopData)
      if (result.status === 200) {
        toast.success("Shop profile added successfully")
        setShopData({
          shopName: "",
          ownerName: "",
          email: "",
          phone: "",
          address: "",
          area: "",
          services: []
        })
      } else {
        toast.error(result.response?.data || "Failed to add shop")
      }
    } catch (err) {
      console.log(err)
      toast.error("Something went wrong")
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">
        Shop Profile
      </h2>
      <div className="bg-white rounded-xl shadow p-6">
        <div className="grid md:grid-cols-2 gap-4">

          <input type="text" placeholder="Shop Name" className="border p-3 rounded" value={shopData.shopName} onChange={(e) => setShopData({...shopData, shopName: e.target.value }) }/>
          <input type="text"  placeholder="Owner Name" className="border p-3 rounded" value={shopData.ownerName} onChange={(e) =>setShopData({ ...shopData, ownerName: e.target.value }) } />
          <input type="email" placeholder="Email" className="border p-3 rounded" value={shopData.email} onChange={(e) => setShopData({ ...shopData,email: e.target.value })} />
          <input  type="text" placeholder="Phone" className="border p-3 rounded" value={shopData.phone} onChange={(e) => setShopData({...shopData,phone: e.target.value })}  />

        </div>

        <textarea rows="4" placeholder="Address" className="border p-3 rounded w-full mt-4" value={shopData.address} onChange={(e) => setShopData({ ...shopData,address: e.target.value }) } />
        <input type="text" placeholder="Area" className="border p-3 rounded w-full mt-4" value={shopData.area} onChange={(e) => setShopData({ ...shopData, area: e.target.value }) } />

        <button onClick={handleSubmit}className="bg-green-600 text-white px-6 py-3 rounded mt-4" > Update Profile </button>

      </div>

    </div>
  )
}

export default ShopProfile