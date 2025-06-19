import React, { useState } from 'react'
import { getUserUrls, deleteUrl } from '../apis/shorturlapi'
import { useSelector } from 'react-redux'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Trash2, Loader2 } from 'lucide-react'

const UserUrls = () => {
  const [copiedId, setCopiedId] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const { isAuthenticated } = useSelector(state => state.auth)
  const queryClient = useQueryClient()

  const { data: urls, isLoading, isError, error } = useQuery({
    queryKey: ['userUrls'],
    queryFn: getUserUrls,
    refetchInterval: 30000,
    staleTime: 0,
    enabled: isAuthenticated
  })

  const copyToClipboard = (url, id) => {
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleDeleteUrl = async (urlId) => {
    if (!confirm('Are you sure you want to delete this URL?')) {
      return
    }

    try {
      setDeletingId(urlId)
      await deleteUrl(urlId)
      // Refetch the URLs to update the list
      queryClient.invalidateQueries(['userUrls'])
    } catch (error) {
      console.error('Failed to delete URL:', error)
      alert('Failed to delete URL. Please try again.')
    } finally {
      setDeletingId(null)
    }
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
    <div className="mt-2">
      <h3 className="text-xl font-semibold mb-4">Your URLs</h3>
      <div className="overflow-x-auto h-80">
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
            {[...urls].reverse().map(url => (
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
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => copyToClipboard(url.short_url, url._id)}
                      className={`px-3 py-1 rounded text-sm font-medium transition ${
                        copiedId === url._id
                          ? 'bg-green-500 text-white'
                          : 'bg-blue-500 hover:bg-blue-600 text-white'
                      }`}
                    >
                      {copiedId === url._id ? 'Copied!' : 'Copy'}
                    </button>
                    <button
                        onClick={() => handleDeleteUrl(url._id)}
                        disabled={deletingId === url._id}
                        className={`px-3 py-1 rounded text-sm font-medium flex items-center gap-2 transition ${
                          deletingId === url._id
                            ? 'bg-gray-400 text-white cursor-not-allowed'
                            : 'bg-red-500 hover:bg-red-600 text-white'
                        }`}
                      >
                        {deletingId === url._id ? (                       
                            <Loader2 className="w-4 h-5 animate-spin" />
                        ) : (                 
                            <Trash2 className="w-4 h-5" />                            
                        )}
                    </button>
                  </div>
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