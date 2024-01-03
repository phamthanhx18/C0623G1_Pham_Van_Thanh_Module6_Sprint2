import axios from "axios";
export const login = async (account) => {
    try {
        await axios.post("http://localhost:8080/api/login", account, { withCredentials: true });
        return true;
    } catch (e) {
        throw false;
    }
};

export const checkAuthentication = async () => {
    try {
        await axios.get("http://localhost:8080/api/check-auth", { withCredentials: true });
        return true;
    } catch (error) {
        throw error;
    }
}
