import React from 'react'
import Urlform from '../Components/Urlform'
import UserUrl from '../Components/Userurl'
import { useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { getUserUrls } from '../apis/shorturlapi'

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { isAuthenticated } = useSelector(state => state.auth);
  
  // Use React Query to fetch URLs
  const { data: urls = [] } = useQuery({
    queryKey: ['userUrls'],
    queryFn: getUserUrls,
    refetchInterval: 30000,
    staleTime: 0,
    enabled: isAuthenticated
  });
  
  // Get user display name safely
  const getUserDisplayName = () => {
    if (!user.user) return 'User';
    if (user.user.name) return user.user.name;
    if (user.user.email) return user.user.email.split('@')[0];
    return 'User';
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Welcome back, {getUserDisplayName()}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* URL Shortener Form Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-blue-600 px-6 py-4">
                <h2 className="text-xl font-semibold text-white">Create Short URL</h2>
              </div>
              <div className="p-6">
                <Urlform />
              </div>
            </div>
            
            {/* Stats Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mt-6">
              <div className="bg-purple-600 px-6 py-4">
                <h2 className="text-xl font-semibold text-white">Quick Stats</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-600 font-medium">Total URLs</p>
                    <p className="text-2xl font-bold text-blue-800">
                      {urls.length || 0}
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-green-600 font-medium">Total Clicks</p>
                    <p className="text-2xl font-bold text-green-800">
                      {urls.reduce((total, url) => total + (url.clicks || 0), 0)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* User URLs Table Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gray-800 px-6 py-6 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">Your URLs</h2>
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  {urls.length || 0}
                </span>
              </div>
              <div className="p-6">
                <UserUrl />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard