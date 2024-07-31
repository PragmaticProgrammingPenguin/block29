import axios from "axios";
import React, {useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Login( { setToken, token }) {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({})

    useEffect(() => {
        if (token) {
            navigate("/")
        }
    }, [token])
    const handleInput = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    
    const handleSubmit = (e) =>{
        e.preventDefault()
        try {
            axios
                .post(`https://fsa-jwt-practice.herokuapp.com/signup`, formData)
                .then((response) => {
                    if(response.data.success){
                        localStorage.setItem("token", response.data.token)
                        setToken(response.data.token)
                        navigate("/")
                    }
                })
                .catch(
                    (err) => console.log(err)
                )
        } catch (err){
            console.log(err)
        }
    }
    
    return (
        <div>
            <h1>Login to use Puppybowl</h1>
            <Link to="/">Home</Link>
            <form>
                <label>
                    Username:
                    <input type="text" name="username" onSubmit={handleInput} />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" onSubmit={handleInput} />
                </label>
                <button>Submit</button>
            </form>
        </div>
    )
}