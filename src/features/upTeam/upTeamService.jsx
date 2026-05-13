import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

export const addUpTeam = async(upTeamData) => {
    const response = await axios.post(`${base_url}/upTeam/`, upTeamData);
    return response.data;
};

export const allUpTeam = async() => {
    const response = await axios.get(`${base_url}/upTeam/all`);
    return response.data;
};

export const singleUpTeam = async(id) => {
    const response = await axios.get(`${base_url}/upTeam/single/${id}`);
    return response.data;
};

export const putUpTeam = async(upTeam) => {
    const response = await axios.put(`${base_url}/upTeam/update/${upTeam.id}`, 
    {
        icon : upTeam.upTeamData.icon,
        title : upTeam.upTeamData.title
    }
);
    return response.data;
};

export const deleteUpTeam = async(id) => {
    const response = await axios.delete(`${base_url}/upTeam/delete/${id}`);
    return response.data;
};


const upTeamService = {
    addUpTeam,
    allUpTeam,
    singleUpTeam,
    putUpTeam,
    deleteUpTeam
}

export default upTeamService;