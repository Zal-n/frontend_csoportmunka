import { useState, useEffect } from 'react';
import {toast, ToastContainer} from "react-toastify";
import { useNavigate } from 'react-router-dom';

function Register() {
    let navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        const credential = e.target.credential.value;
        const password = e.target.password.value;
        const password_again = e.target.password_again.value;
        
        if(password != password_again){
            toast.error("A jelszavak nem egyeznek!")
        }
        else{
            const res = await fetch("https://api.cookbook.techtrove.ddns.net/auth/register", {
                method: "POST",
                headers: { "Conent-Type": "application/json" },
                body: JSON.stringify({ "credential": credential, "password": password })
            })

            if (res.ok) {
                toast.success("Sikeres regisztráció!");
                navigate("/login")
            }
            else {
                toast.error("Sikertelen regisztráció!");
            }
        }
    }

    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input name='credential' type="text" placeholder='E-mail cím / Felhasználónév' required />
                <input name='password' type="password" placeholder='Jelszó' required />
                <input name='password_again' type="password" placeholder='Jelszó ismét' required />
                <button type='submit'>Regisztráció</button>
            </form>
        </>
    )
}

export default Register;