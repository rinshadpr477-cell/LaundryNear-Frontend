import React from 'react'

function ShopProfile() {
  return (
    <div className="p-6">

      <h2 className="text-3xl font-bold mb-6">
        Shop Profile
      </h2>

      <div className="bg-white rounded-xl shadow p-6">

        <div className="grid md:grid-cols-2 gap-4">

          <input type="text" placeholder="Shop Name" className="border p-3 rounded" />
          <input type="text" placeholder="Owner Name"  className="border p-3 rounded" />
          <input type="email"  placeholder="Email" className="border p-3 rounded"  />
          <input type="text"  placeholder="Phone" className="border p-3 rounded"  />

        </div>

        <textarea rows="4"  placeholder="Address" className="border p-3 rounded w-full mt-4" />

        <button className="bg-green-600 text-white px-6 py-3 rounded mt-4" >
          Update Profile
        </button>

      </div>

    </div>
  )
}

export default ShopProfile