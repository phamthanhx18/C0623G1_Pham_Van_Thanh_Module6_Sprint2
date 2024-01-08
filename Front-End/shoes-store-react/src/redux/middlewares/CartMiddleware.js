import {ADD_TO_CART, CHECK_OUT, UPDATE_CART_QUANTITY} from "../constant";

export const addToCart = (item) => async (dispatch) => {
    dispatch({
        type: ADD_TO_CART,
        payload: item
    });
};
export const updateCartItemQuantity = (itemId, newQuantity) => ({
    type: UPDATE_CART_QUANTITY,
    payload: { itemId, newQuantity }
});
export const checkOutAll = () => ({
    type: CHECK_OUT,
    payload: null
});