import React from 'react'
import { useEffect } from 'react'
import axiosInstance from '../utils/axiosInstance'
import UserProvider from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

const AuthSuccess = () => {
    const { setUser } = UserProvider()
    const navigate = useNavigate()
    useEffect(() => {
        const handleAuth = async () => {
            const params = new URLSearchParams(window.location.search)
            console.log(params);
            const accessToken = params.get("token")
            console.log("Token", accessToken);

            if (accessToken) {
                localStorage.setItem("accessToken", accessToken)
                try {
                    const res = await axiosInstance.get("http://localhost:4000/auth/me", {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    })
                    if (res.data.success) {
                        setUser(res.data.user)  //save user in context api store
                        navigate("/")
                    }
                } catch (error) {
                    console.error("Error fetching user:", error)
                }
            }
        }
        handleAuth();
    }, [navigate])
    return (
        <h2>
            Logging in...
        </h2>
    )
}

export default AuthSuccess
