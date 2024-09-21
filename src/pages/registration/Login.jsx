import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/Firebase';
import Loader from '../../components/loader/loading';
import { toast } from 'react-toastify';
import myContext from '../../context/data/myContext';

const Login = () => {
  const context = useContext(myContext);
  const { loading, setLoading, mode } = context; // Access the mode from context
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const login = async () => {
    const { email, password } = userDetails;
    if (!email || !password) {
      return toast.error('Please enter all the required fields');
    }
    setLoading(true);

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('user', JSON.stringify(result));
      toast.success('Logged in successfully');
      setLoading(false);
      navigate('/');
      window.location.reload();
      console.log(result)
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error('Login failed');
    }
  };

  return (
    <>
      <Layout>
        <div
          className={`flex justify-center items-center h-screen transition-colors duration-30 ${mode === 'dark' ? 'bg-gray-800' : 'bg-[#A08161]'}`}>
          {loading && <Loader />}
          <div
            className={`px-10 py-10 rounded-lg shadow-lg max-w-md w-full space-y-8 transition-colors duration-300 ${mode === 'dark' ? 'bg-gray-800' : 'bg-[#A69080]'
              }`}
          >
            <div>
              <h1
                className={`text-center text-3xl font-bold transition-colors duration-300 ${mode === 'dark' ? 'text-gray-200' : 'text-white'
                  }`}
              >
                Login
              </h1>
            </div>
            <div className="space-y-4">
              <input
                type="email"
                value={userDetails.email}
                onChange={handleChange}
                name="email"
                className={`w-full px-4 py-2 rounded-md outline-none placeholder-gray-200 transition-colors duration-300 ${mode === 'dark'
                  ? 'bg-gray-700 text-gray-200 focus:bg-gray-600'
                  : 'bg-[#93785B] text-white focus:bg-[#AC8968]'
                  }`}
                placeholder="Email"
              />
              <input
                type="password"
                name="password"
                value={userDetails.password}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-md outline-none placeholder-gray-200 transition-colors duration-300 ${mode === 'dark'
                  ? 'bg-gray-700 text-gray-200 focus:bg-gray-600'
                  : 'bg-[#93785B] text-white focus:bg-[#AC8968]'
                  }`}
                placeholder="Password"
              />
            </div>
            <div className="flex justify-center mt-6">
              <button
                onClick={login}
                className={`w-full py-2 font-bold rounded-md transition duration-300 ${mode === 'dark'
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-[#594d3f] hover:bg-[#f2d0ac] text-white'
                  }`}
              >
                Login
              </button>
            </div>
            <div className="text-center">
              <h2
                className={`transition-colors duration-300 ${mode === 'dark' ? 'text-gray-300' : 'text-white'
                  }`}
              >
                New to our service?{' '}
                <Link
                  className={`font-bold transition-colors duration-300 ${mode === 'dark' ? 'text-yellow-400' : 'text-yellow-500'
                    }`}
                  to="/signup"
                >
                  Sign up
                </Link>
              </h2>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Login;
