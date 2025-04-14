import React, {useState} from 'react';
import { UserAuth } from '../../context/AuthContext';
import GoogleAuth from './GoogleAuth';

const AuthModal = ({ showModal, setShowModal, isLoginFormVisible, setIsLoginFormVisible, onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
   
    const { logIn, signUp } = UserAuth();

    const closeModal = () => {
        setShowModal(false);
    };

    const switchForm = () => {
        setIsLoginFormVisible(!isLoginFormVisible);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (isLoginFormVisible) {
                if (!email || !password) {
                    alert('Please enter a valid email and password.');
                    return;
                }

                await logIn(email, password);
                alert('Logged in successfully.');
                setShowModal(false); // Close the modal after successful login
            } else {
                if (!username || !email || !password) {
                    alert('Please enter a valid username, email, and password.');
                    return;
                }

                await signUp(username, email, password);
                alert('User created and logged in successfully.');
                setShowModal(false); // Close the modal after successful signup
            }

        } catch (error) {
            console.error('Error:', error);
            alert(`An error occurred: ${error.message}. Please try again later.`);
        }

        onLogin();
    };



    return (
        showModal && (
            <div className="fixed z-10 inset-0 overflow-y-auto " style={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(0, 0, 0, 0.2)', zIndex: 9000 }}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-black opacity-20"></div>
                    </div>

                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                    <div className="inline-block align-bottom  rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ">
                        <div className="bg-black bg-opacity-50 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 " style={{ backdropFilter: 'blur(10px)' }}>
                            <div className="sm:flex sm:items-start ">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left ">
                                    <div id="modal-body ">
                                        {isLoginFormVisible ? (
                                            <form id="loginForm" onSubmit={handleSubmit} className="space-y-4">
                                                <h2 className="text-lg leading-6 font-medium text-white">You need to be logged in in order to do that</h2>
                                                <input type="text" placeholder="Email" name="email" id="email" required value={email} onChange={e => setEmail(e.target.value)} className=" w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300" />
                                                <input type="password" placeholder="Password" name="password" id="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300" />
                                                <button type="submit" className="w-full p-3 buttonMain">Login</button>
                                            </form>
                                        ) : (
                                            <form id="signupForm" onSubmit={handleSubmit} className="space-y-4">
                                                <h2 className="text-lg leading-6 font-medium text-white">Sign Up Here</h2>
                                                <input type="text" placeholder="Username" name="username" value={username} onChange={e => setUsername(e.target.value)} className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300" />
                                                <input type="email" placeholder="Email" name="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300" />
                                                <input type="password" placeholder="Password" name="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300" />
                                                <button type="submit" className="w-full p-3  buttonMain">Sign Up</button>
                                            </form>

                                        )}
                                        {isLoginFormVisible ? (
                                            <p className="mt-4 text-white">Don't have an account? <span onClick={switchForm} className="underline cursor-pointer">Sign up here!</span></p>
                                        ) : (
                                            <p className="mt-4 text-white">Already have an account? <span onClick={switchForm} className="underline cursor-pointer">Login here!</span></p>

                                        )}
                                        <div>
                                            <GoogleAuth setShowModal={setShowModal} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-black bg-opacity-50 px-2 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button type="submit" className=" p-3 buttonMain" onClick={closeModal}>
                                Close
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default AuthModal;