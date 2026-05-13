import axios from "axios";
import { base_url } from "../../utils/base_url";

export const addBlogs = async (progData) => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.token;
        
        console.log("Sending blog data:", progData);
        console.log("Token:", token);
        
        const response = await axios.post(
            `${base_url}/blog/`,
            progData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        
        console.log("Blog created response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating blog:", error.response?.data || error.message);
        throw error;
    }
};

export const allBlogs = async () => {
    const response = await axios.get(`${base_url}/blog/all`);
    return response.data;
};

export const singleBlogs = async (id) => {
    const response = await axios.get(`${base_url}/blog/single/${id}`);
    return response.data;
};

export const putBlogs = async (progr) => {
    const response = await axios.put(`${base_url}/blog/update/${progr.id}`,
        {
            images: progr.progData.images,
            title: progr.progData.title,
            excerpt: progr.progData.excerpt,
            content: progr.progData.content,
            author: progr.progData.author,
            date: progr.progData.date,
            quote: progr.progData.quote,
        }
    );
    return response.data;
};

export const deleteBlogs = async (id) => {
    const response = await axios.delete(`${base_url}/blog/delete/${id}`);
    return response.data;
};


const Blogservice = {
    addBlogs,
    allBlogs,
    singleBlogs,
    putBlogs,
    deleteBlogs
}

export default Blogservice;