import React from 'react'
import LoginComponent from '../auth/login/Login'
import {Link} from 'react-router-dom'


export default function Login() {
    return (
    <main>
        <section className="login-form">
            <h1 className="title">Portfolio Management</h1>
            <LoginComponent/>
            <div>
                <Link to="/">Forgot Password</Link>
                <p>or Sign up <Link to="/signup">Here</Link></p>
            </div>
    </section>
    </main>
    )
}
