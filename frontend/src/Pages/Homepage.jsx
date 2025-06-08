import Urlform from '../Components/Urlform'

const Homepage = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
       <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">URL Shortener</h2>
        <h5 className="text-sm mb-2 font-semibold text-gray-600">Enter your URL</h5>
        <Urlform />

       </div>
    </div>
    </div>
  )
}

export default Homepage
