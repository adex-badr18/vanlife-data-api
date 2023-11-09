import React from "react";
import { Link, NavLink, redirect } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { BiLogOutCircle } from "react-icons/bi";

export default function Header() {
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    const isLoggedIn = JSON.parse(localStorage.getItem('loggedIn'));

    function fakeLogOut() {
        localStorage.removeItem('loggedIn');
        redirect('/login', { replace: true });
    }

    return (
        <header>
            <Link className="site-logo" to="/">#VanLife</Link>
            <nav>
                <NavLink
                    to="host"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Host
                </NavLink>
                <NavLink
                    to="about"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    About
                </NavLink>
                <NavLink
                    to="vans"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Vans
                </NavLink>
                <Link to="login" className="login-link">
                    <RxAvatar className="login-icon" />
                </Link>

                {
                    isLoggedIn &&
                    <button className="login-link" onClick={fakeLogOut}>
                        <BiLogOutCircle className="login-icon" />
                    </button>
                }

            </nav>
        </header>
    )
}