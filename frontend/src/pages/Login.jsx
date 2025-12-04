import {toast} from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login({setIsLoggedIn}){
    let navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        
        const username = e.target.username.value;
        const password = e.target.password.value;
        console.log(username)
        console.log(password)

        const res = await fetch("https://api.cookbook.techtrove.ddns.net/auth/login", {
            method: "POST",
            headers: { "Conent-Type": "application/json" },
            body: JSON.stringify({ "username": username, "password": password})
        })
        
        if (res.ok) {
            toast.success("Sikeres bejelentkezés!");
            setIsLoggedIn(true);
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

        <h3>Még nem regisztráltál?</h3>
        
        <button onClick={() => navigate("/register")}>Regisztráció</button>




        </>
    )
}

export default Login;