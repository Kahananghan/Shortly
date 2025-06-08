import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
};
// const loadAuthState = () => {
//   try {
//     const serializedState = localStorage.getItem('authState');
//     if (serializedState === null) {
//       return {
//         user: null,
//         isAuthenticated: false,
//       };
//     }
//     return JSON.parse(serializedState);
//   } catch (err) {
//     return {
//       user: null,
//       isAuthenticated: false,
//     };
//   }
// };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login : (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      // localStorage.setItem('authState', JSON.stringify({
      //   user: action.payload,
      //   isAuthenticated: true,
      // }));
    },
    logout : (state) => {
      state.user = null;
      state.isAuthenticated = false;
      //localStorage.removeItem('authState');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;