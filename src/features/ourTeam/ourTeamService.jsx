import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

export const addMainTeam = async(teamData) => {
    const response = await axios.post(`${base_url}/ourteam/`, teamData);
    return response.data;
};

export const allMainTeam = async() => {
    const response = await axios.get(`${base_url}/ourteam/all`);
    return response.data;
};

export const singleMainTeam = async(id) => {
    const response = await axios.get(`${base_url}/ourteam/single/${id}`);
    return response.data;
};

export const putMainTeam = async(team) => {
    const response = await axios.put(`${base_url}/ourteam/update/${team.id}`, 
    {
        name : team.teamData.name,
        images : team.teamData.images,
        position: team.teamData.position
    });
    return response.data;
};

export const deleteMainTeam = async(id) => {
    const response = await axios.delete(`${base_url}/ourteam/delete/${id}`);
    return response.data;
};


const ourTeamService = {
    addMainTeam,
    allMainTeam,
    singleMainTeam,
    putMainTeam,
    deleteMainTeam
}

export default ourTeamService;