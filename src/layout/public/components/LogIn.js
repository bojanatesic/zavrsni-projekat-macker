import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { PostUser } from '../../../services/Coetus_service'
import { setToken } from '../../../services/Auth_service'
import './EntryPage.css'



export const LogIn = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory();

    const handleLogin = (e) => {
        e.preventDefault()
        if (username.trim() === '' || password.trim() === '') {
            return alert('Inputs cannot be empty!')
        }
        PostUser(username,password).then ((res) => {
            setToken(res.data.token)
            console.log(res)
            history.push('about')
        }).catch(() => {
            alert('You must Sign up!')
        })
    }

    
    return (
        <div className="form-style-8">
        <h2>Login to Macker</h2>
        <form onSubmit={handleLogin} id="login-form">
            <input type="text" name="field1" placeholder="Username" onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <input type="submit" value="LogIn" />
        </form>
        </div>
    )
}
