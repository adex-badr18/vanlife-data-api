import React from "react";
import { useLoaderData } from "react-router-dom";
import { loginUser } from "../api";
import { useState } from "react";

export function loader({ request }) {
    return new URL(request.url).searchParams.get('message');
}

export default function Login() {
    const [loginFormData, setLoginFormData] = React.useState({ email: "", password: "" });
    const message = useLoaderData();
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState(null)

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setStatus('submitting')
            const data = await loginUser(loginFormData);
            console.log(data)
        } catch (error) {
            setError(error);
        } finally {
            setStatus('idle')
        }
    }

    function handleChange(e) {
        const { name, value } = e.target
        setLoginFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="login-container">
            <h1>Sign in to your account</h1>
            {message && <h3 className="error-message">{message}</h3>}
            {error && <h3 className="error-message">{error.message}</h3>}

            <form onSubmit={handleSubmit} className="login-form">
                <input
                    name="email"
                    onChange={handleChange}
                    type="email"
                    placeholder="Email address"
                    value={loginFormData.email}
                />
                <input
                    name="password"
                    onChange={handleChange}
                    type="password"
                    placeholder="Password"
                    value={loginFormData.password}
                />
                <button disabled={status === 'submitting'}>
                    {status === 'submitting' ? 'Logging in...' : 'Log in'}
                </button>
            </form>
        </div>
    )

}