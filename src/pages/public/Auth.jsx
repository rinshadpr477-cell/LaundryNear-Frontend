import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../../components/common/Header"
import { loginAPI, registerAPI, googleLoginAPI } from "../../services/allAPI"
import { GoogleLogin } from "@react-oauth/google"
import { jwtDecode } from "jwt-decode"
import { routeGuardContext } from "../../context/AuthContext"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function Auth() {

    const navigate = useNavigate()

    const [isLogin, setIsLogin] = useState(true)

    const { setRole, setAuthorisedUser } = useContext(routeGuardContext)

    const [reqBody, setReqBody] = useState({
        username: "",
        email: "",
        password: "",
        role: "customer"
    })

    const handleRegister = async () => {
        const { username, email, password, role } = reqBody
        if (!username || !email || !password || !role) {
            toast.warning("Please fill all fields")
        } else {
            try {
                const result = await registerAPI(reqBody)
                if (result.status === 200) {
                    toast.success("Registration Successful")
                    setIsLogin(true)
                    setReqBody({
                        username: "",
                        email: "",
                        password: "",
                        role: "customer"
                    })
                }
            } catch (err) {
                toast.error(err.response?.data || "Registration Failed")
            }
        }
    }

    const handleLogin = async () => {
        const { email, password } = reqBody
        if (!email || !password) {
            toast.warning("Please fill all fields")
        } else {
            try {
                const result = await loginAPI(reqBody)
                if (result.status === 200) {
                    toast.success("Login Successful")
                    sessionStorage.setItem(
                        "existingUser",
                        JSON.stringify(result.data.user)
                    )
                    sessionStorage.setItem(
                        "token",
                        result.data.token
                    )
                    const role = result.data.user.role
                    setRole(role)
                    setAuthorisedUser(true)

                    setTimeout(() => {
                        if (role === "customer") {
                            navigate("/customer-dashboard")
                        }
                        else if (role === "shop") {
                            navigate("/shop-dashboard")
                        }

                        else if (role === "admin") {
                            navigate("/admin-dashboard")
                        }

                    }, 1000)
                }
            } catch (err) {
                toast.error(err.response?.data || "Login Failed")
            }
        }
    }

    const handleGoogleLogin = async (credentialResponse) => {
        const details = jwtDecode(
            credentialResponse.credential
        )
        try {
            const result = await googleLoginAPI({
                username: details.name,
                email: details.email,
                password: "googlepswd",
                profile: details.picture,
                role: "customer"
            })
            if (result.status === 200) {
                toast.success("Google Login Successful")
                sessionStorage.setItem(
                    "existingUser",
                    JSON.stringify(result.data.user)
                )
                sessionStorage.setItem(
                    "token",
                    result.data.token
                )
                setRole("customer")
                setAuthorisedUser(true)
                setTimeout(() => {
                    navigate("/customer-dashboard")
                }, 1000)
            }
        } catch (err) {
            toast.error("Google Login Failed")
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#F5F1EB] via-[#EFE7DC] to-[#D8C3A5] flex items-center justify-center px-6 py-20">
            <Header />

            <div className="relative w-full max-w-xl rounded-[36px] bg-white/35 backdrop-blur-2xl border border-white/40 px-10 py-14 md:px-16 shadow-[0_40px_140px_rgba(63,47,36,0.20)] overflow-hidden">
                <div className="absolute inset-0 rounded-[36px] bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>
                <p className="relative text-center text-[#6B4F3B] tracking-[6px] text-xs font-bold uppercase mb-5">
                    Laundry Near
                </p>
                <h1 className="relative text-5xl md:text-6xl font-serif tracking-[7px] text-center text-[#1A1A1A] mb-5">
                    {isLogin ? "LOGIN" : "REGISTER"}
                </h1>

                <p className="relative text-center text-[#6B4F3B] mb-10">
                    {isLogin
                        ? "Access your laundry pickup and delivery account"
                        : "Create your Laundry Near account"}
                </p>

                {!isLogin && (
                    <>
                        <input type="text" placeholder="Name" value={reqBody.username} onChange={(e) => setReqBody({ ...reqBody, username: e.target.value })} className="w-full rounded-2xl border border-[#D8CBB8] bg-white/45 px-6 py-5 mb-5 outline-none" />
                        <select value={reqBody.role} onChange={(e) => setReqBody({ ...reqBody, role: e.target.value })} className="w-full rounded-2xl border border-[#D8CBB8] bg-white/45 px-6 py-5 mb-5 outline-none"  >
                            <option value="customer">Customer</option>
                            <option value="shop">Shop Owner</option>
                        </select>
                    </>
                )}
                <input type="email" placeholder="Email" value={reqBody.email} onChange={(e) => setReqBody({ ...reqBody, email: e.target.value })} className="w-full rounded-2xl border border-[#D8CBB8] bg-white/45 px-6 py-5 mb-5 outline-none" />
                <input type="password" placeholder="Password" value={reqBody.password} onChange={(e) => setReqBody({ ...reqBody, password: e.target.value })} className="w-full rounded-2xl border border-[#D8CBB8] bg-white/45 px-6 py-5 mb-8 outline-none" />

                {isLogin ? (
                    <button onClick={handleLogin} className="w-full rounded-2xl bg-[#1A1A1A] text-white py-5 tracking-[4px] text-xs font-bold uppercase hover:bg-[#3F2F24] duration-300"  >    Login
                    </button>
                ) : (
                    <button onClick={handleRegister} className="w-full rounded-2xl bg-[#1A1A1A] text-white py-5 tracking-[4px] text-xs font-bold uppercase hover:bg-[#3F2F24] duration-300" > Create Account
                    </button>
                )}

                {isLogin && (
                    <>
                        <div className="flex items-center gap-3 my-6">
                            <div className="flex-1 h-px bg-[#D8CBB8]"></div>
                            <span className="text-sm text-[#6B4F3B]">OR</span>
                            <div className="flex-1 h-px bg-[#D8CBB8]"></div>
                        </div>

                        <div className="flex justify-center">
                            <GoogleLogin onSuccess={handleGoogleLogin} onError={() => toast.error("Google Login Failed")} />
                        </div>
                    </>
                )}

                <p className="text-center text-sm text-[#6B4F3B] mt-10">
                    {isLogin
                        ? "Don't have an account?"
                        : "Already have an account?"}
                    <button onClick={() => setIsLogin(!isLogin)} className="ml-2 font-semibold text-[#1A1A1A]" >
                        {isLogin ? "Register" : "Login"}
                    </button>
                </p>

            </div>


        </div>
    )
}

export default Auth