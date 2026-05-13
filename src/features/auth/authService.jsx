import axios from 'axios';
import { base_url } from '../../utils/base_url';

export const adminSignup = async (user) => {
    const response = await axios.post(`${base_url}/auth/register`, user);
    return response.data;
};

export const adminLogin = async (user) => {
    const response = await axios.post(`${base_url}/auth/login__admin`, user, { withCredentials: true });
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
}

export const allUsers = async () => {
    const response = await axios.get(`${base_url}/auth/all`);
    return response.data;
}

export const deleteUser = async (id) => {
    const response = await axios.delete(`${base_url}/auth/delete/${id}`);
    return response.data;
}

const authService = {
    adminSignup,
    adminLogin,
    allUsers,
    deleteUser
};

export default authService;