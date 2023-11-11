import React from "react";
import { useLoaderData, Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { loginUser } from "../api";
import { useState } from "react";

export function loader({ request }) {
    return new URL(request.url).searchParams.get('message');
}

export async function action({ request }) {
    const formData = await request.formData();
    const email = formData.get('email');
    const password = formData.get('password');

    const redirectTo = new URL(request.url).searchParams.get('redirectTo') || '/host';

    try {
        const user = await loginUser({email, password});
        localStorage.setItem('loggedIn', true);
        return redirect(redirectTo);    
    } catch (error) {
        return error;
    }
}

export default function Login() {
    const message = useLoaderData();
    const navigation = useNavigation();
    const error = useActionData();

    return (
        <div className="login-container">
            <h1>Sign in to your account</h1>
            {message && <h3 className="error-message">{message}</h3>}
            {error && <h3 className="error-message">{error.message}</h3>}

            <Form method="post" className="login-form" replace>
                <input
                    name="email"
                    type="email"
                    placeholder="Email address"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                />
                <button disabled={navigation.state === 'submitting'}>
                    {navigation.state === 'submitting' ? 'Logging in...' : 'Log in'}
                </button>
            </Form>
        </div>
    )

}