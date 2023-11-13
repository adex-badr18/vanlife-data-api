import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore/lite";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA1WSt-eDHltrp9t9psXLZVyEFKuBbpuAo",
    authDomain: "go-car-now.firebaseapp.com",
    projectId: "go-car-now",
    storageBucket: "go-car-now.appspot.com",
    messagingSenderId: "564006304003",
    appId: "1:564006304003:web:ed71f7f23bbb4174955136"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);






export async function getVans(id) {
    const url = id ? `/api/vans/${id}` : "/api/vans"
    const res = await fetch(url)
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data.vans
}

export async function getHostVans(id) {
    const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
    const res = await fetch(url)
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data.vans
}

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}