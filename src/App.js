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

function App() {
  const [userId, setUserId] = useState();
  const [username, setUsername] = useState();
  const [loggedIn, setLoggedIn] = useState();
  const getUser = () =>{
    axios.get("http://localhost:8080/getLoggedInUser", {withCredentials: true})
      .then((response)=>{
      console.log(response.data);
      setUserId(response.data.userId);
      setUsername(response.data.username);
      setLoggedIn(response.data.loggedIn);
      }).catch(function(error){
      console.log(error);
    })
  }
      useEffect(()=>getUser(), []);
  return (
    <div>
      <Router>
          <Nav userId={userId} username={username} loggedIn={loggedIn}/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/profile/:id" element={<UserPage/>}/>
            
          </Routes>
        
      </Router>
    </div>
  );
}

export default App;
