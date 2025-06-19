import React from 'react'
import Urlform from '../Components/Urlform'
import UserUrl from '../Components/Userurl'
import { useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { getUserUrls } from '../apis/shorturlapi'
import { motion } from 'framer-motion'
import { Link, BarChart3, Clock, TrendingUp } from 'lucide-react'

const Dashboard = () => {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  
  const { data: urls = [] } = useQuery({
    queryKey: ['userUrls'],
    queryFn: getUserUrls,
    refetchInterval: 30000,
    staleTime: 0,
    enabled: isAuthenticated
  });
  
  const getUserDisplayName = () => {
    if (!user) return 'User';
    if (user.name) return user.name;
    if (user.email) return user.email.split('@')[0];
    return 'User';
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section with Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              {/* Left side - Title and Welcome */}
              <div className="flex items-center">
                <div className="hidden md:block mr-6">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg">
                    <BarChart3 className="w-10 h-10 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Dashboard
                  </h1>
                  <p className="mt-3 text-xl text-gray-600">
                    Welcome back, <span className="font-semibold text-gray-900">{getUserDisplayName()}</span>
                  </p>
                </div>
              </div>

              {/* Right side - Quick Stats */}
              <div className="grid grid-cols-3 gap-4 lg:gap-6">
                {/* Total URLs Stat */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center border border-blue-200">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Link className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-blue-800">
                    {urls.length || 0}
                  </p>
                  <p className="text-xs font-medium text-blue-600">Total URLs</p>
                </div>

                {/* Total Clicks Stat */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center border border-green-200">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-green-800">
                    {urls.reduce((total, url) => total + (url.clicks || 0), 0)}
                  </p>
                  <p className="text-xs font-medium text-green-600">Total Clicks</p>
                </div>

                {/* Average Clicks Stat */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center border border-purple-200">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-purple-800">
                    {urls.length > 0 ? Math.round(urls.reduce((total, url) => total + (url.clicks || 0), 0) / urls.length) : 0}
                  </p>
                  <p className="text-xs font-medium text-purple-600">Avg. Clicks</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - URL Form */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 h-fit"
            >
              <div className="bg-blue-600 px-6 py-4">
                <div className="flex items-center">
                  <Link className="w-5 h-5 text-white mr-2" />
                  <h2 className="text-xl font-bold text-white">Create Short URL</h2>
                </div>
                <p className="text-blue-100 mt-1 text-sm">Transform your long URLs into short links</p>
              </div>
              <div className="p-6">
                <Urlform />
              </div>
            </motion.div>
          </div>

          {/* Right Column - URLs Table */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
            >
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold text-white flex items-center">
                      <Clock className="w-5 h-5 mr-2" />
                      Your URLs
                    </h2>
                    <p className="text-gray-300 mt-1 text-sm">Manage and track your shortened links</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                      {urls.length || 0} URLs
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                {urls.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Link className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No URLs yet</h3>
                    <p className="text-gray-600 text-sm">Create your first short URL to get started!</p>
                  </div>
                ) : (
                  <UserUrl />
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard