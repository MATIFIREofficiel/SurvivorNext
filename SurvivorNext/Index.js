import DrawerMenu from './Pages/DrawerMenu';
import LoginPage from './Pages/LoginPage';
import React, { useState } from 'react';

export default function ConnectionChecker()
{
    const [isSignedIn, setIsSignedIn] = useState(true);
    const [ApiUser, setApiUser] = useState({});

    if (isSignedIn) {
        return (<DrawerMenu apiUser={ApiUser} setIsSignedIn={setIsSignedIn}/>);
    } else {
        return (<LoginPage setIsSignedIn={setIsSignedIn} setApiUser={setApiUser}/>);
    }
}
