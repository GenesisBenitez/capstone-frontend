import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Nav from './components/Nav';
import Login from './components/Login';
import UserPage from './components/users/UserPage';
import Countries from './components/countries/Countries';
import Country from './components/countries/Country';
import Books from './components/books/Books';
import Book from './components/books/Book';
import Films from './components/films/Films';
import Film from './components/films/Film';
import HistoryTopics from './components/historyTopics/HistoryTopics';
import HistoryTopic from './components/historyTopics/HistoryTopic';
import 'react-multi-carousel/lib/styles.css';
import Register from './components/Register';
import { SnackbarProvider } from 'material-ui-snackbar-provider';

function App() {
  const [userId, setUserId] = useState();
  const [username, setUsername] = useState();
  const [loggedIn, setLoggedIn] = useState();
  const [avatar, setAvatar] = useState();

  const getUser = () =>{
    axios.get("http://localhost:8080/getLoggedInUser", {withCredentials: true})
      .then((response)=>{
      console.log(response.data);
      setUserId("");
      setUsername("");
      setLoggedIn("");
      setAvatar("");
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
          <SnackbarProvider SnackbarProps={{ autoHideDuration: 4000 }}>

          <Routes>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/profile/:id" element={<UserPage userId={userId} avatar={avatar} getLoggedInUser={getUser}/>}/>
              <Route path="/" element={<Countries/>}/>
              <Route path="/country/:id" element={<Country/>}/>
              <Route path="/books"  element={<Books userId={userId}/>}/>
              <Route path="/book/:id" element={<Book userId={userId}/>}/>
              <Route path="/films"  element={<Films userId={userId}/>}/>
              <Route path="/film/:id" element={<Film userId={userId}/>}/>
              <Route path="/historyTopics"  element={<HistoryTopics userId={userId}/>}/>
              <Route path="/historyTopic/:id"  element={<HistoryTopic userId={userId}/>}/>
          </Routes>
          </SnackbarProvider>

      </Router>
    </div>
  );
}

export default App;
