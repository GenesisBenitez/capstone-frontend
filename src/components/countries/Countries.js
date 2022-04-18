import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

function Countries(){
    const [countries, setCountries] = useState([]);

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

    function getBannerStyle(url){
        return {
            height: "150px",
            backgroundImage: `url(${url})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
        }
    }
    const cardStyle={width: "100%", height:"380px"};
    const cardBodyStyle={height:"65%"};
    const cardCountryNameStyle = {height: "30%"}


    return(
        <div className="row justify-content-center">
            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                <h4 className="display-6">Countries</h4>
                <small>Explore different countries books, films, history, and user posts</small>
                <div className='row justify-content-center mt-4' >
                    {countries.map((country, i)=>(
                    <div className='col-8 col-sm-6 col-md-4 col-lg-4 col-xl-4 mt-3' align='center'>
                        
                        <div className="card" style={cardStyle}>
                            <div style={getBannerStyle(country.banner_img)} className="d-flex align-items-end justify-content-center">
                                <div>
                                    <img src={country.flag} height="80" width="80" className="rounded-circle"/>
                                </div>
                            </div>
                            <div className="card-body" style={cardBodyStyle}>
                                <div style={cardCountryNameStyle}>
                                    <small className='lead d-block'>
                                        <Link to={ `/country/${country.id}`} className="text-decoration-none link-dark">
                                            {country.name}
                                        </Link>
                                    </small>
                                </div>
                                <div className='mt-3'>
                                    <small className='d-block'>55 users</small>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Countries;