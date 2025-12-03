import {toast, ToastContainer} from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login(){
    let navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(e.target.username.value)

        const username = e.target.username.value;
        const password = e.target.password.value;

        const res = await fetch("http://localhost:3003/login", {
            method: "POST",
            headers: { "Conent-Type": "application/json" },
            body: JSON.stringify({ "username": username, "password": password})
        })
        
        if (res.ok) {
            toast.success("Sikeres bejelentkezés!");
        }
        else {
            toast.error("Sikertelen bejelentkezés!");
        }
    }

    return(
        <>
        <h1>Login</h1>
        
        <form onSubmit={handleSubmit}>
                <input name='username' type="text" placeholder='Felhasználónév' required />
                <input name='password' type="password" placeholder='Jelszó' required />
                <button type='submit'>Bejelentkezés</button>
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

        <h3>Még nem regisztráltál?</h3>
        
        <button onClick={() => navigate("/register")}>Regisztráció</button>




        </>
    )
}

export default Login;