import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

export const addEmails = async(emailsData) => {
    const response = await axios.post(`${base_url}/email/`, emailsData);
    return response.data;
};

export const allEmails = async() => {
    const response = await axios.get(`${base_url}/email/all`);
    return response.data;
};

export const singleEmails = async(id) => {
    const response = await axios.get(`${base_url}/email/single/${id}`);
    return response.data;
};

export const putEmails = async(emails) => {
    const response = await axios.put(`${base_url}/email/update/${emails.id}`, 
    {
        title : emails.emailsData.title,
    }
);
    return response.data;
};

export const deleteEmails = async(id) => {
    const response = await axios.delete(`${base_url}/email/delete/${id}`);
    return response.data;
};


const emailService = {
    addEmails,
    allEmails,
    singleEmails,
    putEmails,
    deleteEmails
}

export default emailService;