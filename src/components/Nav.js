import {FaUser} from 'react-icons/fa';
import {FcGlobe} from 'react-icons/fc';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {useState, useEffect} from 'react';

function Nav({userId, username, loggedIn, avatar}){

const userIconStyle = {color: "orange", width:"25px", height:"25px"};
const worldIcon = {color: "orange"};


let userLink;
if(loggedIn){
    userLink =   
    <div>
        <div className="dropdown text-end mt-2">
            <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                {/* <FaUser className="rounded-circle" size={25} style={userIconStyle}/> */}
                <img src={avatar} style={userIconStyle} className="rounded-circle"/>
            </a>
            <ul className="dropdown-menu text-small" aria-labelledby="dropdownUser1">
                <li><Link className="dropdown-item" to={`/profile/${userId}`}>Profile</Link></li>
                <li><a className="dropdown-item" onClick={() =>{
                                        axios.get(`http://localhost:8080/signout`, {withCredentials:true})
                                        .then(function(response){
                                            console.log(response);
                                            // snackbar.showMessage('User successfully logged out')
                                             window.location= "/login";
                                        }).catch(function(error){
                                            console.log(error);
                                        })
                                    }}>Sign out</a></li>
            </ul>
        </div>
        <small>{username}</small>
    </div>   
}else{
    userLink =      
        <div className="dropdown text-end">
            <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                <FaUser className="rounded-circle" size={27} style={userIconStyle}/>
                
            </a>
            <ul className="dropdown-menu text-small" aria-labelledby="dropdownUser1">
                <li><Link className="dropdown-item" to={"/login"}>Login</Link></li>
            </ul>
        </div>
}
return(
    <header className="p-3 mb-3 border-bottom">
            <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
                    <FcGlobe className="bi me-2" width="40" height="32" size={28} style={worldIcon}/>
                Other<span className='main-logo fw-bold'>world</span>ly
                </a>

                <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                <li><a href="/" className="nav-link px-2 link-dark">Countries</a></li>
                <li><a href="/books" className="nav-link px-2 link-dark">Books</a></li>
                <li><a href="/films" className="nav-link px-2 link-dark">Film</a></li>
                <li><a href="/historyTopics" className="nav-link px-2 link-dark">History</a></li>
                </ul>
{/* 
                <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                <input type="search" className="form-control" placeholder="Search..." aria-label="Search"/>
                </form> */}

             {userLink}
            </div>
            </div>
  </header>
)
}

export default Nav;