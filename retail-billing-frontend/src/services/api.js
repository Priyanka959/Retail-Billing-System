import axios from "axios";
const API_BASE_URL = "http://localhost:8080";

// Customer API
export const getCustomers = () => axios.get(`${API_BASE_URL}/customer`);

// Invoice API
export const getInvoices = () => axios.get(`${API_BASE_URL}/invoices`);

// Invoice Items API
export const getInvoiceItems = () => axios.get(`${API_BASE_URL}/invoice-items`);

// Product API
export const getProducts = () => axios.get(`${API_BASE_URL}/product`);

// Login API
export const loginUser = (loginData) => axios.post(`${API_BASE_URL}/login`, loginData);
//register
export const registerUser = (userData) => axios.post(`${API_BASE_URL}/login/register`, userData);
