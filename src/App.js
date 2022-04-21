import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Nav from './components/Nav';
import Login from './components/Login';
import Home from './components/Home';
import UserPage from './components/users/UserPage';
import Countries from './components/countries/Countries';
import Country from './components/countries/Country';
import Books from './components/books/Books';
import Book from './components/books/Book';

function App() {
  const [userId, setUserId] = useState();
  const [username, setUsername] = useState();
  const [loggedIn, setLoggedIn] = useState();
  const [avatar, setAvatar] = useState();

  const getUser = () =>{
    axios.get("http://localhost:8080/getLoggedInUser", {withCredentials: true})
      .then((response)=>{
      console.log(response.data);
      setUserId(response.data.userId);
      setUsername(response.data.username);
      setLoggedIn(response.data.loggedIn);
      setAvatar(response.data.avatar);
      }).catch(function(error){
      console.log(error);
    })
  }
      useEffect(()=>getUser(), []);
  return (
    <div>
      <Router>
          <Nav userId={userId} username={username} loggedIn={loggedIn} avatar={avatar}/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/profile/:id" element={<UserPage/>}/>
            <Route path="/countries" element={<Countries/>}/>
            <Route path="/country/:id" element={<Country/>}/>
            <Route path="/books"  element={<Books userId={userId}/>}/>
            <Route path="/book/:id" element={<Book userId={userId}/>}/>
            
          </Routes>
        
      </Router>
    </div>
  );
}

export default App;
