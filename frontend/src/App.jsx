import React, { useEffect } from 'react';
import { Outlet } from '@tanstack/react-router';
import Navbar from './Components/Navbar';
import Loader from './Components/Loader';
import { useDispatch } from 'react-redux';
import { showLoader, hideLoader } from './store/slice/loadingSlice';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showLoader('Loading Application...'));

    const timer = setTimeout(() => {
      dispatch(hideLoader());
    }, 600); 

    return () => clearTimeout(timer); 
  }, [dispatch]); 

  return (
    <>  
      <Navbar />
      <Loader /> 
      <Outlet />
    </>
  );
};

export default App;
