import React, { useState } from 'react';

const SwitchAccount = () => {
    const [loggedInUser, setLoggedInUser] = useState('user1'); // Initial logged in user

    const handleSwitchAccount = () => {
        // Logic to switch account
        const newLoggedInUser = prompt('Enter username of the account you want to switch to:');
        setLoggedInUser(newLoggedInUser);
    };

    return (
        <div>
            <h1>Welcome, {loggedInUser}!</h1>
            <button onClick={handleSwitchAccount}>Switch Account</button>
        </div>
    );
};

export default SwitchAccount;