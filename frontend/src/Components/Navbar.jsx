import { Link, useNavigate, useRouterState } from '@tanstack/react-router';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slice/authSlice';
import { logoutuser } from '../apis/userapi';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector(state => state.auth);
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
      navigate({ to: '/' });
    } catch (error) {
      console.error('Logout failed:', error);
      setLogoutMessage('Logout failed. Please try again.');
    }
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to={isAuthenticated ? "/home" : "/"} className="flex items-center group">
                <div className="bg-white p-2 rounded-full shadow-md transition-transform group-hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="ml-2 text-white font-bold text-3xl tracking-tight">Shortly</span>
              </Link>
            </div>
            
            {/* Desktop menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                {isAuthenticated && (
                  <>
                    <Link 
                      to="/home" 
                      className="text-white hover:bg-white/20 px-3 py-2 rounded-md font-medium transition-colors"
                      activeProps={{ className: "bg-white/20 text-white px-3 py-2 rounded-md font-medium" }}
                    >
                      Home
                    </Link>
                    <Link 
                      to="/dashboard" 
                      className="text-white hover:bg-white/20 px-3 py-2 rounded-md font-medium transition-colors"
                      activeProps={{ className: "bg-white/20 text-white px-3 py-2 rounded-md font-medium" }}
                    >
                      Dashboard
                    </Link>
                  </>
                )}
                
                {isAuthenticated ? (
                  <div className="flex items-center space-x-3">
                    {user && (
                      <Link to="/account">
                        <img 
                          src={user.avatar || (user.user && user.user.avatar) || ''}
                          alt="Profile" 
                          className="h-8 w-8 rounded-full border-2 border-white hover:border-blue-300 cursor-pointer transition-all"
                          title="My Account"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://www.gravatar.com/avatar/default?d=mp';
                          }}
                        />
                      </Link>
                    )}
                    <button 
                      onClick={handleLogout}
                      className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md font-medium transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-3">
                    <Link 
                      to="/" 
                      className="text-white hover:bg-white/20 px-3 py-2 rounded-md font-medium transition-colors"
                    >
                      Login
                    </Link>
                    <Link 
                      to="/" 
                      className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md font-medium transition-colors"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/20 focus:outline-none transition-colors"
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
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gradient-to-r from-blue-700 to-purple-700">
            {isAuthenticated && (
              <>
                <Link 
                  to="/home" 
                  className="text-white hover:bg-white/20 block px-3 py-2 rounded-md font-medium transition-colors"
                  activeProps={{ className: "bg-white/20 text-white block px-3 py-2 rounded-md font-medium" }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/dashboard" 
                  className="text-white hover:bg-white/20 block px-3 py-2 rounded-md font-medium transition-colors"
                  activeProps={{ className: "bg-white/20 text-white block px-3 py-2 rounded-md font-medium" }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              </>
            )}
            
            {isAuthenticated ? (
              <div className="pt-4 pb-3 border-t border-white/20">
                    {user && (
                      <Link 
                        to="/account" 
                        className="flex items-center px-3 hover:bg-white/10 rounded-md transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <img 
                          src={user.avatar || (user.user && user.user.avatar) || ''}
                          alt="Profile" 
                          className="h-8 w-8 rounded-full border-2 border-white"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://www.gravatar.com/avatar/default?d=mp';
                          }}
                        />
                        <div className="ml-3">
                          <div className="text-base font-medium text-white">
                            {user.name || (user.user && user.user.name) || 'User'}
                          </div>
                          <div className="text-sm font-medium text-blue-200">
                            {user.email || (user.user && user.user.email) || ''}
                          </div>
                        </div>
                      </Link>
                    )}
                    
                <div className="mt-3">
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="bg-white text-blue-600 hover:bg-blue-50 block w-full text-left px-3 py-2 rounded-md font-medium transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="pt-4 pb-3 border-t border-white/20 space-y-1">
                <Link 
                  to="/" 
                  className="text-white hover:bg-white/20 block px-3 py-2 rounded-md font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/" 
                  className="bg-white text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-md font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
      
      {logoutMessage && (
        <div className="fixed top-20 right-50 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg z-50 animate-fade-in-out">
          {logoutMessage}
        </div>
      )}
    </>
  );
};

export default Navbar;