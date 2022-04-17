import axios from 'axios';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

function UserPage(){
    const {id} = useParams();
    const [user, setUser] = useState([]);

    const getUser = () =>{
        axios.get(`http://localhost:8080/users/getUser/${id}`, {withCredentials:true})
        .then(function(response){
            console.log(response.data);
            setUser(response.data[0]);
        }).catch(function(error){
            console.log(error)
        })
    }
    useEffect(()=> getUser(), []);

    const avatarContainerStyle = {height: "400px"}
    const avatarStyle = {height: "35%", width: "50%"}
    return(
        <div className="row">
            <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 bg-dark" style={avatarContainerStyle}>
                        <div className='container' style={avatarStyle}>
                            <img src={user.avatar} className="w-100 mw-80 mh-90 h-80 p-3 rounded-circle mt-4"/>
                        </div>
                        <p className='lead text-light'>{user.first_name} {user.last_name}</p>
                    </div>
                </div>
            </div>
            <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">

            </div>
        </div>
    )
}

export default UserPage;