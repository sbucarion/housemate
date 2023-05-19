import Nav from '../components/Nav'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

const Home = () => {
    const [ isSignUp, setIsSignUp ] = useState(true)
    const [ cookies, setCookie, removeCookie] = useCookies(["user"])


    const navigate = useNavigate()
    const authToken = false

    useEffect(() => {
        if (cookies.authToken) {navigate("/dashboard")}
      });

    const handleClick = () => {
        navigate("/signup")
    }



    return (
        <div className="overlay">
            <Nav minimal={true}/>

            <div className="home">
                {/* When model is false (button not clicked) we display h1 and when clicked we hide h1 */}
                {<h1 className="primary-title">Find Your Next Roomate</h1>}
                <button className="primary-button" onClick={handleClick}>
                    {/* Ternary if statement*/}
                    {authToken ? "Signout" : "Create Account"} 
                </button>

            </div>
        </div>
    )
}

export default Home