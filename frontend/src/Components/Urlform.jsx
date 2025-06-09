import React, { useState } from 'react'
import { createshorturl } from '../apis/shorturlapi'
import { useSelector } from 'react-redux'
import { useQueryClient } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'

const Urlform = () => {
  const [url, seturl] = useState("")
  const [shorturl, setshorturl] = useState("")
  const [copied, setcopied] = useState(false)
  const [customSlug, setCustomSlug] = useState("")
  const [error, setError] = useState("")
  const { isAuthenticated } = useSelector((state) => state.auth)
  const queryClient = useQueryClient()

  const submitHandler = async () => {
    try{
    setError("")
    const shorturl = await createshorturl(url, customSlug)
    queryClient.invalidateQueries({ queryKey: ['userUrls'] })
    setshorturl(shorturl)
  }catch(err){
    if (err.response && err.response.data && err.response.data.message === "This custom url already exists") {
        setError("This custom URL already exists. Please try another one.")
      } else {
        setError("An error occurred. Please try again.")
      }
    }
  } 

  const copyClipboard = () => {
    navigator.clipboard.writeText(shorturl)
    setcopied(true)
    setTimeout(() => setcopied(false), 2000)
  }

  

  return (

    <div className='space-y-4'>
      <div>
        <input
          type="url"
          placeholder="https://example.com"
          onChange={(e) => seturl(e.target.value)}
          value={url}
          required
          className="w-full px-4 py-2 border rounded-xl  focus:outline-none focus:ring focus:border-blue-500 mb-4"
        />
      </div>

      {isAuthenticated ? (
        <div className='mt-4'>
          <label htmlFor="customSlug" className='block text-sm font-medium text-gray-700 mb-1'>Custom URL (Optional)</label>
          <input
            type="text"
            placeholder="Enter Custom URL (optional)"
            onChange={(e) => setCustomSlug(e.target.value)}
            value={customSlug}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:border-blue-500 mb-4"
          />
          {error && (
            <div className="text-red-500 text-sm mb-2">{error}</div>
          )}
        </div>
      ):(
            <div className="mt-6 text-center">
              <p className="text-gray-600 mb-2">
                Create an account to use custom slugs and track your URLs
              </p>
              <Link 
                to="/auth" 
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Login or Register
              </Link>
            </div>
        )
      }
      

        <button
          onClick={submitHandler}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition"
        >
          Shorten URL
        </button>
        
      {shorturl && (
        <div className="mt-4 p-4 bg-zinc-100 rounded-xl shadow-md space-y-2">
          <p className="text-sm font-semibold text-black">Your shortened URL:</p>

          <div className="relative w-full max-w-md">
            <input
              value={shorturl}
              type="text"
              readOnly
              className="w-full border border-gray-400 rounded-md px-4 py-2 pr-20 text-gray-800 focus:outline-none "
            />
            <button
              onClick={copyClipboard}
              className={`absolute right-0 top-0 bottom-0 px-5 rounded-r-md text-sm font-medium  transition 
                        ${copied ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-200 hover:bg-gray-300'}`}>
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}
   </div>
)}

export default Urlform
