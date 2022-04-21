import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import {GrLanguage} from 'react-icons/gr';
import {AiFillStar, AiOutlinePlusCircle} from 'react-icons/ai';
import {FaRegComment} from 'react-icons/fa';
import ReactStars from "react-rating-stars-component";

function Book({userId}){
    const {id} = useParams();

    const [book, setBook] = useState([]);
    const [bookComments, setBookComments] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");

    //add comment fields
    const [user_id, setUser_id] = useState("");
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState("");

    const getBook = () =>{
        axios.get(`http://localhost:8080/books/getAllBookInfoById/${id}`, {withCredentials: true})
        .then(function(response){
            console.log(response.data);
            setBook(response.data[0]);
        }).catch(function(error){
            console.log(error);
        })
    }
    const getBookComments = () =>{
        axios.get(`http://localhost:8080/bookComments/getAllCommentsByBookId/${id}`, {withCredentials: true})
        .then(function(response){
            console.log(response.data);
            setBookComments(response.data);
        }).catch(function(error){
            console.log(error);
        })
    }
    const textareaStyle = {height: "100px"}

    useEffect(()=> getBook(), []);
    useEffect(()=> getBookComments(), []);

    //handle submit
    const addBookCommentSubmit = (e) =>{
        e.preventDefault();
        
        if(userId != undefined){
            setErrorMsg("")
        console.log({
            user_id: userId,
            book_id: id,
            rating: rating,
            comment: comment
        })
        axios.post("http://localhost:8080/bookComments/addBookComment", {
            user_id: userId,
            book_id: id,
            rating: rating,
            comment: comment
        }).then(function(response){
            console.log(response);
            setBookComments([]);
            getBookComments();
            document.getElementById('closeBookCommentModal').click();
        }).catch(function(error){
            console.log(error);
        })
    }else if(userId == undefined){
        setErrorMsg(<small className='text-danger mt-3'>Please Login to add a comment</small>)
    }
    };
  
    return(
        <div>
        <div className="row justify-content-center">
            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                <h4 className="display-6">Books</h4>
                <small>{book.first_name} {book.last_name}'s <span className='fw-bold'>{book.title}'s</span>.</small>
                    <nav aria-label="breadcrumb mt-4">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="/books" className='text-decoration-none link-dark'>Books</a></li>
                            <li class="breadcrumb-item active" aria-current="page">{book.title}</li>
                        </ol>
                    </nav>
                    </div>
                    <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10'>
                    <div className='row d-flex justify-content-end mt-4'>
                            <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
                            <button className='btn btn-outline-dark' data-bs-toggle="modal" data-bs-target="#addCommentModal"><FaRegComment className='mb-1'/> Comment</button>  
                            </div>   
                            </div>
                    </div>
                    <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10'>
                <div className='row justify-content-center mt-4' >
                    <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 mt-4'>
                        <small className='lead d-block'>{book.title}</small>
                        <small className='d-block fw-bold'>{book.first_name} {book.last_name}</small>
                        <small className='d-block'>{book.description}</small>
                        <small className='d-block'><GrLanguage/> {book.language}</small>
                    </div>
                    <div className='col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 mt-4'>
                        <img src={book.cover} className='w-100 mw-100'/>
                    </div>
                </div>
            </div>
            <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 px-5 pt-5'>
                {bookComments.map((bookComment, i)=>(
                    <div className='row'>
                        <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10'>   
                            <img src={bookComment.avatar} height="35" width="35" className='rounded-circle'/>
                            <small className='lead fw-bold px-4'>{bookComment.username} </small>
                        </div>
                        <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 px-5'>   
                        <ReactStars
                                        count={bookComment.rating}
                                        size={18}
                                        color="#ffd700"
                                    />
                        <small>{bookComment.comment}</small>
                        </div>
                     </div>
                ))}
            </div>
        </div>
        <div className='my modals'>

            {/* ADD COMMENT MODAL */}
            <div className='mymodals'>
                                <div className="modal" tabindex="-1" role="dialog" id="addCommentModal" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content rounded-5 shadow">
                            <div className="modal-header p-5 pb-4 border-bottom-0">
                                <h2>Add Comment</h2>
                                <button type="button" className="btn-close" id='closeBookCommentModal' data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className='px-5 pb-4'>
                                <small>Read this book? Comment and share your thoughts</small>

                            </div>
                            <div className="modal-body p-5 pt-0">
                                <form className="" onSubmit={addBookCommentSubmit}>
                                <div className="mb-3">
                                <label for="floatingInput">Rating</label>
                                <ReactStars
                                        count={5}
                                        onChange={(newRating)=> setRating(newRating)}
                                        size={24}
                                        activeColor="#ffd700"
                                    />
                                
                                </div>
                                
                                <div class="form-floating">
                                    <textarea style={textareaStyle} class="form-control" placeholder="Comment" id="floatingTextarea2" value={comment} onChange={(e)=> setComment(e.target.value)}></textarea>
                                    <label for="floatingTextarea2">Comment</label>
                                </div>
                                {errorMsg}
                                <button className="w-100 mb-2 btn btn-lg rounded-4 btn-dark mt-3" type="submit">Save</button>
                                
                                </form>
                            </div>
                            </div>
                        </div>
                        </div>

                    </div>
        </div>
        </div>
    )
}

export default Book;