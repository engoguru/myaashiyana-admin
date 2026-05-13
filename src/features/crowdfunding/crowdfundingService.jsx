import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

export const addcrowdFunding = async (progData) => {
    const response = await axios.post(`${base_url}/crowdfunding/create`, progData);
    return response.data;
};

export const getallcrowdFunding = async () => {
    const response = await axios.get(`${base_url}/crowdfunding/all`);
    return response.data;
};


export const singlecrowdFunding = async (id) => {
    const response = await axios.get(`${base_url}/crowdfunding/single/${id}`);
    return response.data;
};



export const deletecrowdFunding = async (id) => {
    const response = await axios.delete(`${base_url}/crowfunding/delete/${id}`);
    return response.data;
};


const programmeService = {
    addcrowdFunding,
    deletecrowdFunding,
    singlecrowdFunding,
    getallcrowdFunding
}

export default programmeService;