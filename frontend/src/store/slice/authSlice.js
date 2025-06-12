import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login : (state, action) => {
      if(action.payload && (action.payload.name || action.payload.email || action.payload.avatar)) {
        state.user = action.payload;
      } 
      else if(action.payload && action.payload.user){
        state.user = action.payload.user;
      }else{
        state.user = action.payload;
      }
      state.isAuthenticated = true;
      
    },
    
    logout : (state) => {
      state.user = null;
      state.isAuthenticated = false;
      
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;