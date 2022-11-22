const Login = () => {

    const handleLogin = () => {
        // where we collect token from django to set as cookie

        return
    }


    return(
        <>
        <div>
        <form>
            <section>
                <div className="Login">

                    <div className="input_container">
                        <label>Username</label>
                        <div className="input-btn">
                            <input placeholder="User"/>
                        </div>
                    </div>

                    <div className="input_container">
                        <label>Password</label>
                        <div className="input-btn">
                            <input placeholder="Password"/>
                        </div>
                    </div>

                    <div placeholder="Login">
                        <button onClick={handleLogin}>Login</button>
                    </div>
                    
                </div>
            </section>
        </form>
        </div>
        </>
    )
}

export default Login










