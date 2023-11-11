import { redirect } from "react-router-dom";

export async function requireAuth(request) {
    const isLoggedIn = JSON.parse(localStorage.getItem('loggedIn')) || false;
    const pathname = new URL(request.url).pathname;

    if (!isLoggedIn) {
        throw redirect(`/login?message=You must login first&redirectTo=${pathname}`);
    }
}