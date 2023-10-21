import logo from './logo.svg';
import './App.css';
import './vendors/feather/Feather.css'
import './vendors/alert/style.css'
import Login from './components/Login';
import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import Home from './components/Home';
import Navbar from './components/Navbar';
import PostReview from './components/PostReview';
import PostList from './components/PostList';
import { useEffect, useState } from 'react';
import config from './config';
import NotFound from './components/errors/NotFound';
import { auth } from './firebase-auth';

function App() {
  const [user, setUser] = useState(null)


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user)=>{
      if (user) {
        // User is signed in.
        setUser((prevUser)=>{return user});
      } else {
        // User is signed out.
        setUser(null);
      }
    })
    return () => unsubscribe();
  }, [])
  

  return (
    <BrowserRouter>
    { user ? <Navbar user={user} /> : null}
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
          <Routes>
              <Route path='/' element={<Home user={user} />} />
              <Route path='/login' element={<Login user={user} />} />
              {/* post review */}
              <Route path='/books/:book_id/' element={<PostList title="Available Posts for Quran"  />} />
              <Route path='*' element={<NotFound  />} />
          </Routes>
         
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
