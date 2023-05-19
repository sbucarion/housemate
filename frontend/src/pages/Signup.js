import Nav from '../components/Nav'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'

const Signup = () => {
    const [ hidePage1, setHidePage1 ] = useState(true)
    const [ hidePage2, setHidePage2 ] = useState(false)
    const [ hidePage3, setHidePage3 ] = useState(false)

    const [formData, setFormData] = useState({
        // Personal Data
        user_id: "", // Send empty to backend and generate at INSERT and send back in response and save to database
        first_name: "",
        last_name: "",
        email: "",
        dob: "",
        region:"",
        city:"",
        state:"",
        gender_identity:"",
        password: "",
        re_password:"",
        roomate_gender_identity: "male",
        show_gender: false,
        roomate_age: 0,
        matches: [],
        long:"",
        lat:""

        // Preference Data
    })

    const [ cookies, setCookie, removeCookie] = useCookies(["user"])
    const navigate = useNavigate()

    // Redirect if already logged in
    useEffect(() => {
        if (cookies.authToken) {navigate("/dashboard")}
      });


    //Update form when user changes or adds to a field
    const handleChange = (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
        const name = e.target.name

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))

        console.log(formData)
    }


    const handlePageOne = (e) => {
        // validates passwords are the same and moves on
        e.preventDefault()

        if (formData.password !== formData.re_password) {
            alert("Passwords Do Not Match")
        }
        else{
            setHidePage1(false)
            setHidePage2(true)
        }
    }

    const handleSubmit = (e) => {
        return
    }


    
    return(
        <div className="signup">
            {/* Add any non form stuff outside of here */}
            <form>
                <div className="signup-form">

                    {hidePage1 && <section>
                        <div className="page1-form">
                            <div className="input_container">
                                <label>First Name</label>
                                <div id="input_field">
                                    <input
                                        id="first_name"
                                        type="text"
                                        name="first_name"
                                        placeholder="First Name"
                                        required={true}
                                        value={formData.first_name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="input_container">
                                <label>Last Name</label>
                                <div id="input_field">
                                    <input
                                        id="last_name"
                                        type="text"
                                        name="last_name"
                                        placeholder="Last Name"
                                        required={true}
                                        value={formData.last_name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>


                            <div className="input_container">
                                <label>Email</label>
                                <div id="input_btn">
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        required={true}
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div> 

                            <div className="password-container">
                                <div className="input_container">
                                    <label>Password</label>
                                    <div id="input_btn">
                                        <input
                                            id="password"
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            required={true}
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="input_container">
                                <label>Confirm Password</label>
                                    <div id="input_btn">  
                                        <input
                                            id="re_password"
                                            type="password"
                                            name="re_password"
                                            placeholder="Confirm Password"
                                            required={true}
                                            value={formData.re_password}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="movement_buttons">
                            <div>
                                <button type="button" onClick={(e) => (navigate("/"))}>Back</button>
                            </div>
                            
                            <div>
                                <button type="button" onClick={handlePageOne}>Next</button>
                            </div>
                        </div>

                    </section>}



                     {hidePage2 && <section>
                         <div className="page2-form">
                             {/* User info here */}
                             <div className="input_container">
                                 <label>Date of Birth</label>
                                     <div id="input_btn">  
                                         <input
                                            id="dob"
                                            type="date"
                                            name="dob"
                                            placeholder="Date of Birth"
                                            required={true}
                                            value={formData.dob}
                                            onChange={handleChange}
                                        />
                                    </div>
                            </div>

                            <div className="location_container">
                                <div className="input_container">
                                    <label>Neighborhood</label>
                                    <div id="input_btn">
                                        <input
                                            id="region"
                                            type="text"
                                            name="region"
                                            placeholder="Neighborhood"
                                            required={true}
                                            value={formData.region}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="input_container">
                                    <label>City</label>
                                    <div id="input_btn">
                                        <input
                                            id="city"
                                            type="text"
                                            name="city"
                                            placeholder="City"
                                            required={true}
                                            value={formData.city}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="input_container">
                                    <label>State</label>
                                    <div id="input_btn">
                                        <input
                                            id="state"
                                            type="text"
                                            name="state"
                                            placeholder="State"
                                            required={true}
                                            value={formData.state}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>


                            <div className="gender_container">
                                <div className="input_container">
                                    <label>Male</label>
                                    <input
                                        id="male-gender-identity"
                                        type="radio"
                                        name="gender_identity"
                                        value="male"
                                        onChange={handleChange}
                                        checked={formData.gender_identity === "male"}
                                    />
                                </div>

                                <div className="input_container">
                                    <input
                                        id="woman-gender-identity"
                                        type="radio"
                                        name="gender_identity"
                                        value="woman"
                                        onChange={handleChange}
                                        checked={formData.gender_identity === "woman"}
                                    />
                                </div>

                                <div className="input_container">
                                    <input
                                        id="more-gender-identity"
                                        type="radio"
                                        name="gender_identity"
                                        value="more"
                                        onChange={handleChange}
                                        checked={formData.gender_identity === "more"}
                                    />
                                </div>
                            </div>



                        </div>


                        <div className="movement_buttons">
                            <div>
                                <button type="button" onClick={(e) => {setHidePage1(true); setHidePage2(false);}}>Back</button>
                            </div>
                            
                            <div>
                                <input type="button" value="Next" onClick={(e) => {e.preventDefault(); setHidePage2(false); setHidePage3(true);}}/>
                            </div>
                        </div>

                    </section>}


                    {hidePage3 && <section>
                        <div className="page2-form">
                            {/* User info here */}
                        </div>


                        <div className="movement_buttons">
                            <div>
                                <button type="button" onClick={(e) => {setHidePage2(true); setHidePage3(false);}}>Back</button>
                            </div>
                            
                            <div className="submit_btn">
                                <button onClick={handleSubmit}>Submit</button>
                            </div>
                        </div>

                    </section>}

                </div>
            </form>
        </div>
    )

}
                    
export default Signup