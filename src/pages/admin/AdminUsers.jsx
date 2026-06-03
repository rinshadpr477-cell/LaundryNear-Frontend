import React, { useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar'
import { adminAllUsersAPI } from '../../services/allAPI'
import { FaUsers } from "react-icons/fa"
import { toast } from 'react-toastify'

function AdminUsers() {

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

 
  const getAllUsers = async () => {

    const token = sessionStorage.getItem("token")
    if (!token) {
      toast.error("Unauthorized access")
      return
    }
    try {
      setLoading(true)
      const reqHeader = {
        Authorization: `Bearer ${token}`
      }
      const result = await adminAllUsersAPI(reqHeader)
      if (result.status === 200) {
        setUsers(result.data || [])
      } else {
        toast.error("Failed to fetch users")
      }
    } catch (err) {
      console.log(err)
      toast.error("Server error while fetching users")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllUsers()
  }, [])

 
  return (
    <div className="min-h-screen bg-[#F5F1EB]">

      <AdminSidebar />

      <main className="lg:ml-[260px] px-8 py-8">

        {/* HEADER */}
        <div className="mb-8 bg-white border border-[#E6DDD2] rounded-3xl p-7">

          <p className="uppercase tracking-[5px] text-xs text-[#7B614D] mb-3">
            Admin Panel
          </p>

          <h1 className="text-4xl font-bold text-[#1A1A1A]">
            Manage Users
          </h1>

          <p className="text-[#6B4F3B] mt-3">
            View all registered users on the platform.
          </p>

        </div>

        {/* TABLE */}
        <div className="bg-white border border-[#E3D7C8] rounded-3xl overflow-hidden">

          {/* TITLE */}
          <div className="px-6 py-5 border-b border-[#E3D7C8] flex items-center gap-3">
            <FaUsers className="text-[#3F2F24]" />
            <h2 className="text-2xl font-bold text-[#1A1A1A]">
              All Users
            </h2>
          </div>

          {/* LOADING */}
          {loading ? (
            <div className="p-10 text-center text-[#6B4F3B]">
              Loading users...
            </div>
          ) : users.length === 0 ? (
            <div className="p-10 text-center text-[#6B4F3B]">
              No users found
            </div>
          ) : (

            <div className="overflow-x-auto">

              <table className="w-full text-left">

                <thead className="bg-[#FAF7F2]">
                  <tr>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Role</th>
                  </tr>
                </thead>

                <tbody>

                  {users.map((item) => (
                    <tr key={item._id}   className="border-t border-[#EFE6DA] hover:bg-[#FAF7F2]" >

                      <td className="px-6 py-4 font-semibold">
                        {item.username}
                      </td>

                      <td className="px-6 py-4">
                        {item.email}
                      </td>

                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full bg-[#F5F1EB] text-[#3F2F24] text-xs font-semibold">
                          {item.role}
                        </span>
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </main>

    </div>
  )
}

export default AdminUsers