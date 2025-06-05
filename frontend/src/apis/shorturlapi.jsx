import axiosInstance from "../utils/axios";

export const createshorturl = async (url) => { 
    const {data} = await axiosInstance.post("/api/create", { url });
    return data.shorturl;
};
