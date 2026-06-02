import React, { useEffect, useState } from 'react'
import Header from '../../components/common/Header'
import Footer from '../../components/common/Footer'
import { toast } from 'react-toastify'
import SERVER_URL from '../../services/serverURL'
import { FaCamera } from "react-icons/fa"
import { updateCustomerProfileAPI, updateCustomerPasswordAPI } from '../../services/allAPI'

function CustomerProfile() {

    const [customer, setCustomer] = useState({
        username: "",
        email: "",
        phone: "",
        address: "",
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
        const existingUser = JSON.parse(sessionStorage.getItem("existingUser"))

        if (existingUser) {
            setCustomer({
                username: existingUser.username || "",
                email: existingUser.email || "",
                phone: existingUser.phone || "",
                address: existingUser.address || "",
                profile: existingUser.profile || ""
            })
        }
    }, [])

    const handleProfileUpdate = async () => {
        const token = sessionStorage.getItem("token")

        const reqBody = new FormData()
        reqBody.append("username", customer.username)
        reqBody.append("phone", customer.phone)
        reqBody.append("address", customer.address)

        if (profileFile) {
            reqBody.append("profile", profileFile)
        }

        const reqHeader = {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
        }

        try {
            const result = await updateCustomerProfileAPI(reqBody, reqHeader)

            if (result.status === 200) {
                toast.success("Profile updated successfully")
                setCustomer(result.data)
                sessionStorage.setItem("existingUser", JSON.stringify(result.data))
                setPreview("")
                setProfileFile("")
            }
        } catch (err) {
            toast.error(err.response?.data || "Profile update failed")
        }
    }

    const handlePasswordUpdate = async () => {
        const token = sessionStorage.getItem("token")

        if (!passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
            toast.warning("Please fill all password fields")
        } else if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.warning("Passwords do not match")
        } else {
            const reqBody = {
                oldPassword: passwordData.oldPassword,
                newPassword: passwordData.newPassword
            }

            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }

            try {
                const result = await updateCustomerPasswordAPI(reqBody, reqHeader)

                if (result.status === 200) {
                    toast.success("Password changed successfully")

                    setPasswordData({
                        oldPassword: "",
                        newPassword: "",
                        confirmPassword: ""
                    })
                }
            } catch (err) {
                toast.error(err.response?.data || "Password update failed")
            }
        }
    }

    return (
        <div className="min-h-screen bg-[#F5F1EB] text-[#1A1A1A]">
            <Header />

            <main className="pt-32 px-6 md:px-10 pb-24">
                <section className="max-w-5xl mx-auto">

                    <p className="uppercase tracking-[5px] text-xs text-[#7B614D] mb-3">
                        Customer Account
                    </p>

                    <h1 className="text-4xl md:text-6xl font-serif mb-10">
                        My Profile
                    </h1>

                    <div className="grid lg:grid-cols-2 gap-8">

                        <div className="bg-[#F8F4ED] border border-[#E3D7C8] rounded-[2rem] p-8 shadow-[0_20px_55px_rgba(63,47,36,0.08)]">

                            <h2 className="text-2xl font-serif mb-6">
                                Profile Details
                            </h2>

                            <div className="flex items-center gap-6 mb-8">

                                <div className="relative">
                                    <div className="w-28 h-28 rounded-full bg-[#E8DCCB] flex items-center justify-center overflow-hidden text-4xl">
                                        {
                                            preview ?
                                                <img src={preview} alt="profile" className="w-full h-full object-cover" />
                                                :
                                                customer.profile ?
                                                    <img
                                                        src={`${SERVER_URL}/uploads/${customer.profile}`}
                                                        alt="profile"
                                                        className="w-full h-full object-cover"
                                                    />
                                                    :
                                                    "👤"
                                        }
                                    </div>

                                    <label className="absolute bottom-1 right-1 w-10 h-10 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center cursor-pointer hover:bg-[#3F2F24] duration-300 shadow-lg">
                                        <FaCamera />

                                        <input
                                            type="file"
                                            hidden
                                            onChange={(e) => {
                                                setProfileFile(e.target.files[0])
                                                setPreview(URL.createObjectURL(e.target.files[0]))
                                            }}
                                        />
                                    </label>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-serif">{customer.username || "Customer"}</h3>
                                    <p className="text-sm text-[#7B614D] mt-1">{customer.email}</p>
                                </div>

                            </div>

                            <div className="space-y-5">

                                <input
                                    type="text"
                                    value={customer.username}
                                    onChange={(e) => setCustomer({ ...customer, username: e.target.value })}
                                    placeholder="Name"
                                    className="w-full bg-white border border-[#E3D7C8] rounded-2xl px-5 py-4 outline-none"
                                />

                                <input
                                    type="email"
                                    value={customer.email}
                                    readOnly
                                    className="w-full bg-[#EEE7DD] border border-[#E3D7C8] rounded-2xl px-5 py-4 outline-none text-[#7B614D]"
                                />

                                <input
                                    type="text"
                                    value={customer.phone}
                                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                                    placeholder="Phone"
                                    className="w-full bg-white border border-[#E3D7C8] rounded-2xl px-5 py-4 outline-none"
                                />

                                <textarea
                                    value={customer.address}
                                    onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                                    placeholder="Address"
                                    rows="4"
                                    className="w-full bg-white border border-[#E3D7C8] rounded-2xl px-5 py-4 outline-none"
                                />

                                <button
                                    onClick={handleProfileUpdate}
                                    className="w-full bg-[#1A1A1A] text-white py-4 rounded-full hover:bg-[#3F2F24] duration-300"
                                >
                                    Update Profile
                                </button>

                            </div>
                        </div>

                        <div className="bg-[#F8F4ED] border border-[#E3D7C8] rounded-[2rem] p-8 shadow-[0_20px_55px_rgba(63,47,36,0.08)]">

                            <h2 className="text-2xl font-serif mb-6">
                                Change Password
                            </h2>

                            <div className="space-y-5">

                                <input
                                    type="password"
                                    value={passwordData.oldPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                                    placeholder="Old Password"
                                    className="w-full bg-white border border-[#E3D7C8] rounded-2xl px-5 py-4 outline-none"
                                />

                                <input
                                    type="password"
                                    value={passwordData.newPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                    placeholder="New Password"
                                    className="w-full bg-white border border-[#E3D7C8] rounded-2xl px-5 py-4 outline-none"
                                />

                                <input
                                    type="password"
                                    value={passwordData.confirmPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                    placeholder="Confirm Password"
                                    className="w-full bg-white border border-[#E3D7C8] rounded-2xl px-5 py-4 outline-none"
                                />

                                <button
                                    onClick={handlePasswordUpdate}
                                    className="w-full bg-[#1A1A1A] text-white py-4 rounded-full hover:bg-[#3F2F24] duration-300"
                                >
                                    Update Password
                                </button>

                            </div>
                        </div>

                    </div>

                </section>
            </main>

            <Footer />
        </div>
    )
}

export default CustomerProfile