import React, { useState } from 'react'
import LoginForm from '../Components/Loginform'
import RegisterForm from '../Components/Registerform'

const Authpage = () => {
    const [Login, setLogin] = useState(true);

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
       <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">URL Shortener</h2>
            
            {Login ? <LoginForm  state={setLogin} /> : <RegisterForm  state={setLogin} />}

       </div>
    </div>
    </div>
  )
}

export default Authpage
