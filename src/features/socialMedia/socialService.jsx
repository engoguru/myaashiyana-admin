import axios from "axios";
import { base_url } from "../../utils/base_url";

export const addSocMedia = async(socMediaData) => {
    const response = await axios.post(`${base_url}/socialmedia/`, socMediaData);
    return response.data;
};

export const allSocMedia = async() => {
    const response = await axios.get(`${base_url}/socialmedia/all`);
    return response.data;
};

export const singleSocMedia = async(id) => {
    const response = await axios.get(`${base_url}/socialmedia/single/${id}`);
    return response.data;
};

export const putSocMedia = async(social) => {
    const response = await axios.put(`${base_url}/socialmedia/update/${social.id}`, 
    {
        facebook : social.socMediaData.facebook,
        instagram : social.socMediaData.instagram,
        youtube : social.socMediaData.youtube,
        twitter : social.socMediaData.twitter,
    });
    return response.data;
};

export const deleteSocMedia = async(id) => {
    const response = await axios.delete(`${base_url}/socialmedia/delete/${id}`);
    return response.data;
};


const socialService = {
    addSocMedia,
    allSocMedia,
    singleSocMedia,
    putSocMedia,
    deleteSocMedia
}

export default socialService;