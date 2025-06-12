import React from 'react'

const Homefeature = () => {
  return (
    <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="text-blue-600 text-xl mb-3">⚡</div>
        <h3 className="font-bold text-lg mb-2">Fast & Simple</h3>
        <p className="text-gray-600">Create short links instantly with no registration required</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="text-blue-600 text-xl mb-3">📊</div>
        <h3 className="font-bold text-lg mb-2">Track Performance</h3>
        <p className="text-gray-600">Monitor clicks and engagement with detailed analytics</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="text-blue-600 text-xl mb-3">🔗</div>
        <h3 className="font-bold text-lg mb-2">Custom URLs</h3>
        <p className="text-gray-600">Create branded links with your own custom slugs</p>
        </div>
    </div>
  )
}

export default Homefeature
