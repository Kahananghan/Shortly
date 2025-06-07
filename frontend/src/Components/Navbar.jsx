import { Link } from '@tanstack/react-router';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-xl">
          URL Shortener
        </Link>
        <div className="space-x-4">
          <Link 
            to="/" 
            className="text-gray-300 hover:text-white"
            activeProps={{ className: "text-white font-bold" }}
          >
            Home
          </Link>
          <Link 
            to="/auth" 
            className="text-gray-300 hover:text-white"
            activeProps={{ className: "text-white font-bold" }}
          >
            Login/Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;