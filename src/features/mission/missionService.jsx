import axios from "axios";
import { base_url } from "../../utils/base_url";

export const addMission = async(misData) => {
    const response = await axios.post(`${base_url}/mission/`, misData);
    return response.data;
};

export const allMission = async() => {
    const response = await axios.get(`${base_url}/mission/all`);
    return response.data;
};

export const singleMission = async(id) => {
    const response = await axios.get(`${base_url}/mission/single/${id}`);
    return response.data;
};

export const putMission = async(mission) => {
    const response = await axios.put(`${base_url}/mission/update/${mission.id}`, 
    {
        images : mission.misData.images,
        content: mission.misData.content
    }
);
    return response.data;
};

export const deleteMission = async(id) => {
    const response = await axios.delete(`${base_url}/mission/delete/${id}`);
    return response.data;
};


const missionService = {
    addMission,
    allMission,
    singleMission,
    putMission,
    deleteMission
}

export default missionService;