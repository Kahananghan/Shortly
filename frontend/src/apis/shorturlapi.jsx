import axiosInstance from "../utils/axios";

export const createshorturl = async (url, customSlug) => { 
    const {data} = await axiosInstance.post("/api/create", { url, slug: customSlug });
    return data.shorturl;
};

export const getUserUrls = async () => {
    const {data} = await axiosInstance.post("/api/user/urls");
    return data.urls;
};