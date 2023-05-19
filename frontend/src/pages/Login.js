import { useState, useEffect } from "react"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

const Login = () => {
    const [ cookies, setCookie, removeCookie ] = useCookies(["user"])
    const navigate = useNavigate()

    const [ badLogin, setBadLogin ] = useState(false)
    const [ formData, setFormData ] = useState({
        "username": "",
        "password": "",
    })

    //Redirects if already logged in
    useEffect(() => {
        if (cookies.authToken) {navigate("/dashboard")}
      });



    const handleChange = (e) => {
        const value = e.target.value
        const name = e.target.name

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))

    }


    const handleLogin = async (e) => {
        // where we collect token from django to set as cookie
        e.preventDefault()
        // const stringFormData = JSON.stringify(formData) -> may be useful in the fuuture but kept giving us 400 responses

        try{
            axios.defaults.headers.common["Content-Type"] = "application/json"

            // I cant tell you why we have to pass in the individual form data and not just the form itself
            const response = await axios.post("http://127.0.0.1:8000/api/getAuthToken/", { "username": formData["username"], "password": formData["password"] })

            // Dobule check to make sure we got right response (anything other than 200 will result in err and get caught)
            if (response.status === 200){
                setCookie('authToken', response.data.access)
                setCookie('refreshToken', response.data.refresh)
                navigate('/dashboard')
            }

        }
            
        catch (err) {
            if (err.response.status){
                setBadLogin(true)
            }
        }

        return
    }



    return(
        <>
        <div>
        <form>
            <section>
                <div className="Login">

                    <div className="input_container">

                        <label>Email</label>
                        <div id="input-field">
                            <input
                                id="email"
                                type="email"
                                name="username" 
                                placeholder="Email"
                                required={true}
                                value={formData.username}
                                onChange={handleChange}/>

                        </div>
                    </div>


                    <div className="input_container">

                        <label>Password</label>
                        <div id="input-field">
                        <input
                                id="password"
                                type="password"
                                name="password" 
                                placeholder="Password"
                                required={true}
                                value={formData.password}
                                onChange={handleChange}/>

                        </div>
                    </div>

                    <div placeholder="Login">

                        <button onClick={handleLogin}>Login</button>

                    </div>

                </div>
                {badLogin && <div>User Not Found</div>}
            </section>
        </form>
        </div>
        </>
    )
}

export default Login