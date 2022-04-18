import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import {GrLanguage} from 'react-icons/gr';
import {AiFillStar} from 'react-icons/ai';

function Country(){
    const {id} = useParams();

    const [country, setCountry] = useState([]);

    const getCountry = () =>{
        axios.get(`http://localhost:8080/countries/getAllCountryInfo/${id}`, {withCredentials: true})
        .then(function(response){
            console.log(response.data);
            setCountry(response.data[0]);
        }).catch(function(error){
            console.log(error);
        })
    }

    useEffect(()=> getCountry(), []);
  
    return(
        <div className="row justify-content-center">
            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                <h4 className="display-6">Countries</h4>
                <small>Explore <span className='fw-bold'>{country.name}'s</span> books, films, and history.</small>
                    <nav aria-label="breadcrumb mt-4">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="/countries" className='text-decoration-none link-dark'>Countries</a></li>
                            <li class="breadcrumb-item active" aria-current="page">{country.name}</li>
                        </ol>
                    </nav>
                <div className='row justify-content-center mt-4' >
                    <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 mt-4'>
                        <small className='lead d-block'>{country.name}</small>
                        <small className='d-block'><AiFillStar/> {country.capital}</small>
                        <small className='d-block'><GrLanguage/> {country.language}</small>
                    </div>
                    <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 mt-4'>
                        <img src={country.flag} className='w-100 mw-100'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Country;