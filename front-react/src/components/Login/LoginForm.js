import axios from 'axios';
import React, { useState } from 'react';

const LoginForm = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://127.0.0.1:1100/api/users/login", {
                email : login,
                password : password
            });
    }

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input type="email" onChange={(e) => setLogin(e.target.value)}></input>
                <input type="password" onChange={(e) => setPassword(e.target.value)}></input>
                <input type="submit" value="Connexion"></input>
            </form>
        </div>
    );
};

export default LoginForm;
