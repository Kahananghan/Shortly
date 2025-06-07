import {redirect} from "@tanstack/react-router"
import { getuser } from "../apis/userapi";
import { login } from "../store/slice/authSlice";

export const checkAuth = async ({context}) =>{
    try{
        const {store, queryClient} = context;
        const user = await queryClient.ensureQueryData({
            queryKey : ['currentuser'],
            queryFn : getuser,
        });
        if(!user) return false;
        store.dispatch(login(user))
        const {isAuthenticated} = store.getState().auth;
        if(!isAuthenticated) return false;
        return true;
    }catch(error){
        throw redirect({to : '/auth'});
    }
}