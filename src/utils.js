import { redirect } from "react-router-dom";

export async function requireAuth() {
    const isLoggedIn = JSON.parse(localStorage.getItem('loggedIn')) || false;

    if (!isLoggedIn) {
        throw redirect('/login?message=You must login first');
    }
}