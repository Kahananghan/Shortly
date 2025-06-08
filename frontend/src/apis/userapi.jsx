import axiosInstance from "../utils/axios";

export const registeruser = async (name, email, password) => {
    const {data} = await axiosInstance.post("/api/auth/register", { name, email, password });
    return data;
};

export const loginuser = async (email, password) => {
    const {data} = await axiosInstance.post("/api/auth/login", { email, password });
    return data;
};

export const logoutuser = async () => {
    const {data} = await axiosInstance.get("/api/auth/logout");
    return data;
};

export const getuser = async () => {
    const {data} = await axiosInstance.get("/api/auth/me");
    return data;
};

export const getalluserurls = async () => {
    const {data} = await axiosInstance.post("/api/user/urls");
    return data;
};