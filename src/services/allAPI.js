import commonAPI from "./commonAPI"
import SERVER_URL from "./serverURL"

// register api
export const registerAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVER_URL}/register`, reqBody)
}

// login api
export const loginAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVER_URL}/login`, reqBody)
}

// googleLogin

export const googleLoginAPI = async(reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/google-login`,reqBody)
}

// add shop

export const addShopAPI = async(reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/add-shop`,reqBody)
}

// get all shops

export const getAllShopsAPI = async()=>{
    return await commonAPI("GET",`${SERVER_URL}/all-shops`)
}

// get single shop

export const getSingleShopAPI = async(id)=>{
    return await commonAPI("GET",`${SERVER_URL}/view-shop/${id}`)
}

// place order 

export const placeOrderAPI = async (reqBody, reqHeader) => {
    return await commonAPI("POST", `${SERVER_URL}/place-order`, reqBody, reqHeader)
}

// customer orders 

export const customerOrdersAPI = async (reqHeader) => {
    return await commonAPI("GET", `${SERVER_URL}/customer-orders`, "", reqHeader)
}

// single order 

export const singleOrderAPI = async (id, reqHeader) => {
    return await commonAPI("GET", `${SERVER_URL}/view-order/${id}`, "", reqHeader)
}

// shop orders

export const shopOrdersAPI = async (reqHeader) => {
    return await commonAPI("GET", `${SERVER_URL}/shop/orders`, "", reqHeader)
}

// accept order

export const acceptOrderAPI = async (id, reqHeader) => {
    return await commonAPI("PUT", `${SERVER_URL}/shop/order/accept/${id}`, {}, reqHeader)
}

// update order status

export const updateOrderStatusAPI = async (id, reqBody, reqHeader) => {
    return await commonAPI("PUT", `${SERVER_URL}/shop/order/status/${id}`, reqBody, reqHeader)
}

// admin dashboard count

export const adminDashboardCountAPI = async (reqHeader) => {
    return await commonAPI("GET", `${SERVER_URL}/admin/dashboard-count`, "", reqHeader)
}

// admin all users

export const adminAllUsersAPI = async (reqHeader) => {
    return await commonAPI("GET", `${SERVER_URL}/admin/users`, "", reqHeader)
}

// admin all orders

export const adminAllOrdersAPI = async (reqHeader) => {
    return await commonAPI("GET", `${SERVER_URL}/admin/orders`, "", reqHeader)
}

// delivery orders

export const deliveryOrdersAPI = async (reqHeader) => {
    return await commonAPI("GET", `${SERVER_URL}/delivery/orders`, "", reqHeader)
}

// pickup order

export const pickupOrderAPI = async (id, reqHeader) => {
    return await commonAPI("PUT", `${SERVER_URL}/delivery/order/pickup/${id}`, {}, reqHeader)
}

// deliver order

export const deliverOrderAPI = async (id, reqHeader) => {
    return await commonAPI("PUT", `${SERVER_URL}/delivery/order/deliver/${id}`, {}, reqHeader)
}

export const updateCustomerProfileAPI = async(reqBody,reqHeader)=>{
  return await commonAPI("PUT",`${SERVER_URL}/customer/profile-update`,reqBody,reqHeader)
}

export const updateCustomerPasswordAPI = async(reqBody,reqHeader)=>{
  return await commonAPI("PUT",`${SERVER_URL}/customer/change-password`,reqBody,reqHeader)
}