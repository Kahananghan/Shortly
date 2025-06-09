import { Link, useNavigate } from '@tanstack/react-router';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slice/authSlice';
import { logoutuser } from '../apis/userapi';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const { isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutMessage, setLogoutMessage] = useState('');

  useEffect(() => {
    if (logoutMessage) {
      const timer = setTimeout(() => {
        setLogoutMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [logoutMessage]);

  const handleLogout = async () => {
    try {
      await logoutuser();
      dispatch(logout());
      setLogoutMessage('Successfully logged out!');
      navigate({ to: '/auth' });
    } catch (error) {
      console.error('Logout failed:', error);
      setLogoutMessage('Logout failed. Please try again.');
    }
  };

  return (
    <>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-white font-bold text-xl">
            URL Shortener
          </Link>
          <div className="space-x-6">
            {isAuthenticated && (
              <>
                <Link 
                  to="/" 
                  className="text-gray-300 hover:text-white"
                  activeProps={{ className: "text-white font-bold" }}
                >
                  Home
                </Link>
                <Link 
                  to="/dashboard" 
                  className="text-gray-300 hover:text-white"
                  activeProps={{ className: "text-white font-bold" }}
                >
                  Dashboard
                </Link>
              </>
            )}

            {isAuthenticated ? (
              <button 
                onClick={handleLogout}
                className="text-gray-300 hover:text-white"
              >
                Logout
              </button>
            ) : (
              <Link 
                to="/auth" 
                className="text-gray-300 hover:text-white"
                activeProps={{ className: "text-white font-bold" }}
              >
                Login/Register
              </Link>
            )}
          </div>
        </div>
      </nav>
      
      {logoutMessage && (
        <div className="fixed top-20 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-md">
          {logoutMessage}
        </div>
      )}
    </>
  );
};

export default Navbar;