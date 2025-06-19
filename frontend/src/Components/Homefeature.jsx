import React from 'react'
import { Zap, BarChart2, Link2 } from 'lucide-react'
import { motion } from 'framer-motion'

const features = [
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'Fast & Simple',
    description: 'Create short links instantly with our streamlined interface. No complex setup required.',
    color: 'blue',
    bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
    iconBg: 'bg-gradient-to-r from-blue-500 to-blue-600',
    hoverColor: 'group-hover:text-blue-600'
  },
  {
    icon: <BarChart2 className="w-8 h-8" />,
    title: 'Track Performance',
    description: 'Get detailed insights with real-time analytics and comprehensive engagement metrics.',
    color: 'purple',
    bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100',
    iconBg: 'bg-gradient-to-r from-purple-500 to-purple-600',
    hoverColor: 'group-hover:text-purple-600'
  },
  {
    icon: <Link2 className="w-8 h-8" />,
    title: 'Custom URLs',
    description: 'Create branded short links with custom slugs that reflect your brand identity.',
    color: 'indigo',
    bgColor: 'bg-gradient-to-br from-indigo-50 to-indigo-100',
    iconBg: 'bg-gradient-to-r from-indigo-500 to-indigo-600',
    hoverColor: 'group-hover:text-indigo-600'
  },
]

const Homefeature = () => {
  return (
    <div className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Why Choose Shortly?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Powerful features designed to make link management simple, effective, and insightful
          </motion.p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`group relative bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden cursor-pointer ${feature.bgColor} max-w-sm mx-auto`}
            >
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/20 to-transparent rounded-full -translate-y-16 translate-x-16"></div>

              {/* Icon */}
              <div className={`${feature.iconBg} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-white">
                  {feature.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className={`text-2xl font-bold mb-4 text-gray-900 ${feature.hoverColor} transition-colors duration-300`}>
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-base">
                {feature.description}
              </p>

              {/* Hover Arrow */}
              <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className={`inline-flex items-center text-sm font-semibold ${feature.hoverColor}`}>
                  Learn more
                  <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Homefeature
