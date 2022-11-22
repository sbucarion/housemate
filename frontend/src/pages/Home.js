import Nav from '../components/Nav'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const [showModal, setShowModal] = useState(false)
    const [isSignUp, setIsSignUp] = useState(true)

    const navigate = useNavigate()
    const authToken = false

    const handleClick = () => {
        navigate("/signup")
    }

    return (
        <div className="overlay">
        <Nav minimal = {false} 
             setShowModal={setShowModal} 
             showModal={showModal} 
             setIsSignUp={setIsSignUp}/>

            <div className="home">
                {/* When model is false (button not clicked) we display h1 and when clicked we hide h1 */}
                {!showModal && <h1 className="primary-title">Find Your Next Roomate</h1>}
                <button className="primary-button" onClick={handleClick}>
                    {/* Ternary if statement*/}
                    {authToken ? "Signout" : "Create Account"} 
                </button>

            </div>
        </div>
    )
}

export default Home