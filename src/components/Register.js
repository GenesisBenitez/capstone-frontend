import {useState, useEffect} from 'react';
import {FcGlobe} from 'react-icons/fc';
import axios from 'axios';

function Login(){
    const loginFormStyle= {height:"500px"};
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [avatar, setAvatar] = useState("");
    const [bio, setBio] = useState("");
    const [admin, setAdmin] = useState("");
    const [email, setEmail] = useState("");
    const [country_id, setCountry_id] = useState("");

    const [countries, setCountries] = useState([]);


    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log({
            first_name: first_name,
            last_name: last_name,
            country_id: country_id,
            username: username,
            password: password,
            admin: "N",
            bio: bio,
            avatar: avatar,
            email: email
        })
        axios.post("http://localhost:8080/users/addUser", {
            first_name: first_name,
            last_name: last_name,
            country_id: country_id,
            username: username,
            password: password,
            admin: "N",
            bio: bio,
            avatar: avatar,
            email: email
        },  {withCredentials: true})
        .then(function(response){
            console.log(response.data);
            window.location = "/login";
        }).catch(function(error){
            console.log(error);
        })
    
    }
    const getCountries = () =>{
        axios.get(`http://localhost:8080/countries/getAllCountries`, {withCredentials: true})
        .then(function(response){
            console.log(response.data);
            setCountries(response.data);
        }).catch(function(error){
            console.log(error);
        })
    }

    useEffect(()=> getCountries(), []);


    //avatars
    const avatarList = [
        "/avatars/img1.png",
        "/avatars/img2.png",
        "/avatars/img3.png",
        "/avatars/img4.png",
        "/avatars/img5.png",
        "/avatars/img6.png",
        "/avatars/img7.png",
        "/avatars/img8.png",
        "/avatars/img9.png",
        "/avatars/img10.png",
        "/avatars/img11.png",
        "/avatars/img12.png",
        "/avatars/img13.png",
        "/avatars/img14.png",
        "/avatars/img15.png",
        "/avatars/img16.png",
        "/avatars/img17.png",
        "/avatars/img18.png",
    ]

    const worldIcon = {color: "black"};

    const imgStyle = {width: "50px", height: "50px"}
    const textareaStyle = {height: "100px"};

    return(
        <div className="row justify-content-center mt-5" style={loginFormStyle}>
            <div className="col-10 col-sm-8 col-md-8 col-lg-8 col-xl-8 border" align="center">
                <div align='center'>
                <FcGlobe size={25} className="mt-4" style={worldIcon}/>
                <h4 className="lead mt-4">Register</h4>
                <small>to continue </small>
                Other<span className='main-logo fw-bold'>world</span>ly
                </div>
                <form onSubmit={handleSubmit}>
                        <div className='row mt-4 justify-content-center'>
                        <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 mt-4" >
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingInput" placeholder="First Name" value={first_name} onChange={(e)=> setFirst_name(e.target.value)}/>
                                    <label htmlFor="floatingInput">First Name</label>
                                    </div>
                                </div>
                            <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 mt-4" >
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingInput" placeholder="Last Name" value={last_name} onChange={(e)=> setLast_name(e.target.value)}/>
                                    <label htmlFor="floatingInput">Last Name</label>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mt-2">
                                <div className="form-floating mb-3">
                                <select defaultValue="Select Country" className="form-select" aria-label="Default select example" value={country_id} onChange={(e)=> setCountry_id(e.target.value)}>
                                <option value="Select Country" selected>Select Country</option>
                                {countries.map((country, i)=>(
                                <option value={country.id}>{country.name}</option>
                                ))}
                            </select>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mt-2">
                                <div className="mb-3">
                                    <label className="form-label">Avatar</label>
                                <div onChange={(e)=> setAvatar(e.target.value)} className="row">
                                    {avatarList.map((avatar, i)=>(
                                        <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 mt-2'>
                                            <div class="form-check">      
                                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value={avatar} />
                                                <img src={avatar} width="20" height="20"/>     
                                            </div>
                                        </div>
                                    ))}
                                
                                </div> 
                                    </div>
                                </div>
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mt-4" >
                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control" id="floatingInput" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                                    <label htmlFor="floatingInput">Email</label>
                                    </div>
                            </div>
                                <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 mt-4" >
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingInput" placeholder="Username" value={username} onChange={(e)=> setUsername(e.target.value)}/>
                                    <label htmlFor="floatingInput">Username</label>
                                    </div>
                                </div>
                        
                                <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 mt-4" >
                                <div className="form-floating mb-3">
                                    <input type="password" className="form-control" id="floatingInput" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                                    <label htmlFor="floatingInput">Password</label>
                                    </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mt-4" >

                            <div class="form-floating">
                                    <textarea class="form-control" placeholder="Bio" id="floatingTextarea2" style={textareaStyle} value={bio} onChange={(e)=> setBio(e.target.value)}></textarea>
                                    <label for="floatingTextarea2">Bio</label>
                                </div>
                                </div>
                            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 mt-4" align="center">
                                <button type='submit' className='btn btn-outline-dark btn-block'>Register</button>
                                <small className='d-block mt-3'>Already have an account? <a href="/login">Login</a></small>

                            </div>
                        </div>
                    </form>
            </div>

        </div>
    )
}

export default Login;