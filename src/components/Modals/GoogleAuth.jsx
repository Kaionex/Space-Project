import React from 'react';
// import { useNavigate } from 'react-router-dom';

import 'firebase/auth';

import { UserAuth } from '../../context/AuthContext';

const GoogleAuth = ({ setShowModal }) => {
    const { signInWithGoogle } = UserAuth();

    const logGoogleUser = async () => {
        try {
            await signInWithGoogle();
            setShowModal(false);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
      <div className="mt-4">
    <span style={{ color: 'white' }}>Or continue with </span>
    <button
        onClick={logGoogleUser}
        className="text-white underline inline-flex items-center"
    >
        <img
            className="w-4 h-4"
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google logo"
        />
        <span>oogle!</span>
    </button>
</div>
    )
}

export default GoogleAuth;