import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, fireDb } from '../../firebase/Firebase';
import { addDoc, collection, doc, getDoc, Timestamp } from 'firebase/firestore';
import Loader from '../../components/loader/loading';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FaGoogle } from "react-icons/fa";
import myContext from '../../context/Data/myContext';



const Signup = () => {
  const context = useContext(myContext);
  const { loading, setLoading, mode } = context; // Access the mode from context

  const [inputValue, setInputValue] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const getValue = (e) => {
    const { name, value } = e.target;
    setInputValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const signup = async (e) => {
    e.preventDefault();

    const { name, email, password } = inputValue;

    if (name === '' || email === '' || password === '') {
      return toast.error('All fields are required');
    }

    setLoading(true);

    try {
      const users = await createUserWithEmailAndPassword(auth, email, password);

      const user = {
        name: name,
        uid: users.user.uid,
        email: users.user.email,
        time: Timestamp.now(),
      };

      const userRef = collection(fireDb, 'users');
      await addDoc(userRef, user);

      toast.success('Signed up successfully');
      setInputValue({
        name: '',
        email: '',
        password: '',
      });
      navigate('/login');
      console.log(user)
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        toast.error('Already registered, please login to continue');
      } else {
        toast.error('There has been an error during signup');
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Google sign-up / login function
  const googleSignup = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);

    try {
      // Sign in with Google Popup
      const result = await signInWithPopup(auth, provider);

      // Check if user already exists in Firestore
      const userRef = doc(fireDb, 'users', result.user.uid);
      const userDoc = await getDoc(userRef);
      // console.log(result)
      // If user doesn't exist, add to Firestore
      if (!userDoc.exists()) {
        const user = {
          name: result.user.displayName,
          uid: result.user.uid,
          email: result.user.email,
          time: Timestamp.now(),
        };

        await addDoc(collection(fireDb, 'users'), user);
        console.log(user)
        toast.success('Signed up and logged in with Google successfully');
      } else {
        toast.success('Logged in with Google successfully');
      }

      // Save user details to local storage
      localStorage.setItem('user', JSON.stringify(result.user));

      // Redirect to the homepage or dashboard
      navigate('/');
      window.location.reload();
    } catch (error) {
      toast.error('Google signup/login failed');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Layout>
        <div
          className={`flex justify-center items-center h-screen transition-colors duration-300 ${mode === 'dark'
            ? 'bg-gradient-to-b from-gray-800 to-gray-900'
            : 'bg-gradient-to-b from-[#93785B] to-[#AC8968]'
            }`}
        >
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
                Sign Up
              </h1>
            </div>
            <form onSubmit={signup} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={inputValue.name}
                  onChange={getValue}
                  name="name"
                  className={`w-full px-4 py-2 rounded-md outline-none placeholder-gray-200 transition-colors duration-300 ${mode === 'dark'
                    ? 'bg-gray-700 text-gray-200 focus:bg-gray-600'
                    : 'bg-[#93785B] text-white focus:bg-[#AC8968]'
                    }`}
                  placeholder="Name"
                />
              </div>

              <div>
                <input
                  type="email"
                  value={inputValue.email}
                  onChange={getValue}
                  name="email"
                  className={`w-full px-4 py-2 rounded-md outline-none placeholder-gray-200 transition-colors duration-300 ${mode === 'dark'
                    ? 'bg-gray-700 text-gray-200 focus:bg-gray-600'
                    : 'bg-[#93785B] text-white focus:bg-[#AC8968]'
                    }`}
                  placeholder="Email"
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  value={inputValue.password}
                  onChange={getValue}
                  className={`w-full px-4 py-2 rounded-md outline-none placeholder-gray-200 transition-colors duration-300 ${mode === 'dark'
                    ? 'bg-gray-700 text-gray-200 focus:bg-gray-600'
                    : 'bg-[#93785B] text-white focus:bg-[#AC8968]'
                    }`}
                  placeholder="Password"
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className={`w-full py-2 font-bold rounded-md transition duration-300 ${mode === 'dark'
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-[#594d3f] hover:bg-[#f2d0ac] text-white'
                    }`}
                >
                  Sign Up
                </button>
              </div>
            </form>
            <div className="flex justify-center mt-4">
              <button
                onClick={googleSignup}
                className={`w-full py-2 font-bold rounded-md flex items-center justify-center transition duration-300 ${mode === 'dark'
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-[#4285F4] hover:bg-[#357ae8] text-white'
                  }`}
              >
                <FaGoogle className="mr-2" /> Continue with Google
              </button>
            </div>

            <div className="text-center">
              <h2
                className={`transition-colors duration-300 ${mode === 'dark' ? 'text-gray-300' : 'text-white'
                  }`}
              >
                Have an account?{' '}
                <Link
                  className={`font-bold transition-colors duration-300 ${mode === 'dark' ? 'text-yellow-400' : 'text-yellow-500'
                    }`}
                  to={'/login'}
                >
                  Login
                </Link>
              </h2>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Signup;
