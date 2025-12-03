import { useState, useEffect } from 'react';
import {toast, ToastContainer} from "react-toastify";

function Register() {

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(e.target.username.value)

        const username = e.target.username.value;
        const password = e.target.password.value;
        const password_again = e.target.password_again.value;

        const res = await fetch("", {
            method: "POST",
            headers: { "Conent-Type": "application/json" },
            body: JSON.stringify({ "username": username, "password": password, "password_again": password_again })
        })
        
        if (res.ok) {
            toast.success("Sikeres regisztráció!");
        }
        else {
            toast.error("Sikertelen regisztráció!");
        }
    }

    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input name='username' type="text" placeholder='Felhasználónév' required />
                <input name='password' type="password" placeholder='Jelszó' required />
                <input name='password_again' type="password" placeholder='Jelszó ismét' required />
                <button type='submit'>Regisztráció</button>
            </form>

            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />


        </>
    )
}

export default Register;