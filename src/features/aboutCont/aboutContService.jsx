import axios from 'axios';
import { base_url } from '../../utils/base_url';

export const addabout = async(aboutData) => {
    const response = await axios.post(`${base_url}/about/`, aboutData);
    return response.data;
}

export const putabout = async (about) => {
    const response = await axios.put(`${base_url}/about/update/${about.id}`, {
        images : about.aboutData.images,
        content : about.aboutData.content,
    });
    return response.data;
}

export const getabout = async () => {
    const response = await axios.get(`${base_url}/about/all`);
    return response.data;
}

export const singleabout = async (id) => {
    const response = await axios.get(`${base_url}/about/single/${id}`);
    return response.data
};

export const removeabout = async(id) => {
    const response = await axios.delete(`${base_url}/about/delete/${id}`);
    return response.data;
}


const aboutContService = {
    addabout,
    putabout,
    getabout,
    singleabout,
    removeabout
}

export default aboutContService;