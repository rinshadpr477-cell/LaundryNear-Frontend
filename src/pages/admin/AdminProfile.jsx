import React, { useEffect, useState, useContext } from 'react'
import AdminSidebar from './AdminSidebar'
import DashboardHeader from '../../components/common/DashboardHeader'
import { toast } from 'react-toastify'
import SERVER_URL from '../../services/serverURL'
import { FaCamera } from "react-icons/fa"

// import { updateAdminProfileAPI,  updateAdminPasswordAPI
// } from '../../services/allAPI'

// import { adminProfileUpdateStatusContext} from '../../context/ContextShare'

function AdminProfile() {

  // const { setAdminProfileUpdateStatus } = useContext(
  //   adminProfileUpdateStatusContext
  // )

  const [admin, setAdmin] = useState({
    username: "",
    email: "",
    phone: "",
    profile: ""
  })

  const [profileFile, setProfileFile] = useState("")
  const [preview, setPreview] = useState("")

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  useEffect(() => {

    const existingUser = JSON.parse(
      sessionStorage.getItem("existingUser")
    )

    if (existingUser) {
      setAdmin({
        username: existingUser.username || "",
        email: existingUser.email || "",
        phone: existingUser.phone || "",
        profile: existingUser.profile || ""
      })
    }

  }, [])

  const handleProfileUpdate = async () => {

    const token = sessionStorage.getItem("token")

    const reqBody = new FormData()

    reqBody.append("username", admin.username)
    reqBody.append("phone", admin.phone)

    if (profileFile) {
      reqBody.append("profile", profileFile)
    }

    const reqHeader = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`
    }

    try {

      const result = await updateAdminProfileAPI(
        reqBody,
        reqHeader
      )

      if (result.status === 200) {

        toast.success("Profile updated successfully")

        setAdmin(result.data)

        sessionStorage.setItem(
          "existingUser",
          JSON.stringify(result.data)
        )

        setAdminProfileUpdateStatus(result.data)

        setPreview("")
        setProfileFile("")
      }

    } catch (err) {

      toast.error(
        err.response?.data || "Profile update failed"
      )

    }
  }

  const handlePasswordUpdate = async () => {

    const token = sessionStorage.getItem("token")

    if (
      !passwordData.oldPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      toast.warning("Please fill all fields")
      return
    }

    if (
      passwordData.newPassword !==
      passwordData.confirmPassword
    ) {
      toast.warning("Passwords do not match")
      return
    }

    const reqBody = {
      oldPassword: passwordData.oldPassword,
      newPassword: passwordData.newPassword
    }

    const reqHeader = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }

    try {

      const result = await updateAdminPasswordAPI(
        reqBody,
        reqHeader
      )

      if (result.status === 200) {

        toast.success("Password updated successfully")

        setPasswordData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: ""
        })
      }

    } catch (err) {

      toast.error(
        err.response?.data || "Password update failed"
      )

    }
  }

  return (
    <div className="min-h-screen bg-[#F5F1EB]">

      <AdminSidebar />

      <main className="lg:ml-[260px] min-h-screen">

        <DashboardHeader
          title="Admin Profile"
        />

        <div className="p-8">

          <div className="grid lg:grid-cols-2 gap-8">

            <div className="bg-white border border-[#E3D7C8] rounded-3xl p-8">

              <h2 className="text-2xl font-bold mb-6">
                Profile Details
              </h2>

              <div className="flex items-center gap-6 mb-8">

                <div className="relative">

                  <div className="w-28 h-28 rounded-full overflow-hidden bg-[#F5F1EB] flex items-center justify-center">

                    {
                      preview ?

                        <img
                          src={preview}
                          alt=""
                          className="w-full h-full object-cover"
                        />

                        :

                        admin.profile ?

                          <img
                            src={`${SERVER_URL}/uploads/${admin.profile}`}
                            alt=""
                            className="w-full h-full object-cover"
                          />

                          :

                          "👤"
                    }

                  </div>

                  <label className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center cursor-pointer">

                    <FaCamera />

                    <input
                      hidden
                      type="file"
                      onChange={(e) => {

                        setProfileFile(
                          e.target.files[0]
                        )

                        setPreview(
                          URL.createObjectURL(
                            e.target.files[0]
                          )
                        )
                      }}
                    />

                  </label>

                </div>

                <div>

                  <h3 className="text-2xl font-bold">
                    {admin.username}
                  </h3>

                  <p className="text-gray-500">
                    {admin.email}
                  </p>

                </div>

              </div>

              <div className="space-y-5">

                <input
                  type="text"
                  value={admin.username}
                  onChange={(e) =>
                    setAdmin({
                      ...admin,
                      username: e.target.value
                    })
                  }
                  placeholder="Username"
                  className="w-full border border-[#E3D7C8] rounded-2xl px-5 py-4 outline-none"
                />

                <input
                  type="email"
                  value={admin.email}
                  readOnly
                  className="w-full bg-gray-100 border border-[#E3D7C8] rounded-2xl px-5 py-4"
                />

                <input
                  type="text"
                  value={admin.phone}
                  onChange={(e) =>
                    setAdmin({
                      ...admin,
                      phone: e.target.value
                    })
                  }
                  placeholder="Phone"
                  className="w-full border border-[#E3D7C8] rounded-2xl px-5 py-4 outline-none"
                />

                <button
                  onClick={handleProfileUpdate}
                  className="w-full bg-black text-white py-4 rounded-full"
                >
                  Update Profile
                </button>

              </div>

            </div>

            <div className="bg-white border border-[#E3D7C8] rounded-3xl p-8">

              <h2 className="text-2xl font-bold mb-6">
                Change Password
              </h2>

              <div className="space-y-5">

                <input
                  type="password"
                  value={passwordData.oldPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      oldPassword: e.target.value
                    })
                  }
                  placeholder="Old Password"
                  className="w-full border border-[#E3D7C8] rounded-2xl px-5 py-4"
                />

                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value
                    })
                  }
                  placeholder="New Password"
                  className="w-full border border-[#E3D7C8] rounded-2xl px-5 py-4"
                />

                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value
                    })
                  }
                  placeholder="Confirm Password"
                  className="w-full border border-[#E3D7C8] rounded-2xl px-5 py-4"
                />

                <button
                  onClick={handlePasswordUpdate}
                  className="w-full bg-black text-white py-4 rounded-full"
                >
                  Update Password
                </button>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  )
}

export default AdminProfile