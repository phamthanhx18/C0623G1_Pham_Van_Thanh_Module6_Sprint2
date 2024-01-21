import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api'; // Thay thế bằng URL của backend
const config = {withCredentials: true}
export const addToCart = async (item) => {
    return axios.post(`${API_BASE_URL}/cart/add`, item, {withCredentials: true});
};

export const updateCartItemQuantity = async (itemId, newQuantity) => {
    return axios.put(`${API_BASE_URL}/cart/update/${itemId}?newQuantity=${newQuantity}`, null, config);
};

export const removeFromCart = async (itemId) => {
    return axios.delete(`${API_BASE_URL}/cart/remove/${itemId}`, config);
};

export const checkOutCart = async (data) => {
    return axios.post(`${API_BASE_URL}/order`, data, config);

};
export const getCartItems = async () => {
    return axios.get(`${API_BASE_URL}/cart`, config);
};
