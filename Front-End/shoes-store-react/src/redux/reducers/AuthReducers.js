import {USER_LOGIN} from "../constant";

export const authReducer = (auth = false, action) => {
    const { type } = action;
    switch (type) {
        case USER_LOGIN:
            return true;
        default:
            return auth;
    }
};
