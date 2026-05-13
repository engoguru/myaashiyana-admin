import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

export const addPhones = async(phonesData) => {
    const response = await axios.post(`${base_url}/phone/`, phonesData);
    return response.data;
};

export const allPhones = async() => {
    const response = await axios.get(`${base_url}/phone/all`);
    return response.data;
};

export const singlePhones = async(id) => {
    const response = await axios.get(`${base_url}/phone/single/${id}`);
    return response.data;
};

export const putPhones = async(phones) => {
    const response = await axios.put(`${base_url}/phone/update/${phones.id}`, 
    {
        title : phones.phonesData.title,
    });
    return response.data;
};

export const deletePhones = async(id) => {
    const response = await axios.delete(`${base_url}/phone/delete/${id}`);
    return response.data;
};


const phoneService = {
    addPhones,
    allPhones,
    singlePhones,
    putPhones,
    deletePhones
}

export default phoneService;