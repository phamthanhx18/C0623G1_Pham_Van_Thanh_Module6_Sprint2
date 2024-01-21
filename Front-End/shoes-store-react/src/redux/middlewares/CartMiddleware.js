import {ADD_TO_CART, CHECK_OUT, REMOVE_FROM_CART, SET_CART_ITEMS, UPDATE_CART_QUANTITY} from "../constant";
import * as cartService from "../../services/CartService";

export const setCartItems = () => async (dispatch) => {
    try {
        let res = await cartService.getCartItems();
        console.log(res.data)
        dispatch({
            type: SET_CART_ITEMS,
            payload: res.data
        });
    } catch (error) {
        // Xử lý lỗi
    }
};

export const addToCart = (item) => async (dispatch) => {
    try {
        await cartService.addToCart(item);
        dispatch({
            type: ADD_TO_CART,
            payload: item
        });
    } catch (error) {
        // Xử lý lỗi
    }
};

export const updateCartItemQuantity = (itemId, newQuantity) => async (dispatch) => {
    try {
        await cartService.updateCartItemQuantity(itemId, newQuantity);
        dispatch({
            type: UPDATE_CART_QUANTITY,
            payload: { itemId, newQuantity }
        });
    } catch (error) {
        // Xử lý lỗi
    }
};

export const removeFromCart = (item) => async (dispatch) => {
    try {
        await cartService.removeFromCart(item.id);
        dispatch({
            type: REMOVE_FROM_CART,
            payload: item
        });
    } catch (error) {
        // Xử lý lỗi
    }
};

export const checkOutAll = (data) => async (dispatch) => {
    try {
        let res = await cartService.checkOutCart(data);
        dispatch({
            type: CHECK_OUT,
            payload: null
        });
        return res;
    } catch (error) {
        // Xử lý lỗi
    }
};
