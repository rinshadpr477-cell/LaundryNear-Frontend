import React from 'react'

function StatusBadge({ status }) {
  const statusColors = {
    Pending: "bg-orange-100 text-orange-700",
    Accepted: "bg-blue-100 text-blue-700",
    "Picked Up": "bg-indigo-100 text-indigo-700",
    Processing: "bg-yellow-100 text-yellow-700",
    "Ready for Delivery": "bg-purple-100 text-purple-700",
    "Out for Delivery": "bg-pink-100 text-pink-700",
    Delivered: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700"
  }

  return (
    <span className={`px-4 py-2 rounded-full text-sm font-medium ${statusColors[status] || "bg-gray-100 text-gray-700"}`}>
      {status}
    </span>
  )
}

export default StatusBadge