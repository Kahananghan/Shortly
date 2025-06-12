import React, { useState } from 'react'
import LoginForm from './Loginform';
import RegisterForm from './Registerform';

const Rightauth = () => {

  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="w-full md:w-1/2 bg-white p-8">
          <div className="mb-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h3>
            <p className="text-gray-500 mt-2">
              {isLogin ? 'Sign in to access your account' : 'Register to get started'}
            </p>
          </div>
          
          <div className="mb-6">
            <div className="flex border-b border-gray-200">
              <button 
                onClick={() => setIsLogin(true)}
                className={`w-1/2 py-2 text-center font-medium ${isLogin ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              >
                Sign In
              </button>
              <button 
                onClick={() => setIsLogin(false)}
                className={`w-1/2 py-2 text-center font-medium ${!isLogin ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              >
                Register
              </button>
            </div>
          </div>
          
          {isLogin ? <LoginForm state={setIsLogin} /> : <RegisterForm state={setIsLogin} />}
        </div>
  )
}

export default Rightauth
