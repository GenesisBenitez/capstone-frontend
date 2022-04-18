import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

function Books(){
    const [books, setBooks] = useState([]);

    const getBooks = () =>{
        axios.get(`http://localhost:8080/books/getAllBookInfo`, {withCredentials: true})
        .then(function(response){
            console.log(response.data);
            setBooks(response.data);
        }).catch(function(error){
            console.log(error);
        })
    }

    useEffect(()=> getBooks(), []);

    const descriptionStyle = {height: "55%"};
    const cardStyle = {height: "300px"};

    return(
        <div className="row justify-content-center">
            <div className="col-12 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                <h4 className="display-6">Books</h4>
                <small>Explore unique books posted by users.</small>
                <div className='row justify-content-center mt-4' >
                    
                </div>
            </div>
            {books.map((book, i)=>( 
                    <div className='col-10 col-sm-10 col-md-8 col-lg-8 col-xl-10 mt-3'>
                        <div className="card w-100 mt-4" style={cardStyle}>
                        <div class="card-body">
                            <div className='row'>
                                <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                                    <small className='lead'>{book.title}</small>
                                    <small className='d-block'>{book.first_name} {book.last_name}</small>
                                    <small className='d-block'>{book.release_year}</small>
                                    <small className='d-block fw-bold'>{book.country_name} <img src={book.flag} width="20"/></small>
                                    <small className='d-block fw-bold'>{book.language}</small>
                                    <small className='d-block'>Posted by: <span className='fw-bold'><Link className='link-dark' to={`/profile/${book.userId}`}>{book.username}</Link></span></small>
                                    {/* <div style={descriptionStyle} className="overflow-auto">
                                    <small className='d-block mt-2'>{book.description}</small>
                                    </div> */}
                                </div>
                                <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6' align='center'>
                                    <img src={book.cover} height="180" className='w-80 p-2'/>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    ))}
        </div>
    )
}

export default Books;