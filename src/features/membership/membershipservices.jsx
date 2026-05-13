import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

export const allMember = async () => {
    const response = await axios.get(`${base_url}/memberQuery/all`);
    return response.data;
};


export const singleMember = async (id) => {
    const response = await axios.get(`${base_url}/memberQuery/single/${id}`);
    return response.data
};


export const removeMember = async(id) => {
    const response = await axios.delete(`${base_url}/memberQuery/delete/${id}`);
    return response.data;
};


const memberFormService = {
    allMember,
    singleMember,
    removeMember
}

export default memberFormService;