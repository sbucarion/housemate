import { useState, useEffect } from "react"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

const Dashboard = () => {
    const [ cookies, setCookie, removeCookie ] = useCookies(["user"])
    const navigate = useNavigate()

    useEffect(() => {
        if (!cookies.authToken) {navigate("/login")}
      });


    return(<h1>Dashboard</h1>)
}

export default Dashboard