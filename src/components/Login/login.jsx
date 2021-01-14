import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
    render() {
        return (
            <div>
                Login page
                <p>Need to create an account?</p>
                <p><Link to="/">Sign Up</Link></p>
            </div>
        )
    }
}

export default Login;