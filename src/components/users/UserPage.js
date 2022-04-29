import axios from 'axios';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {BiPencil, BiWorld} from 'react-icons/bi';
import {GoLocation} from 'react-icons/go';
import {FiUser} from 'react-icons/fi';
import {GrLanguage, GrUserAdmin} from 'react-icons/gr';
import {GiBlackFlag} from 'react-icons/gi';
import { BsPencilSquare } from 'react-icons/bs';
import {AiOutlineUser} from 'react-icons/ai'
function UserPage({userId, getLoggedInUser}){

    const {id} = useParams();
    const [user, setUser] = useState([]);
    const [languages, setLanguages] = useState([]);

    //language form fields
    const [languageName, setLanguageName] = useState("");
//country form fields
    const [countryName, setCountryName] = useState("");
    const [flag, setFlag] = useState("");
    const [language_id, setLanguage_id] = useState("");
    const [capital, setCapital] = useState("");
    const [banner_img, setBanner_img] = useState("");

    //update avatar form field
    const [updateAvatar, setUpdateAvatar] = useState("");

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
        "/avatars/img12.png",
        "/avatars/img13.png",
        "/avatars/img14.png",
        "/avatars/img15.png",
        "/avatars/img16.png",
        "/avatars/img17.png",
        "/avatars/img18.png",


    ]
    const getUser = () =>{
        axios.get(`http://localhost:8080/users/getUserInfo/${id}`, {withCredentials: true})
        .then(function(response){
            console.log(response.data);
            setUser(response.data[0]);
        }).catch(function(error){
            console.log(error);
        })
    }
    const getLanguages = () =>{
        axios.get(`http://localhost:8080/languages/getAllLanguages`, {withCredentials: true})
        .then(function(response){
            console.log(response.data);
            setLanguages(response.data);
        }).catch(function(error){
            console.log(error);
        })
    }
function getUserRole(admin){
    if(admin == "Y"){
        return "Admin";
    }else if(admin == "N"){
        return "User";
    }
}
function getUserRoleIcon(admin){
    if(admin == "Y"){
        return <GrUserAdmin/>;
    }else if(admin == "N"){
        return <FiUser/>;
    }
}

function getAdminButtons(admin){
    if(admin == "Y"){
        return  <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
        <div className='row d-flex justify-content-end mt-4'>
            <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
                <button className='btn btn-outline-dark' data-bs-toggle="modal" data-bs-target="#addLanguageModal">+ Language</button>   
                <button className='btn btn-outline-dark' data-bs-toggle="modal" data-bs-target="#addCountryModal">+ Country</button>
            </div>   
        </div>
    </div>
    }
}

//handle submit functions
const addLanguageSubmit = (e) =>{
    e.preventDefault();
    console.log({
        name: languageName
    })
    axios.post("http://localhost:8080/languages/addLanguage", {
        name: languageName
    }).then(function(response){
        console.log(response);
        setLanguages([]);
        getLanguages();
    }).catch(function(error){
        console.log(error);
    })
};

const addCountrySubmit = (e) =>{
    e.preventDefault();
  
    axios.post("http://localhost:8080/countries/addCountry", {
        name: countryName,
        flag: flag,
        language_id: language_id,
        capital: capital,
        banner_img: banner_img

    }).then(function(response){
        console.log(response);
    }).catch(function(error){
        console.log(error);
    })
};
    useEffect(()=> getUser(), []);
    useEffect(()=> getLanguages(), []);

    //update submits
    const updateAvatarSubmit = (e) =>{
        e.preventDefault();
      
        axios.put(`http://localhost:8080/users/updateAvatar/${userId}`, {
            avatar: updateAvatar
    
        },{withCredentials: true}).then(function(response){
            console.log(response);
            setUser([]);
            getUser();
            document.getElementById("closeUpdateAvatarModal").click();
            getLoggedInUser();
        }).catch(function(error){
            console.log(error);
        })
    }; 

    function showUpdateAvatarIcon(id){
        if(userId != undefined && userId != null){
            if(userId == id){
                return <a type='button' style={editAvatarButton} className='position-absolute text-decoration-none text-secondary' data-bs-toggle="modal" data-bs-target="#updateAvatarModal"><BsPencilSquare/></a>

            }
        }
    }


    const avatarContainerStyle = {height: "350px"}
    const avatarStyle = {height: "20%", width: "28%"}
    const editAvatarButton = {zIndex: "1"}

    return(
        <div>
        <div className="row justify-content-center">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 " style={avatarContainerStyle}>
                        <div className="row justify-content-center">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-7 " >
                            <div className="container rounded-circle mt-4" style={avatarStyle} >
                                <img src={user.avatar}  className="w-100 mw-80 mh-60 h-60 p-4 rounded-circle position-relative"/>
                                    {showUpdateAvatarIcon(user.id)}
                                </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 " >
                            <p className="lead  text-center">{user.first_name} {user.last_name}</p>  
                            <div className="row justify-content-center">
                                <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4" align="center">
                                    <small className="lead ">{user.books_posted_count}</small>
                                    <small className=" d-block">Books posted</small>
                                </div>
                                <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4" align="center">
                                    <small className="lead ">{user.films_posted_count}</small>
                                    <small className=" d-block">Films posted</small>
                                </div>
                                <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4" align="center">
                                <small className="lead ">{user.history_posted_count}</small>
                                    <small className=" d-block">Historical topics</small>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
          {getAdminButtons(user.admin)}

            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 mt-3">
                <small className='blockquote d-block mt-3'>Bio:</small>
                <small className='d-block mt-3'>{user.bio}</small>
                <small className='blockquote d-block mt-3'><BiWorld/> From {user.country_name}</small>
                <small className='blockquote d-block mt-3'>{getUserRoleIcon(user.admin)} Role: {getUserRole(user.admin)}</small>
            </div>
        </div>

    {/* ADD COUNTRY MODAL */}
        <div className='mymodals'>
                    <div className="modal" tabindex="-1" role="dialog" id="addCountryModal" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content rounded-5 shadow">
                <div className="modal-header p-5 pb-4 border-bottom-0">

                    <h2 className="fw-bold mb-0"><GiBlackFlag/> Add Country</h2>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div className="modal-body p-5 pt-0">
                    <form className="" onSubmit={addCountrySubmit}>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control rounded-4" id="floatingInput" placeholder="Country Name" value={countryName} onChange={(e)=> setCountryName(e.target.value)}/>
                        <label for="floatingInput">Country Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control rounded-4" id="Capital" value={capital} onChange={(e)=> setCapital(e.target.value)}/>
                        <label for="floatingPassword">Capital</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control rounded-4" id="floatingPassword" value={flag} onChange={(e)=> setFlag(e.target.value)}/>
                        <label for="floatingPassword">Flag Image URL</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control rounded-4" id="floatingPassword" value={banner_img} onChange={(e)=> setBanner_img(e.target.value)}/>
                        <label for="floatingPassword">Country Banner Image URL</label>
                    </div>
                    <div className="form-floating mb-3">
                        <select defaultValue="Select Language" className="form-select" aria-label="Default select example" value={language_id} onChange={(e)=> setLanguage_id(e.target.value)}>
                            <option value="Select Language" selected>Select Language</option>
                            {languages.map((language,i)=>(
                                <option value={language.id}>{language.name}</option>
                            ))}
                            
                        </select>
                    </div>
                
                    <button className="w-100 mb-2 btn btn-lg rounded-4 btn-dark" type="submit">Save</button>
                    
                    </form>
                </div>
                </div>
            </div>
            </div>

        </div>

        {/* ADD LANGUAGE MODAL */}
        <div className='mymodals'>
                    <div className="modal" tabindex="-1" role="dialog" id="addLanguageModal" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content rounded-5 shadow">
                <div className="modal-header p-5 pb-4 border-bottom-0">

                    <h2 className="fw-bold mb-0"><GrLanguage/> Add Language</h2>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div className="modal-body p-5 pt-0">
                    <form className="" onSubmit = {addLanguageSubmit}>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control rounded-4" id="floatingInput" placeholder="Language Name" value={languageName} onChange={(e)=> setLanguageName(e.target.value)}/>
                        <label for="floatingInput">Language Name</label>
                    </div>
                
                
                    <button className="w-100 mb-2 btn btn-lg rounded-4 btn-dark" type="submit">Save</button>
                    
                    </form>
                </div>
                </div>
            </div>
            </div>

        </div>
                {/* UPDATE AVATAR MODAL */}
                <div className='mymodals'>
                    <div className="modal" tabindex="-1" role="dialog" id="updateAvatarModal" aria-hidden="true">
            <div className="modal-dialog modal-xl" role="document">
                <div className="modal-content rounded-5 shadow">
                <div className="modal-header p-5 pb-4 border-bottom-0">

                    <h2 className="fw-bold mb-0"><AiOutlineUser/> Update Avatar</h2>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeUpdateAvatarModal"></button>
                </div>

                <div className="modal-body p-5 pt-0">
                    <form className="" onSubmit = {updateAvatarSubmit}>
                    <div onChange={(e)=> setUpdateAvatar(e.target.value)} className="row">
                        {avatarList.map((avatar, i)=>(
                            <div className='col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 mt-2'>
                                <div class="form-check">      
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value={avatar} />
                                    <img src={avatar} width="100" height="100"/>     
                                </div>
                            </div>
                        ))}
                     
                    </div> 
                    <button className="w-100 mb-2 btn btn-lg rounded-4 btn-dark mt-4" type="submit">Save</button>
                    </form>
                </div>
                </div>
            </div>
            </div>

        </div>
        </div>
    )
}

export default UserPage;