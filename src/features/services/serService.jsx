import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

export const addServices = async(serData) => {
    const response = await axios.post(`${base_url}/service/`, serData);
    return response.data;
};

export const allServices = async() => {
    const response = await axios.get(`${base_url}/service/all`);
    return response.data;
};

export const singleServices = async(id) => {
    const response = await axios.get(`${base_url}/service/single/${id}`);
    return response.data;
};

export const putServices = async(serv) => {
    const response = await axios.put(`${base_url}/service/update/${serv.id}`, 
    {
        images : serv.serData.images,
        heading : serv.serData.heading,
        content : serv.serData.content,
    }
);
    return response.data;
};

export const deleteServices = async(id) => {
    const response = await axios.delete(`${base_url}/service/delete/${id}`);
    return response.data;
};


const serService = {
    addServices,
    allServices,
    singleServices,
    putServices,
    deleteServices
}

export default serService;