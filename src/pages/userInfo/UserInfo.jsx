import React, { useContext } from 'react';
import Layout from '../../components/layout/Layout';
import myContext from '../../context/Data/myContext';

const UserInfo = () => {
    const context = useContext(myContext);
    const { loggedInUser, mode, deleteAccount } = context;



    return (
        <Layout>
            <section className="p-4">
                <div className={`p-6 rounded-lg shadow-lg max-w-md mx-auto m-6 ${mode === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <h1 className={`text-2xl sm:text-3xl font-extrabold mb-4 ${mode === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                        Hi, {loggedInUser?.name
                            ? `${loggedInUser.name.split(' ')[0].charAt(0).toUpperCase() + loggedInUser.name.split(' ')[0].slice(1).toLowerCase()}`
                            : 'Guest'
                        }
                    </h1>

                    <div className="space-y-4">
                        <div className={`p-4 rounded-lg shadow-sm flex flex-col sm:flex-row items-start sm:items-center ${mode === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                            <span className={`font-semibold w-full sm:w-1/3 ${mode === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Full Name:</span>
                            <span className={`${mode === 'dark' ? 'text-gray-200' : 'text-gray-800'} sm:ml-4`}>{loggedInUser?.name}</span>
                        </div>

                        <div className={`p-4 rounded-lg shadow-sm flex flex-col sm:flex-row items-start sm:items-center ${mode === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                            <span className={`font-semibold w-full sm:w-1/3 ${mode === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Email:</span>
                            <span className={`${mode === 'dark' ? 'text-gray-200' : 'text-gray-800'} sm:ml-4`}>{loggedInUser?.email}</span>
                        </div>

                        <div className={`p-4 rounded-lg shadow-sm flex flex-col sm:flex-row items-start sm:items-center ${mode === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                            <span className={`font-semibold w-full sm:w-1/3 ${mode === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Joined:</span>
                            <span className={`${mode === 'dark' ? 'text-gray-200' : 'text-gray-800'} sm:ml-4`}>
                                {loggedInUser?.time && new Date(loggedInUser.time.seconds * 1000).toLocaleDateString()}
                            </span>
                        </div>
                        <div className={`p-4 rounded-lg shadow-sm flex flex-col sm:flex-row items-start sm:items-center ${mode === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                            <span className={`font-semibold w-full sm:w-1/3 ${mode === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>UID:</span>
                            <span className={`${mode === 'dark' ? 'text-gray-200' : 'text-gray-800'} sm:ml-4`}>
                                {loggedInUser?.uid}
                            </span>
                        </div>

                    </div>
                </div>

                <div className="text-right">
                    <button
                        className={`px-4 py-2 rounded text-sm font-semibold ${mode === 'dark' ? 'bg-red-500 text-white' : 'bg-red-600 text-white'}`}
                        onClick={deleteAccount}
                    >
                        Delete Account
                    </button>
                </div>
            </section>
        </Layout>
    );
};

export default UserInfo;
