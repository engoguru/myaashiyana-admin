import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

export const addProgrammes = async(progData) => {
    const response = await axios.post(`${base_url}/programe/`, progData);
    return response.data;
};

export const allProgrammes = async() => {
    const response = await axios.get(`${base_url}/programe/all`);
    return response.data;
};

export const singleProgrammes = async(id) => {
    const response = await axios.get(`${base_url}/programe/single/${id}`);
    return response.data;
};

export const putProgrammes = async(progr) => {
    const response = await axios.put(`${base_url}/programe/update/${progr.id}`, 
    {
        images : progr.progData.images,
        heading : progr.progData.heading,
        content : progr.progData.content,
    }
);
    return response.data;
};

export const deleteProgrammes = async(id) => {
    const response = await axios.delete(`${base_url}/programe/delete/${id}`);
    return response.data;
};


const programmeService = {
    addProgrammes,
    allProgrammes,
    singleProgrammes,
    putProgrammes,
    deleteProgrammes
}

export default programmeService;