import {ADD_TO_CART, CHECK_OUT, REMOVE_FROM_CART, SET_CART_ITEMS, UPDATE_CART_QUANTITY} from "../constant";

const initialState = {
    items: []
};

export const cartReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case SET_CART_ITEMS:
            return {...state, items: payload};
        case ADD_TO_CART: {
            const existingItemIndex = state.items.findIndex(
                item => item.productVariant.id === payload.productVariant.id && item.sizeVariant.size.id === payload.sizeVariant.size.id
            );

            if (existingItemIndex >= 1) {
                // Sử dụng map để tạo một mảng mới và cập nhật số lượng cho sản phẩm đã tồn tại
                const updatedItems = state.items.map((item, index) =>
                    index === existingItemIndex ? {...item, quantity: item.quantity + payload.quantity} : item
                );
                return {...state, items: updatedItems};
            } else {
                return {...state, items: [...state.items, payload]};
            }
        }
        case REMOVE_FROM_CART: {
            const newItems = state.items.filter(item => !(item.productVariant.id === payload.productVariant.id && item.sizeVariant.id === payload.sizeVariant.id));
            return {...state, items: newItems};
        }
        case UPDATE_CART_QUANTITY: {
            const newItems = state.items.map(item => {
                if (item.id === payload.itemId) {
                    return {...item, quantity: payload.newQuantity};
                }
                return item;
            });
            return {...state, items: newItems};
        }
        case CHECK_OUT:
            return {
                ...state,
                items: []
            };

        default:
            return state;
    }
};
