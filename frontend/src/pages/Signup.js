import Nav from '../components/Nav'
import { useState } from "react"
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {
    const [ hidePage1, setHidePage1 ] = useState(true)
    const [ hidePage2, setHidePage2 ] = useState(false)
    const [ hidePage3, setHidePage3 ] = useState(false)

    const [ cookies, setCookie, removeCookie] = useCookies(null)
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        // Personal Data
        user_id: "", // Send empty to backend and generate at INSERT and send back in response and save to database
        first_name: "",
        last_name: "",
        email: "",
        dob: "",
        password: "",
        roomate_gender_identity: "male",
        show_gender: false,
        roomate_age: 0,
        matches: [],

        // Preference Data
    })


    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('Submit')

        // Need to reformat to send to django backend and not node
        try{
            axios.defaults.headers.common['Content-Type'] = "application/json"
            const response = await axios.post('http://127.0.0.1:8000/signup/post_user', { formData })

            const success = response.status === 200

            // Do custom token to get user id as well for data retreival
            const authToken = response.data.authToken
            const refreshToken = response.data.refreshToken

            if ((success) && (authToken)){
                setCookie('AuthToken', authToken)
                setCookie('RefreshToken', refreshToken)
                navigate('/dashboard')
            } 

        } catch (err) {
            console.log(err)
        }
    }


    const handleChange = (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
        const name = e.target.name



        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))

        console.log(formData)
    }
    return(
        <>
        <div className="registration_form">
            <form>
                {hidePage1 && <section>
                        <div className="signup">

                            <div className="input_container">
                                <label>First Name</label>
                                <div id="input_btn">
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
                                <div id="input_btn">
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

                            <div className="password_container">
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
                            
                            {/* Must Fix -> need to save the confirm and check */}   

                                <div className="input_container">  
                                    <label>Confirm Password</label>
                                    <div id="input_btn">  
                                        <input
                                            id="confirm-password"
                                            type="password"
                                            name="confirm-password"
                                            placeholder="Confirm Password"
                                            required={true}
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <button type="button" onClick={(e) => (setHidePage1(false), setHidePage2(true))}>Next Page</button>
                        </div>
                </section>}


            </form>
        </div>

        </>


    )



    return(
        <>
        <Nav/>
        <div className="signup">
            <form>
                {/* Get User info for auth and admin stuff, partially related to roomatematching but mostly admin */}
                {hidePage1 && <section id="registration-form-p1">
                            <input
                                id="first_name"
                                type="text"
                                name="first_name"
                                placeholder="First Name"
                                required={true}
                                value={formData.first_name}
                                onChange={handleChange}
                            />
                            <input
                                id="last_name"
                                type="text"
                                name="last_name"
                                placeholder="Last Name"
                                required={true}
                                value={formData.last_name}
                                onChange={handleChange}
                            />
                    <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Email"
                                required={true}
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Password"
                                required={true}
                                value={formData.password}
                                onChange={handleChange}
                            />
                    {/* Must Fix -> need to save the confirm and check */}       
                            <input
                                id="confirm-password"
                                type="password"
                                name="confirm-password"
                                placeholder="Confirm Password"
                                required={true}
                                value={formData.password}
                                onChange={handleChange}
                            />


                    <button type="button" onClick={(e) => (setHidePage1(false), setHidePage2(true))}>Next Page</button>
                </section>}





                {/* Get user info related for matching roomates */}
                {hidePage2 && <section id="registration-form-p2">
                    <label>Date of Birth</label>
                            <input
                                id="dob"
                                type="date"
                                name="dob"
                                placeholder="Date of Birth"
                                required={true}
                                value={formData.dob}
                                onChange={handleChange}
                            />

                    <label>Desired Housing Location</label>
                        <div>
                            <input type="text" id="city" placeholder="City"/>
                            <input type="text" id="state" placeholder="State"/>
                            <input type="text" id="specific-location" placeholder="More Specific Location"/>
                        </div>

                    <input type="text" id="rent-budget" placeholder="Maximum Rent Budget"></input>


                    <label>Gender</label>
                        <div className="multiple-input-container">
                            <input
                                id="male-gender-identity"
                                type="radio"
                                name="gender_identity"
                                value="male"
                                onChange={handleChange}
                                checked={formData.gender_identity === "male"}
                            />
                            <label htmlFor="man-gender-identity">Man</label>

                            <input
                                id="woman-gender-identity"
                                type="radio"
                                name="gender_identity"
                                value="woman"
                                onChange={handleChange}
                                checked={formData.gender_identity === "woman"}
                            />
                            <label htmlFor="woman-gender-identity">Woman</label>

                            <input
                                id="more-gender-identity"
                                type="radio"
                                name="gender_identity"
                                value="more"
                                onChange={handleChange}
                                checked={formData.gender_identity === "more"}
                            />
                            <label htmlFor="more-gender-identity">More</label>

                        </div>

                    <button type="button" onClick={(e) => (setHidePage2(false), setHidePage3(true))}>Next Page</button>

                </section>}


                {hidePage3 && <section>
                    <label>Roomate Gender</label>
                    {/* Need to add buttons for male female any */}
                        <div className="multiple-input-container">
                            <input
                                id="male-gender-identity"
                                type="radio"
                                name="roomate_gender_identity"
                                value="male"
                                onChange={handleChange}
                                checked={formData.gender_identity === "male"}
                            />
                            <label htmlFor="man-gender-identity">Man</label>
                            
                            <input
                                id="woman-gender-identity"
                                type="radio"
                                name="roomate_gender_identity"
                                value="woman"
                                onChange={handleChange}
                                checked={formData.gender_identity === "woman"}
                            />
                            <label htmlFor="woman-gender-identity">Woman</label>

                            <input
                                id="more-gender-identity"
                                type="radio"
                                name="roomate_gender_identity"
                                value="more"
                                onChange={handleChange}
                                checked={formData.gender_identity === "more"}
                            />
                            <label htmlFor="more-gender-identity">More</label>

                        </div>

                        <label>Roomate Age</label>
                        <input
                                id="roomate_age"
                                type="text"
                                name="roomate_age"
                                placeholder="Roomate Age"
                                required={true}
                                value={formData.roomate_age}
                                onChange={handleChange}
                            />


                    <button onClick={handleSubmit}>Submit</button>
                </section>}





            </form>
        </div>
        </>
    )
}

export default Signup