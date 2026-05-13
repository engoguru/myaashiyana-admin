import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

export const addGallery = async(galleryData) => {
    const response = await axios.post(`${base_url}/gallery/`, galleryData);
    return response.data;
}

export const putGallery = async (gallery) => {
    const response = await axios.put(`${base_url}/gallery/update/${gallery.id}`, {
        images : gallery.galleryData.images,
        heading : progr.progData.heading,
    });
    return response.data;
}

export const getGallery = async () => {
    const response = await axios.get(`${base_url}/gallery/all`);
    return response.data;
}

export const singleGallery = async (id) => {
    const response = await axios.get(`${base_url}/gallery/single/${id}`);
    return response.data
};

export const removeGallery = async(id) => {
    const response = await axios.delete(`${base_url}/gallery/delete/${id}`);
    return response.data;
}


const galleryService = {
    addGallery,
    putGallery,
    getGallery,
    singleGallery,
    removeGallery
}

export default galleryService;