import React, { useState } from 'react'
import { createshorturl } from '../apis/shorturlapi'

const Urlform = () => {
  const [url, seturl] = useState("https://www.google.com")
  const [shorturl, setshorturl] = useState("")
  const [copied, setcopied] = useState(false)

  const submitHandler = async () => {
    const shorturl = await createshorturl(url)
    setshorturl(shorturl)
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
