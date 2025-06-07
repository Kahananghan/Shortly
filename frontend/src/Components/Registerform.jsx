import React, { useState } from 'react';
import { registeruser } from '../apis/userapi';
import { useNavigate } from '@tanstack/react-router';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slice/authSlice';

const RegisterForm = ({state}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await registeruser(name, email, password);
      dispatch(login(data.user))
      navigate({to: '/dashboard'});
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError('Registration failed. Email may already be in use.');
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-center">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {isLoading ? 'Creating Account...' : 'Create account'}
        </button>
      </form>
      
      <div className="mt-4 text-center ">
        <p className='cursor-pointer text-sm text-gray-600'>
          Already have an account?{' '}
          <span onClick={() => state(true)} className="text-blue-500">
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;