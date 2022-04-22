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
    const [bookRatings, setBookRatings] = useState([]);
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
    const getBookRatings = () =>{
        axios.get(`http://localhost:8080/bookComments/getBookRatingInfoByBookId/${id}`, {withCredentials: true})
        .then(function(response){
            console.log(response.data);
            setBookRatings(response.data[0]);
        }).catch(function(error){
            console.log(error);
        })
    }
    const textareaStyle = {height: "100px"}

    useEffect(()=> getBook(), []);
    useEffect(()=> getBookComments(), []);
    useEffect(()=> getBookRatings(), []);


    function getAvgRatingForProgressBar(total_ratings, starRatings){
            let percentage = (100 * starRatings) / total_ratings;
            return {width: `${percentage}0%`}
    
    }

    function isPlural(num){
        if(num == 1){
            return "";
        }else{
            return "s";
        }
    }

    function convertTime(time){
        var newTime = new Date(time);
        const realTime = newTime.toLocaleString('en-US', {month: 'long', day: 'numeric', year:'numeric', hour: 'numeric', minute: 'numeric'})
        return realTime;
    }

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
            setBookRatings([]);
            getBookRatings();
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
                    <div className='col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 mt-4 mb-4'>
                        <img src={book.cover} className='w-100 mw-100'/>
                    </div>
                </div>
            </div>
            <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 mb-4'>
                <div className='row justify-content-center mt-4'>
                    <div className='col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4'>
                        <small className='lead'>Reviews</small>
                        <div className='row justify-content-center'>
                            <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 '>
                            <ReactStars
                                            count={bookRatings.avg_rating}
                                            size={16}
                                            color="#ffd700"
                                            
                                            classNames="mt-2"
                                    
                                        />
                            </div>
                            <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6'>
                                <small className='d-block mt-2'>{bookRatings.avg_rating} out of 5</small>
                            </div>
                        </div>
                        <small className='d-block mt-2'>{bookRatings.total_ratings} rating{isPlural(bookRatings.total_ratings)}</small>
                        <div className='row justify-content-center mt-2'>
                            <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 '>
                                <small>5 star</small>
                                <div class="progress">
                                    <div class="progress-bar bg-warning" style={getAvgRatingForProgressBar(bookRatings.total_ratings, bookRatings.five_star_ratings)} role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">

                                    </div>
                                </div>
                            </div>
                            <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 '>
                                <small>4 star</small>
                                <div class="progress">
                                    <div class="progress-bar bg-warning " style={getAvgRatingForProgressBar(bookRatings.total_ratings, bookRatings.four_star_ratings)}role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">

                                    </div>
                                </div>
                            </div>
                            <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 '>
                                <small>3 star</small>
                                <div class="progress">
                                    <div class="progress-bar bg-warning " style={getAvgRatingForProgressBar(bookRatings.total_ratings, bookRatings.three_star_ratings)}role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">

                                    </div>
                                </div>
                            </div>
                            <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 '>
                                <small>2 star</small>
                                <div class="progress">
                                    <div class="progress-bar bg-warning " style={getAvgRatingForProgressBar(bookRatings.total_ratings, bookRatings.two_star_ratings)}role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">

                                    </div>
                                </div>
                            </div>
                            <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 '>
                                <small>1 star</small>
                                <div class="progress">
                                    <div class="progress-bar bg-warning "style={getAvgRatingForProgressBar(bookRatings.total_ratings, bookRatings.one_star_ratings)} role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 '>
                                <small className='lead'>Comments</small>
                                {bookComments.map((bookComment, i)=>(  
                                <div className='row justify-content-center mt-4'>
                                    <div className='col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 ' align="center">
                                        <img src={bookComment.avatar} height="35" width="35" className='rounded-circle'/>
                                    </div>
                                    <div className='col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8'>
                                        <small className='fw-bold '>{bookComment.username} </small>
                                        <small className='px-2'>{convertTime(bookComment.created_at)}</small>
                                        <ReactStars
                                        count={bookComment.rating}
                                        size={18}
                                        color="#ffd700"
                                    />
                                        <small className='d-block'>{bookComment.comment}</small>
                                    </div>
                                </div>  
                                ))}        
                    </div>
                     
                                    
                    
                </div>
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