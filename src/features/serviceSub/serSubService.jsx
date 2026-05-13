import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

export const addSubServices = async(serSubData) => {
    const response = await axios.post(`${base_url}/subSer/`, serSubData);
    return response.data;
};

export const allSubServices = async() => {
    const response = await axios.get(`${base_url}/subSer/all`);
    return response.data;
};

export const singleSubServices = async(id) => {
    const response = await axios.get(`${base_url}/subSer/single/${id}`);
    return response.data;
};

export const putSubServices = async(serSub) => {
    const response = await axios.put(`${base_url}/subSer/update/${serSub.id}`, 
    {
        content : serSub.serSubData.content,
    }
);
    return response.data;
};

export const deleteSubServices = async(id) => {
    const response = await axios.delete(`${base_url}/subSer/delete/${id}`);
    return response.data;
};


const serSubService = {
    addSubServices,
    allSubServices,
    singleSubServices,
    putSubServices,
    deleteSubServices
}

export default serSubService;