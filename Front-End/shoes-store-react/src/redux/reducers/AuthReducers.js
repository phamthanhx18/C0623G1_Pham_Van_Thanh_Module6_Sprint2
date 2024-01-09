import {USER_LOGIN, USER_LOGOUT} from "../constant";

export const authReducer = (auth = false, action) => {
    const { type } = action;
    switch (type) {
        case USER_LOGIN:
            return true;
        case USER_LOGOUT:
            return false;
        default:
            return auth;
    }
};
