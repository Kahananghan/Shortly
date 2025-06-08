import React, { useState } from 'react'
import { getUserUrls } from '../apis/shorturlapi'
import { useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'

const UserUrls = () => {
  const [copiedId, setCopiedId] = useState(null)
  const { isAuthenticated } = useSelector(state => state.auth)

  const { data: urls, isLoading, isError, error } = useQuery({
    queryKey: ['userUrls'],
    queryFn: getUserUrls,
    refetchInterval: 30000,
    staleTime: 0,
  })

  const copyToClipboard = (url, id) => {
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  if (!isAuthenticated) {
    return null
  }

  if (isLoading) {
    return <div className="text-center py-4">Loading your URLs...</div>
  }

  if (isError) {
    return <div className="text-center py-4 text-red-600">Error: {error.message}</div>
  }

  if (urls.length === 0) {
    return <div className="text-center py-4 text-gray-600">You haven't created any URLs yet.</div>
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Your URLs</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Original URL</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Short URL</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">Clicks</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {urls.reverse().map(url => (
              <tr key={url._id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-800 truncate max-w-xs">
                  {url.full_url}
                </td>
                <td className="px-4 py-3 text-sm text-blue-600">
                  {url.short_url}
                </td>
                <td className="px-4 py-3 text-sm text-center">
                  {url.clicks}
                </td>
                <td className="px-4 py-3 text-sm text-center">
                  <button
                    onClick={() => copyToClipboard(url.short_url, url._id)}
                    className={`px-3 py-1 rounded text-sm font-medium transition ${
                      copiedId === url._id 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                    }`}
                  >
                    {copiedId === url._id ? 'Copied!' : 'Copy'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserUrls