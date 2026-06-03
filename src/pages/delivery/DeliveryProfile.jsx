import React from "react";

function DeliveryProfile() {
  return (
    <div className="p-4">
      <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">

        <h2 className="text-xl font-semibold tracking-tight">
          Delivery Profile
        </h2>
    
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">

          <input className="input" type="text" placeholder="Shop Name" />
          <input className="input" type="text" placeholder="Owner Name" />
          <input className="input" type="email" placeholder="Email" />
          <input className="input" type="text" placeholder="Phone" />

        </div>
        <textarea rows="3" placeholder="Address" className="input w-full resize-none" />
        <div className="flex justify-end">
          <button className="btn"> Update Profile</button>
        </div>
      </div>
    </div>
  );
}

export default DeliveryProfile;