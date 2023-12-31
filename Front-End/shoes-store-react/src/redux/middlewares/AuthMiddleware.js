import * as authService from "../../services/AuthService";
import {USER_LOGIN, USER_LOGOUT} from "../constant";
export const loginUser = (account) => async (dispatch) => {
    try {
        await authService.login(account);
        dispatch({
            type: USER_LOGIN
        });
    } catch (error) {
        throw error;
    }
};
export const logOut = () => async (dispatch) => {
    try {
        await authService.logout();
        dispatch({
            type: USER_LOGOUT
        });
    } catch (error) {
        throw error;
    }
};