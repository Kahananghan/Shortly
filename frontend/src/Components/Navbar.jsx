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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <nav className="bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to={isAuthenticated ? "/" : "/auth"} className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                </svg>
                <span className="ml-2 text-white font-bold text-xl">URL Shortener</span>
              </Link>
            </div>
            
            {/* Desktop menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                {isAuthenticated && (
                  <>
                    <Link 
                      to="/" 
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium"
                      activeProps={{ className: "bg-gray-900 text-white px-3 py-2 rounded-md font-medium" }}
                    >
                      Home
                    </Link>
                    <Link 
                      to="/dashboard" 
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium"
                      activeProps={{ className: "bg-gray-900 text-white px-3 py-2 rounded-md font-medium" }}
                    >
                      Dashboard
                    </Link>
                  </>
                )}
                
                {isAuthenticated ? (
                  <button 
                    onClick={handleLogout}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium"
                  >
                    Logout
                  </button>
                ) : (
                  <Link 
                    to="/auth" 
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium"
                    activeProps={{ className: "bg-gray-900 text-white px-3 py-2 rounded-md font-medium" }}
                  >
                    Login/Register
                  </Link>
                )}
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              >
                <svg 
                  className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`} 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg 
                  className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`} 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isAuthenticated && (
              <>
                <Link 
                  to="/" 
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md font-medium"
                  activeProps={{ className: "bg-gray-900 text-white block px-3 py-2 rounded-md font-medium" }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/dashboard" 
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md font-medium"
                  activeProps={{ className: "bg-gray-900 text-white block px-3 py-2 rounded-md font-medium" }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              </>
            )}
            
            {isAuthenticated ? (
              <button 
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md font-medium w-full text-left"
              >
                Logout
              </button>
            ) : (
              <Link 
                to="/auth" 
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md font-medium"
                activeProps={{ className: "bg-gray-900 text-white block px-3 py-2 rounded-md font-medium" }}
                onClick={() => setIsMenuOpen(false)}
              >
                Login/Register
              </Link>
            )}
          </div>
        </div>
      </nav>
      
      {logoutMessage && (
        <div className="fixed top-20 right-50 bg-green-500 text-white px-4 py-2 rounded shadow-md z-50 animate-fade-in-out">
          {logoutMessage}
        </div>
      )}
    </>
  );
};

export default Navbar;