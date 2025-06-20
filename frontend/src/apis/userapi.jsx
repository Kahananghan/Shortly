import axiosInstance from "../utils/axios";
import { store } from '../store/store';
import { showLoader, hideLoader } from '../store/slice/loadingSlice';

export const registeruser = async (name, email, password) => {
    store.dispatch(showLoader('Registering...'));
    try {
        const {data} = await axiosInstance.post("/api/auth/register", { name, email, password });
        return data;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    } finally {
        store.dispatch(hideLoader());
    }
};

export const loginuser = async (email, password) => {
    store.dispatch(showLoader('Logging in...')); 
    try {
        const {data} = await axiosInstance.post("/api/auth/login", { email, password });
        return data;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    } finally {
       store.dispatch(hideLoader()); 
    }
};

export const logoutuser = async () => {
    store.dispatch(showLoader('Logging out...'));
    try {
        const {data} = await axiosInstance.post("/api/auth/logout");
        return data;
    } catch (error) {
        console.error("Error logging out:", error);
        throw error;
    } finally {
        store.dispatch(hideLoader());
    }
};

export const getuser = async () => {
    store.dispatch(showLoader('Fetching user details...'));
    try {
        const {data} = await axiosInstance.get("/api/auth/me");
        return data;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    } finally {
        store.dispatch(hideLoader());
    }
};

export const getalluserurls = async () => {
    store.dispatch(showLoader('Fetching all user URLs...'));
    try {
        const {data} = await axiosInstance.post("/api/user/urls");
        return data;
    } catch (error) {
        console.error("Error fetching all user URLs:", error);
        throw error;
    } finally {
        store.dispatch(hideLoader());
    }
};