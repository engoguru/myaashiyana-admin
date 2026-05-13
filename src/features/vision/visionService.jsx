import axios from "axios";
import { base_url } from "../../utils/base_url";

export const addVision = async(visData) => {
    const response = await axios.post(`${base_url}/vision/`, visData);
    return response.data;
};

export const allVision = async() => {
    const response = await axios.get(`${base_url}/vision/all`);
    return response.data;
};

export const singleVision = async(id) => {
    const response = await axios.get(`${base_url}/vision/single/${id}`);
    return response.data;
};

export const putVision = async(vision) => {
    const response = await axios.put(`${base_url}/vision/update/${vision.id}`, 
    {
        images : vision.visData.images,
        content: vision.visData.content
    }
);
    return response.data;
};

export const deleteVision = async(id) => {
    const response = await axios.delete(`${base_url}/vision/delete/${id}`);
    return response.data;
};


const visionService = {
    addVision,
    allVision,
    singleVision,
    putVision,
    deleteVision
}

export default visionService;