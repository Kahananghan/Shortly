import axiosInstance from "../utils/axios";
import { store } from '../store/store';
import { showLoader, hideLoader } from '../store/slice/loadingSlice';

export const createshorturl = async (url, customSlug) => {
    store.dispatch(showLoader('Creating your short URL...'));
    try {
        const {data} = await axiosInstance.post("/api/create", { url, slug: customSlug });
        return data.shorturl;
    } catch (error) {
        console.error("Error creating short URL:", error);
        throw error; 
    } finally {
        store.dispatch(hideLoader());
    }
};

export const getUserUrls = async () => {
    try {
        const {data} = await axiosInstance.post("/api/user/urls");
        return data.urls;
    } catch (error) {
        console.error("Error fetching user URLs:", error);
        store.dispatch(hideLoader()); 
        throw error;
    } finally {
        store.dispatch(hideLoader()); 
    }
};

export const deleteUrl = async (urlId) => {
    store.dispatch(showLoader('Deleting URL...'));
    try {
        const {data} = await axiosInstance.delete(`/api/url/${urlId}`);
        return data;
    } catch (error) {
        console.error("Error deleting URL:", error);
        throw error;
    } finally {
        store.dispatch(hideLoader());
    }
};