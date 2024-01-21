import axios from "axios";
export const login = async (account) => {
    try {
        await axios.post("http://localhost:8080/api/login", account, { withCredentials: true });
        return true;
    } catch (e) {
        throw false;
    }
};

export const logout = async () => {
    try {
        await axios.post("http://localhost:8080/api/logout", null, { withCredentials: true });
        return true;
    } catch (e) {
        throw false;
    }
};

export const checkAuthentication = async () => {
    try {
        let res = await axios.get("http://localhost:8080/api/check-auth", { withCredentials: true });
        return res.data;
    } catch (error) {
        throw error;
    }
}
