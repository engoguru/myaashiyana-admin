import axios from "axios";
import { base_url } from "../../utils/base_url";

export const addAddress = async(addressData) => {
    const response = await axios.post(`${base_url}/address/`, addressData);
    return response.data;
};

export const allAddress = async() => {
    const response = await axios.get(`${base_url}/address/all`);
    return response.data;
};

export const singleAddress = async(id) => {
    const response = await axios.get(`${base_url}/address/single/${id}`);
    return response.data;
};

export const putAddress = async(address) => {
    const response = await axios.put(`${base_url}/address/update/${address.id}`, 
    {
        title : address.addressData.title,
    }
);
    return response.data;
};

export const deleteAddress = async(id) => {
    const response = await axios.delete(`${base_url}/address/delete/${id}`);
    return response.data;
};


const addressService = {
    addAddress,
    allAddress,
    singleAddress,
    putAddress,
    deleteAddress
}

export default addressService;