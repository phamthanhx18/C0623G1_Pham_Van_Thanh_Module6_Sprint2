import {ADD_TO_CART, CHECK_OUT, REMOVE_FROM_CART, UPDATE_CART_QUANTITY} from "../constant";

const initialState = {
    items: [] // giả sử items là mảng các sản phẩm, mỗi sản phẩm có { variant, size_variant, quantity }
};

export const cartReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case ADD_TO_CART: {
            const existingItemIndex = state.items.findIndex(
                item => item.variant.id === payload.variant.id && item.size_variant.id === payload.size_variant.id
            );
            if (existingItemIndex >= 0) {
                const newItems = [...state.items];
                newItems[existingItemIndex] = {
                    ...newItems[existingItemIndex],
                    quantity: newItems[existingItemIndex].quantity + payload.quantity
                };
                return {...state, items: newItems};
            } else {
                return {...state, items: [...state.items, payload]};
            }
        }
        case REMOVE_FROM_CART: {
            const newItems = state.items.filter(
                item => !(item.variant === payload.variant && item.size_variant === payload.size_variant)
            );
            return {...state, items: newItems};
        }
        case UPDATE_CART_QUANTITY: {
            const newItems = state.items.map(item => {
                if (item.variant.id === payload.itemId.variant.id && item.size_variant.id === payload.itemId.size_variant.id) {
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
