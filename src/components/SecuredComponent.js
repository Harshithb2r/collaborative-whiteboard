// SecuredComponent.js

import React from 'react';
import withAuthentication from './withAuthentication.js';

const SecuredComponent = () => {
    return (
        <div>
            <h1>Secured Component</h1>
            <p>This component is protected and only visible to authenticated users.</p>
        </div>
    );
};

export default withAuthentication(SecuredComponent);
