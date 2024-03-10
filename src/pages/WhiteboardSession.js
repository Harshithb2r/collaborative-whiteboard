import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as emailjs from 'emailjs-com';

const WhiteboardSession = () => {
    const [email, setEmail] = useState('');

    const handleInvite = () => {
        // Send invitation email to the specified email address
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', { to_email: email }, 'YOUR_USER_ID')
            .then((response) => {
                console.log('Email sent successfully:', response);
                // Optionally, display a success message to the user
            })
            .catch((error) => {
                console.error('Error sending email:', error);
                // Optionally, display an error message to the user
            });
    };

    return (
        <div>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1">Whiteboard</span>
                </div>
            </nav>
            <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
                <div className="card p-5 border-0 shadow-lg">
                    <h2 className="text-center mb-4">Invite Others to Join</h2>
                    <div className="input-group mb-3">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button className="btn btn-primary" onClick={handleInvite}>Send Invitation</button>
                    </div>
                    <div className="text-center mb-3">
                        <span className="fw-bold">OR</span>
                    </div>
                    <div className="text-center">
                        <Link to={'/board'} className="btn btn-primary">Continue to Whiteboard</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhiteboardSession;
