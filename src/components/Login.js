import {useState} from 'react';
import {SiGoogleearth} from 'react-icons/si';
import {GiBlackFlag} from 'react-icons/gi';
import axios from 'axios';

function Login(){
    const loginFormStyle= {height:"500px"};
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post("http://localhost:8080/login", {
            username: username,
            password: password,
        },  {withCredentials: true})
        .then(function(response){
            console.log(response.data.user);
            window.location = "/";
        }).catch(function(error){
            console.log(error);
        })
    
    }

    const worldIcon = {color: "orange"};
    return(
        <div className="row justify-content-center mt-5" style={loginFormStyle}>
            <div className="col-10 col-sm-8 col-md-5 col-lg-5 col-xl-4 border" align="center">
                <GiBlackFlag size={25} className="mt-4" style={worldIcon}/>
                <h4 className="lead mt-4">Sign In</h4>
                <small>to continue </small>
                Other<span className='main-logo fw-bold'>world</span>ly
                <form onSubmit={handleSubmit}>
                        <div className='row mt-4 justify-content-center'>
                            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 mt-4" align="center">
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingInput" placeholder="Username" value={username} onChange={(e)=> setUsername(e.target.value)}/>
                                    <label htmlFor="floatingInput">Username</label>
                                    </div>
                                </div>
                        
                            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 mt-2" align="center">
                                <div className="form-floating mb-3">
                                    <input type="password" className="form-control" id="floatingInput" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                                    <label htmlFor="floatingInput">Password</label>
                                    </div>
                            </div>
                            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 mt-4" align="center">
                                <button type='submit' className='btn btn-outline-dark btn-block'>Login</button>
                            </div>
                        </div>
                    </form>
            </div>

        </div>
    )
}

export default Login;