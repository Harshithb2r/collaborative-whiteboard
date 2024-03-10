// Home.js

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import keycloak from '../keycloak';

const Home = () => {
    useEffect(() => {
        // Initialize Keycloak
        keycloak.init({ onLoad: 'login-required' }).then((authenticated) => {
            if (authenticated) {
                console.log("User is authenticated");
                window.location.href = '/whiteboard'; // Redirect to '/whiteboard' after successful authentication
            } else {
                console.log("User is not authenticated");
            }
        });
    }, []);

    const handleLogin = () => {
        keycloak.login();
    };

    const handleLogout = () => {
        keycloak.logout();
    };

    return (
        <div>
            <h1>Welcome to the Collaborative Whiteboard App</h1>
            {keycloak.authenticated ? (
                <button onClick={handleLogout}>Logout</button>
            ) : (
                <button onClick={handleLogin}>Login</button>
            )}
        </div>
    );
};

export default Home;
