// withAuthentication.js

import React, { Component } from 'react';
import keycloak from '../keycloak';

const withAuthentication = (WrappedComponent) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                authenticated: false,
            };
        }

        componentDidMount() {
            keycloak.init({ onLoad: 'login-required' })
                .then((authenticated) => {
                    this.setState({ authenticated });
                })
                .catch((error) => console.error('Authentication error:', error));
        }

        render() {
            return this.state.authenticated ? <WrappedComponent {...this.props} /> : null;
        }
    };
};

export default withAuthentication;
