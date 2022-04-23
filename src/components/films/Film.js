import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import {GrLanguage} from 'react-icons/gr';
import {AiFillStar, AiOutlinePlusCircle} from 'react-icons/ai';
import {FaRegComment} from 'react-icons/fa';
import ReactStars from "react-rating-stars-component";
import StarRatings from 'react-star-ratings';
import {BiTrash} from 'react-icons/bi'
import { IoFunnelSharp } from 'react-icons/io5';

function Film({userId}){
    const {id} = useParams();

    const [film, setFilm] = useState([]);
    const [filmComments, setFilmComments] = useState([]);
    const [filmRatings, setFilmRatings] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");

    //add comment fields
    const [user_id, setUser_id] = useState("");
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState("");

    const getFilm = () =>{
        axios.get(`http://localhost:8080/films/getAllFilmInfoById/${id}`, {withCredentials: true})
        .then(function(response){
            console.log(response.data);
            setFilm(response.data[0]);
        }).catch(function(error){
            console.log(error);
        })
    }
    const getFilmComments = () =>{
        axios.get(`http://localhost:8080/filmComments/getAllCommentsByFilmId/${id}`, {withCredentials: true})
        .then(function(response){
            console.log(response.data);
            setFilmComments(response.data);
        }).catch(function(error){
            console.log(error);
        })
    }
    const getFilmRatings = () =>{
        axios.get(`http://localhost:8080/filmComments/getFilmRatingInfoByFilmId/${id}`, {withCredentials: true})
        .then(function(response){
            console.log(response.data);
            setFilmRatings(response.data[0]);
        }).catch(function(error){
            console.log(error);
        })
    }
    const textareaStyle = {height: "100px"}

    useEffect(()=> getFilm(), []);
    useEffect(()=> getFilmComments(), []);
    useEffect(()=> getFilmRatings(), []);


    function getAvgRatingForProgressBar(total_ratings, starRatings){
            let percentage = (100 * starRatings) / total_ratings;
            if(isNaN(percentage)){
                return {width: `0%`}
 
            }else{
            return {width: `${percentage}%`}
            }
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
    const addFilmCommentSubmit = (e) =>{
        e.preventDefault();
        
        if(userId != undefined){
            setErrorMsg("")
        console.log({
            user_id: userId,
            film_id: id,
            rating: rating,
            comment: comment
        })
        axios.post("http://localhost:8080/filmComments/addFilmComment", {
            user_id: userId,
            film_id: id,
            rating: rating,
            comment: comment
        }).then(function(response){
            console.log(response);
            setFilmRatings([]);
            getFilmRatings();
            setFilmComments([]);
            getFilmComments();
            document.getElementById('closeFilmCommentModal').click();
        }).catch(function(error){
            console.log(error);
        })
    }else if(userId == undefined){
        setErrorMsg(<small className='text-danger mt-3'>Please Login to add a comment</small>)
    }
    };

    let deleteButton;
    function deleteComment(id, filmId){
    if(userId != undefined && userId != null){
        if(userId == id){
        deleteButton = <a type='button' 
        onClick={()=>{
            axios.delete(`http://localhost:8080/filmComments/deleteFilmComment/${filmId}`)
            .then(function(response){
                console.log(response)
                setFilmComments([]);
                getFilmComments();
                setFilmRatings([]);
                getFilmRatings();
            })
            .catch(function(error){
                console.log(error)
            })
        }}
        
        ><BiTrash/></a>
        return deleteButton;
    }
        
    }
}
function commentsIsEmpty(){
    if(filmComments.length == 0){
        return (
        <div className="col-12 col-sm-10 col-md-10 col-lg-10 col-xl-10 mt-4" align="center">
            <div className="row justify-content-center mt-4">
            <small>There are no comments for this film.</small>
            </div>
        </div>
        )
    }
}
    return(
        <div>
        <div className="row justify-content-center">
            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                <h4 className="display-6">Films</h4>
                <small className='fw-bold'>{film.title}'s.</small>
                    <nav aria-label="breadcrumb mt-4">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="/books" className='text-decoration-none link-dark'>Films</a></li>
                            <li class="breadcrumb-item active" aria-current="page">{film.title}</li>
                        </ol>
                    </nav>
            </div>
                  
            <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10'>
                <div className='row justify-content-center mt-4' >
                    <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 mt-4'>
                        <small className='lead d-block'>{film.title}</small>
                        <small className='d-block fw-bold'>{film.first_name} {film.last_name}</small>
                        <small className='d-block'>{film.description}</small>
                        <small className='d-block'><GrLanguage/> {film.language}</small>
                    </div>
                    <div className='col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 mt-4 mb-4'>
                        <img src={film.poster} className='w-100 mw-100'/>
                    </div>
                </div>
            </div>
            <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 mt-4' >
                    <div className='row d-flex justify-content-end mt-4'>
                            <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
                                <button className='btn btn-outline-dark' data-bs-toggle="modal" data-bs-target="#addCommentModal"><FaRegComment className='mb-1'/> Comment</button>  
                            </div>   
                            </div>
                    </div>
            <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 mb-4'>
                <div className='row justify-content-center mt-4'>
                    <div className='col-10 col-sm-10 col-md-4 col-lg-4 col-xl-4'>
                        <small className='lead'>Reviews</small>
                        <div className='row justify-content-center'>
                            <div className='col-4 col-sm-4 col-md-6 col-lg-6 col-xl-6 '>
                            <StarRatings
                                            rating={filmRatings.avg_rating}
                                            starRatedColor='#ffd700'
                                            numberOfStars={5}
                                            name='rating'
                                            starDimension="16px"
                                            starSpacing='0'
                                    
                                        />
                            </div>
                            <div className='col-8 col-sm-8 col-md-6 col-lg-6 col-xl-6 mt-1'>
                                <small>{filmRatings.avg_rating} out of 5</small>
                            </div>
                        </div>
                        <small className='d-block mt-2'>{filmRatings.total_ratings} rating{isPlural(filmRatings.total_ratings)}</small>
                        <div className='row justify-content-center mt-2'>
                            <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 '>
                                <small>5 star</small>
                                <div class="progress">
                                    <div class="progress-bar bg-warning" style={getAvgRatingForProgressBar(filmRatings.total_ratings, filmRatings.five_star_ratings)} role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">

                                    </div>
                                </div>
                            </div>
                            <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 '>
                                <small>4 star</small>
                                <div class="progress">
                                    <div class="progress-bar bg-warning " style={getAvgRatingForProgressBar(filmRatings.total_ratings, filmRatings.four_star_ratings)}role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">

                                    </div>
                                </div>
                            </div>
                            <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 '>
                                <small>3 star</small>
                                <div class="progress">
                                    <div class="progress-bar bg-warning " style={getAvgRatingForProgressBar(filmRatings.total_ratings, filmRatings.three_star_ratings)}role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">

                                    </div>
                                </div>
                            </div>
                            <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 '>
                                <small>2 star</small>
                                <div class="progress">
                                    <div class="progress-bar bg-warning " style={getAvgRatingForProgressBar(filmRatings.total_ratings, filmRatings.two_star_ratings)}role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">

                                    </div>
                                </div>
                            </div>
                            <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 '>
                                <small>1 star</small>
                                <div class="progress">
                                    <div class="progress-bar bg-warning "style={getAvgRatingForProgressBar(filmRatings.total_ratings, filmRatings.one_star_ratings)} role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-10 col-sm-10 col-md-8 col-lg-8 col-xl-8 '>
                                <small className='lead'>Comments</small>
                                {commentsIsEmpty()}
                                {filmComments.map((filmComment, i)=>(  
                                <div className='row justify-content-center mt-4'>
                                    <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-1 ' align="center">
                                        <img src={filmComment.avatar} height="35" width="35" className='rounded-circle'/>
                                    </div>
                                    <div className='col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8'>
                                        <p className='fw-bold d-inline'>{filmComment.username} </p>
                                        <small className='px-2'>{convertTime(filmComment.created_at)}</small>
                                        <ReactStars
                                        count={filmComment.rating}
                                        size={18}
                                        color="#ffd700"
                                    />
                                        <small className='d-block'>{filmComment.comment}</small>
                                    </div>
                                    <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-1 ' align="center">
                                        {deleteComment(filmComment.userId, filmComment.id)}
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
                                <button type="button" className="btn-close" id='closeFilmCommentModal' data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className='px-5 pb-4'>
                                <small>Watched this film? Comment and share your thoughts</small>

                            </div>
                            <div className="modal-body p-5 pt-0">
                                <form className="" onSubmit={addFilmCommentSubmit}>
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

export default Film;