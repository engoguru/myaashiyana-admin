import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

export const addCount = async(numCntData) => {
    const response = await axios.post(`${base_url}/numcount/`, numCntData);
    return response.data;
};

export const allCount = async() => {
    const response = await axios.get(`${base_url}/numcount/all`);
    return response.data;
};

export const singleCount = async(id) => {
    const response = await axios.get(`${base_url}/numcount/single/${id}`);
    return response.data;
};

export const putCount = async(numcount) => {
    const response = await axios.put(`${base_url}/numcount/update/${numcount.id}`, 
    {
        icons : numcount.numCntData.icons,
        number : numcount.numCntData.number,
        content: numcount.numCntData.content
    });
    return response.data;
};

export const deleteCount = async(id) => {
    const response = await axios.delete(`${base_url}/numcount/delete/${id}`);
    return response.data;
};


const numService = {
    addCount,
    allCount,
    singleCount,
    putCount,
    deleteCount
}

export default numService;