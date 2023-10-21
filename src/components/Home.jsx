import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import BookList from './BookList'
import Loader from './utils/Loader'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase-auth'

function Home(props) {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user)=>{
      if (user) {
        // User is signed in.
        setUser((prevUser)=>{return user});
      } else {
        // User is signed out.
        navigate("/login")
        setUser(null);
      }
    })
    return () => unsubscribe();
  }, [])
  
  
  return (
    <>
    <BookList/>
    </>
  )
}

export default Home