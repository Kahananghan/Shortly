import React, { useState, useEffect } from 'react';
import { loginuser } from '../apis/userapi';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slice/authSlice';
import { useNavigate } from '@tanstack/react-router';

const LoginForm = ({state}) => {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      #google-signin-button {
      }
      #google-signin-button > div,
      #google-signin-button > div > div,
      #google-signin-button iframe,
      #google-signin-button .gsi-material-button {
        width: 100% !important;
        min-width: 100% !important;
        display: block !important;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loginMessage, setLoginMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    document.body.appendChild(script);
    
    script.onload = () => {
      // Clear any existing Google sessions
      if (window.google?.accounts?.id) {
        window.google.accounts.id.cancel();
        window.google.accounts.id.disableAutoSelect();
      }
      
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleGoogleLogin,
        auto_select: false,
        cancel_on_tap_outside: true,
        use_fedcm_for_prompt: false,
        prompt_parent_id: 'google-signin-button'
      });
      
      window.google.accounts.id.renderButton(
        document.getElementById('google-signin-button'),
        { 
          theme: 'outline', 
          size: 'large',
          type: 'standard'
        }
      );
      
        const observer = new MutationObserver(() => {
            const el = document.querySelector('#google-signin-button iframe');
            if (el) {
              el.style.width = '100%';
              el.style.minWidth = '100%';
              el.style.maxWidth = '100%';
            }
          });

          const target = document.getElementById('google-signin-button');
          if (target) {
            observer.observe(target, { childList: true, subtree: true });
          }

          return () => observer.disconnect();
  }
},[])

  const handleGoogleLogin = async (response) => {
    try {
      const result = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: response.credential, isLogin: true })
      });
      const data = await result.json();
      if (data.success) {
        if (data.isNewUser) {
          setError('No account found with this email. Please register first.');
        } else {
          localStorage.setItem('token', data.token);
          dispatch(login(data.user));
          navigate({to: '/home'});
        }
      } else {
        setError('Google login failed');
      }
    } catch (err) {
      setError('Google login failed');
    }
  };



  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const data = await loginuser(email, password); 
      dispatch(login(data.user))
      setLoginMessage('Login successfull! Redirecting...');
    
      setTimeout(() => {
        navigate({to: '/home'});
      }, 1500); 

      setIsLoading(false);
    } catch (err) {
      setError('Invalid email or password');
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-5 p-6 bg-white rounded-lg">
      
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-center">
          {error}
        </div>
      )}
      
      {loginMessage && (
        <div className="mb-4 p-2 bg-green-100 text-green-700 rounded text-center">
          {loginMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
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
        
        <div className="mb-6 relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 pr-10 border rounded"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            )}
          </button>
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      
      <div className="mt-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or</span>
          </div>
        </div>
        
        <div id="google-signin-wrapper" className="mt-4 w-full flex">
          <div id="google-signin-button" className="w-full"></div>
        </div>
        
      </div>
      
      <div className="mt-4 text-center">
        <p className='text-sm text-gray-600 cursor-pointer'>
          Don't have an account?{' '}
          <span onClick={() => state(false)} className="text-blue-500">
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;