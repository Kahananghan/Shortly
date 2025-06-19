import { Link, useNavigate, useRouterState } from '@tanstack/react-router';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slice/authSlice';
import { logoutuser } from '../apis/userapi';
import { useState, useEffect } from 'react';
import Logo from '../components/Logo';
import { motion } from 'framer-motion';

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
                <div className="transition-transform group-hover:scale-110">
                  <Logo size="lg" />
                </div>
                <span className="ml-3 text-white font-bold text-3xl tracking-tight">Shortly</span>
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
                          src={'/default-avatar.svg'}
                          alt="Profile"
                          className="h-8 w-8 rounded-full border-2 border-white hover:border-blue-300 cursor-pointer transition-all"
                          title="My Account"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/default-avatar.svg';
                          }}
                        />
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 px-4 py-2 rounded-md font-medium transition-all shadow-md hover:shadow-lg"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-3">
                    <Link
                      to="/"
                      className="text-white hover:bg-white/20 px-3 py-2 rounded-md font-medium transition-colors border border-white/30 hover:border-white/50"
                    >
                      Login
                    </Link>
                    <Link
                      to="/"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 px-4 py-2 rounded-md font-medium transition-all shadow-md hover:shadow-lg"
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
                          src={'/default-avatar.svg'}
                          alt="Profile"
                          className="h-8 w-8 rounded-full border-2 border-white"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/default-avatar.svg';
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
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 block w-full text-left px-3 py-2 rounded-md font-medium transition-all shadow-md hover:shadow-lg"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="pt-4 pb-3 border-t border-white/20 space-y-1">
                <Link
                  to="/"
                  className="text-white hover:bg-white/20 block px-3 py-2 rounded-md font-medium transition-colors border border-white/30 hover:border-white/50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 block px-3 py-2 rounded-md font-medium transition-all shadow-md hover:shadow-lg"
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
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.8 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            duration: 0.4
          }}
          className="fixed top-20 right-10 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-2 rounded-lg shadow-lg z-50 border border-red-400"
        >
          <motion.div
            className="flex items-center space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <motion.div
              className="bg-white rounded-full w-5 h-5 flex items-center justify-center"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 15,
                delay: 0.1
              }}
            >
              <span className="text-red-600 font-bold text-xs">!</span>
            </motion.div>
            <motion.span
              className="text-sm"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              {logoutMessage}
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;