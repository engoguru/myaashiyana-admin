import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

export const addTestimonial = async(clientData) => {
    const response = await axios.post(`${base_url}/testimonials/`, clientData,config);
    return response.data;
}

export const putTestimonial = async (donImg) => {
    const response = await axios.put(`${base_url}/testimonials/update/${donImg.id}`, {
        images : donImg.clientData.images,
        name : donImg.clientData.name,
        comment : donImg.clientData.comment,
    },config);
    return response.data;
}

export const getTestimonial = async () => {
    const response = await axios.get(`${base_url}/testimonials/all`);
    return response.data;
}

export const singleTestimonial = async (id) => {
    const response = await axios.get(`${base_url}/testimonials/single/${id}`);
    return response.data
};

export const removeTestimonial = async(id) => {
    const response = await axios.delete(`${base_url}/testimonials/delete/${id}`, config);
    return response.data;
}


const testimonialService = {
    addTestimonial,
    putTestimonial,
    getTestimonial,
    singleTestimonial,
    removeTestimonial
}

export default testimonialService;