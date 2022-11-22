import { Link, Navigate, useNavigate } from "react-router-dom"
import logo from "../images/logo.png"
import alt_logo from "../images/logo.png"

const Nav = ({ minimal, setShowModal, showModal, setIsSignUp }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        // using this so we can show the modal when clicking login
        navigate("/Login")
    }

    const handleLogoClick = (e) => {
        e.preventDefault() //must be used so page doesnt navigate on refresh

        (authToken ? navigate("/Dashboard") : navigate("/"))
    }


    const authToken = false
    return (
        <nav>
            <div className="logo-container" onClick={handleLogoClick}>
                <img className="logo" src={minimal ? alt_logo : logo}/>
            </div>

            {!showModal && <button 
            className="nav-button" 
            onClick={handleClick}
            disabled={showModal} //when showModal true it means modal is open so we turn off log in button since modal is already open
            >Log In</button>}
        </nav>
    )
}

export default Nav