import { Outlet } from '@tanstack/react-router';
import Navbar from './Components/Navbar';

const App = () => {
  return (
    <>  
        <Navbar />
        <Outlet />
    </>
  );
};

export default App;
