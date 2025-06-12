import Urlform from '../Components/Urlform'
import { Link } from '@tanstack/react-router'
import { useSelector } from 'react-redux'
import Homefeature from '../Components/Homefeature'

const Homepage = () => {
  const { isAuthenticated } = useSelector(state => state.auth)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-blue-900 mb-4">
            Shorten Your Links
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create concise, memorable URLs that are easy to share and track
          </p>
        </div>
        
        {/* URL Shortener Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12 border border-gray-100">
          <Urlform />
        </div>
        
        <Homefeature />
        
        {/* CTA Section */}
        {!isAuthenticated && (
          <div className="text-center">
            <p className="text-gray-700 mb-4">
              Want to manage your links and see detailed statistics?
            </p>
            <Link 
              to="/" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition"
            >
              Create Free Account
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Homepage