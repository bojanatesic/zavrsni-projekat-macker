import React, { useState, useEffect } from 'react'
import { GetUser } from '../../../services/Coetus_service'
import Nav from '../../../Nav'
import './Profile.css'

const Profile = () => {
    const [userInfo, setUserInfo] = useState({
        name: '',
        surname: '',
        username: '',
        email: '',
    })

    let userId = localStorage.getItem('id')
    useEffect(() => {
        GetUser(userId).then(data => {
            setUserInfo({ name: data.user.name, surname: data.user.surname, username: data.user.username, email: data.user.email })
            console.log(data)
        })
    }, [userId])

    return (
        <>
            <Nav />
            <div id="profile">
                <p>{`Here is your profile,`} <b> {userInfo.username}</b></p>
                <p>{`Your name is: ${userInfo.name}`}</p>
                <p>{`Your surname is: ${userInfo.surname}`}</p>
                <p>{`Your email is: ${userInfo.email}`}</p>
            </div>
        </>
    )
}

export default Profile