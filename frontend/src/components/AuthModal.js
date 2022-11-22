import { useState } from "react"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

const AuthModal = ({ setShowModal, setIsSignUp, isSignUp }) => {
    const [ email, setEmail ] = useState(null)
    const [ password, setPassword ] = useState(null)
    const [ confirmPassword, setConfirmPassword ] = useState(null)
    const [ error, setError ] = useState(null)
    const [ cookies, setCookie, removeCookie] = useCookies(null)

    const navigate = useNavigate();

    const handleClick = () => {
        // using this so we can show the modal when clicking create acc
        setShowModal(false)
    }

    const handleSubmit = async (e) => {
        // prevents page from refreshing when submitting form
        e.preventDefault()
        try {
            if( isSignUp && ( password !== confirmPassword )) {
                alert("Passwords Do Not Match")
                return
            }

            else{
                // Write Post Request
                const response = await axios.post(`http://localhost:8000/${isSignUp ? 'signup' : 'login'}`, { email, password })
                
                setCookie('AuthToken', response.data.token)
                setCookie('UserId', response.data.userId)
                
                const success = response.status == 201

                if (success && isSignUp) navigate('/onboarding')
                if (success && !isSignUp) navigate('/dashboard')
            }
    
        }
        catch (error) {
            alert("Error should come from backend saying user already singed up but it only says axios error and not the rest")
        }
    }


    return (
        <div className="auth-modal">
            {/* divs are clickable objects when using onClick */}
            <div className="close-icon" onClick={handleClick}>X</div>
            <h2>{isSignUp ? "CREATE ACCOUNT" : "LOG IN"}</h2>
            <p>A NS ENTERPRISE PRODUCT</p>
            <form onSubmit={handleSubmit}>
                {/* the e in e.target.value stands for event */}
                {/* so on change takes in an event and we update the */}
                {/* set state to reflect the new change in value */}
                {/* the (e) => is just like a lambda function */}
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email"
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {isSignUp && <input
                    type="password"
                    id="password-check"
                    name="password-check"
                    placeholder="confirm password"
                    required={true}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />}
                <input className="secondary-button" type="submit"/>
            </form>
            <hr/>
            <h2>GET THE APP</h2>
        </div>
    )
}

export default AuthModal