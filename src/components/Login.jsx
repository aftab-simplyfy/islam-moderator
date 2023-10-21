import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase-auth'
import Loader from './utils/Loader'

function Login(props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user)=>{
      if (user) {
        // User is signed in.
        navigate("/")
      }
    })
    return () => unsubscribe();
  }, [])

  const signInStaffUser = async (e)=>{
    e.preventDefault()
    if (!email && !password) {
      alert("please enter your credentials...")
      return;
    }
    setIsLoading(true)
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setIsLoading(false)
          navigate("/")
            // alert("Signin Success")
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setIsLoading(false)
          alert(errorMessage)
        });
      }
    
    
  return (
    <div className="content-wrapper d-flex align-items-center auth px-0">
      {isLoading && <Loader/>}
      <div className="row w-100 mx-0">
        <div className="col-lg-4 mx-auto">
          <div className="auth-form-light text-left py-5 px-4 px-sm-5">
            <div className="brand-logo">
              {/* <img src="../../images/logo.svg" alt="logo" /> */}
              <p className='h3 text-center'>Islam-iQ</p>
              {/* <p className='h5 text-center'>Content Moderator Platform</p> */}
            </div>
            <h4>Staff Login</h4>
            <h6 className="font-weight-light">Sign in to continue.</h6>
            <form className="pt-3">
              <div className="form-group">
                <input
                  type="email"
                  onChange={(e)=>{setEmail(e.target.value)}}
                  className="form-control form-control-lg"
                  id="exampleInputEmail1"
                  placeholder="Email"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  onChange={(e)=>{setPassword(e.target.value)}}
                  className="form-control form-control-lg"
                  placeholder="Password"
                />
              </div>
              <div className="mt-3">
                <button
                type='submit'
                  className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                  onClick={(e)=>{signInStaffUser(e)}}
                >
                  SIGN IN
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>



  )
  }

export default Login