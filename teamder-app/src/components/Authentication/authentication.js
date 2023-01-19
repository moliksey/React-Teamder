import React, { useState } from 'react';
import axios from 'axios';
import { DOMEN_SERVER, DOMEN_SITE } from '../../config/const';


export default function Authentication () {
    const [auth, setAuth] = useState(() => {
        return {
            username: "",
            password: "",
        }
    })

    const changeInputAuth = event => {
        event.persist()
        setAuth(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
    }


    const submitChackin = event => {
        event.preventDefault();
        if(!auth.username) {
            alert("You did not enter nickname")
        } else if(!auth.password) {
            alert("You did not enter password")
        } else {
            axios.post(DOMEN_SERVER + "/login", {
                username: auth.username,
                password: auth.password,
            }).then(res => {
                if (res.data) {
                    window.location.href = DOMEN_SITE + "/"
                    if(res.data.token)
                    localStorage.setItem('token', res.data.token);
                    else alert("There are no token")
                } else {
                    alert("You entered the wrong password or nickname")
                }
            }).catch(() => {
                alert("An error occurred on the server")
            })
        }
    }
    return(<div className="form">
        <h2>Register user:</h2>
        <form onSubmit={submitChackin}>
            <p>Name: <input
                type="username"
                id="username"
                name="username"
                value={auth.username}
                onChange={changeInputAuth}
            /></p>
            <p>Password: <input
                type="password"
                id="password"
                name="password"
                value={auth.password}
                onChange={changeInputAuth}
            /></p>
            <input type="submit"/>
        </form>
    </div>);
}