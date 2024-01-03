import * as authService from "../../services/AuthService";
import {USER_LOGIN} from "../constant";

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