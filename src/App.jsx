import { Routes, Route } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import { routeGuardContext } from "./context/AuthContext"


import Home from "./pages/public/Home"
import Auth from "./pages/public/Auth"
import Services from "./pages/public/Services"

import CustomerDashboard from "./pages/customer/CustomerDashboard"
import Shps from "./pages/customer/Shps"
import ShopDetails from "./pages/customer/ShopDetails"
import PlaceOrder from "./pages/customer/PlaceOrder"
import MyOrders from "./pages/customer/MyOrders"
import TrackOrder from "./pages/customer/TrackOrder"
import CustomerProfile from "./pages/customer/CustomerProfile"

import ShopDashboard from "./pages/shop/ShopDashboard"
import ShopOrders from "./pages/shop/ShopOrders"

import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminUsers from "./pages/admin/AdminUsers"
import AdminOrders from "./pages/admin/AdminOrders"
import AdminShops from "./pages/admin/AdminShops"
import AdminProfile from "./pages/admin/AdminProfile"



import PageNotFound from "./components/common/PageNotFound"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ShopProfile from "./pages/shop/ShopProfile"

import PaymentSuccess from "./pages/payment/PaymentSuccess"
import PaymentFailure from "./pages/payment/PaymentFailure"



function App() {

  const { role } = useContext(routeGuardContext)
  const existingUser = JSON.parse(
    sessionStorage.getItem("existingUser")
  )
  const currentRole = role || existingUser?.role

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/services" element={<Services />} />

        <Route path="/shps" element={<Shps />} />
        <Route path="/shop-details/:id" element={<ShopDetails />} />

        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failure" element={<PaymentFailure />} />

        {/* Customer Routes */}
        {currentRole === "customer" && (
          <>
            <Route path="/customer-dashboard" element={<CustomerDashboard />} />
            <Route path="/customer/place-order/:shopId" element={<PlaceOrder />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/customer/track-order/:id" element={<TrackOrder />} />
            <Route path="/customer-profile" element={<CustomerProfile />} />
          </>
        )}

        {/* Shop Routes */}
        {currentRole === "shop" && (
          <>
            <Route path="/shop-dashboard" element={<ShopDashboard />} />
            <Route path="/shop-orders" element={<ShopOrders />} />
            <Route path="/shop-profile" element={<ShopProfile />} />
          </>
        )}

        {/* Admin Routes */}
        {currentRole === "admin" && (
          <>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin-users" element={<AdminUsers />} />
            <Route path="/admin-orders" element={<AdminOrders />} />
            <Route path="/admin-shops" element={<AdminShops />} />
            <Route path="/admin-profile" element={<AdminProfile />} />
          </>
        )}

        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover={false}
        draggable
      />
    </>
  )
}

export default App