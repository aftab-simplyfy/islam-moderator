import React, { useEffect, useState } from 'react'
import config from '../config'
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom'
import Loader from './utils/Loader'
import BottomBar from './utils/BottomBar'
import InfiniteScroll from 'react-infinite-scroll-component';

function PostList(props) {
    const [filter, setFilter] = useState("un-verified")
    const [postData, setPostData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [showTranslation, setShowTranslation] = useState(false)
    const {book_id} = useParams();
    const {state} = useLocation();
    const BASE_URL = config["baseUrl"]
    const [offset, setOffset] = useState(0)
    

    useEffect(() => {  
      setNewPosts(filter)

      return () => { }
    }, [offset, filter])

    const handelInfiniteScroll = async () => {
        // console.log("scrollHeight" + document.documentElement.scrollHeight);
        // console.log("innerHeight" + window.innerHeight);
        // console.log("scrollTop" + document.documentElement.scrollTop);
        try {
          if (
            window.innerHeight + document.documentElement.scrollTop + 1 >=
            document.documentElement.scrollHeight
          ) {
            // console.log(offset)
            setOffset((prev) => prev + 20)
            console.log("scroller ", filter)
          }

        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        window.addEventListener("scroll", handelInfiniteScroll);
        return () => window.removeEventListener("scroll", handelInfiniteScroll);
      }, []);
    

    function setNewPosts(filter){
        setIsLoading(true)
        const url = `http://${BASE_URL}/api/v1/master/staff/posts/?book_id=${book_id}&&filter=${filter}&offset=${offset}`
        fetch(url).then((response)=>{
            return response.json()
        }).then((result)=>{
            setPostData((prevData) => [...prevData, ...result.data])
            console.log(result.data)
            setIsLoading(false)
            if (result.data.length === 0) {
                alert("no more result available")
            }

        }).catch((error)=>{
            alert(error.message)
            setIsLoading(false)

        })
    }

    const handleCheckboxChange = (post) => {
        // Update the isChecked state for the clicked post
        const updatedPostData = postData.map((p) =>
          p.id === post.id ? { ...p, is_verified: !p.is_verified } : p
        );
        setPostData(updatedPostData);
        setTimeout(() => {
            console.log(postData)
        }, 3000);
      };
    
    // Function to remove an item from the array
    const removeItem = (itemToRemove) => {
        const newArray = postData.filter(item => item !== itemToRemove);
        setPostData(newArray);
    };

    async function submitContent(post, status){
        if (status === "verified") {
            const url = `http://${BASE_URL}/api/v1/master/staff/posts/verify-post/`
            
            const response = await fetch(url, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                post_id: post.id
            })
        })

            const result = await response.json()
            if (response.status == 200) {
                alert(result.msg)
                console.log(result)
                removeItem(post)
            }
            else{
                alert(result.code)
                console.log(result)
            }
        }
        else{
            alert("you need to select verified status.")
        }
    }

    async function savePostData(post){
            setIsLoading(true)
            const url = `http://${BASE_URL}/api/v1/master/staff/posts/verify-post/`
            
            const response = await fetch(url, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: postData
            })
        })
            try {
                const result = await response.json() 
                if (response.status == 200) {
                    setIsLoading(false)
                    alert(result.msg)
                    console.log(result)
                    window.location.reload(false)
                }
                else{
                    alert(result.code)
                    console.log(result)
                }
            }
            catch (error) {
                alert(error.msg)
            }
            setIsLoading(false)

    
    }
    
  return ( 
    <div className="col-md-12 mt-5 grid-margin stretch-card">
        {isLoading ? <Loader/> : null}
        
    <div className="card-body mt-2">
        <div className="headings d-flex sticky-top justify-content-between">
            <p className="card-title mb-0 h4">{state && state.book.en_name}  </p>      
           
        </div>
        <div className="filters d-flex mt-3">
        <p className='card-title mb-0 mr-2 h4'>
                <p className='ml-2'> Translation</p>
                <select className='form-select  text-center filter' onChange={(e)=>{
                  
                    let language = e.target.value
                    if (language == 1) {
                        setShowTranslation(true)
                    }else{
                        setShowTranslation(false)
                    }
                
                  
                }} name="status" id="status">
                <option value="" >off</option>
                <option value="1">English</option>
                </select>
        </p> 
        <p className='card-title mx-2 mb-0 h4'>
                <p className='ml-2'> Status</p>
                <select className='form-select text-center filter' onChange={(e)=>{
                  
                    setFilter(e.target.value)
                    setPostData([])
                    setOffset(0)
                    console.log("elll")
                    // setNewPosts(e.target.value)
                
                  
                }} name="status" id="status">
                <option selected disabled value="">-- Select --</option>
                <option value="un-verified">Un-Verified</option>
                <option value="verified">Verified</option>
                <option value="both">Both</option>
                </select>
        </p> 
        </div>
        <div className="table-responsive mt-3">
            <table className="table table-striped table-borderless">
                <thead>
                <tr>
                    <th className='col-md-2'>Source</th>
                    <th className='col-md-8'>Text</th>
                    {/* <th>Content 2</th> */}
                    <th className='col-md-2'>Verified</th>
                    {/* <th>Action</th> */}
                </tr>
                </thead>
              
                    <tbody>
                    {
                                postData && postData.map((post, index)=>{
                                    let isChecked = post.is_verified
                                    return <tr key={index}>
                                    <td>{post.source}</td>
                                    <td className='pr-5'>
                                        <p className='text-wrap my-2 arabic'>{post.ar_content}</p>
                                        {showTranslation && <p className='text-wrap my-2'>{post.en_content}</p>}
                                    
                                    </td>                        
                                    {/* <td><p className=' text-wrap arabic'>{post.ar_content}</p></td>                         */}
                                    <td className=''> <input style={{width: "30px", height: "30px", backgroundColor: 'red'}} type="checkbox" onChange={()=> {handleCheckboxChange(post)}} checked={isChecked} id={post.id} />
                                        </td>                        
                                                    
                                    {/* <td> {post.is_verified ? <button disabled className='btn btn-primary btn-icon-text'>Verified</button> : <button className='btn btn-primary btn-icon-text' onClick={()=>{submitContent(post, status)}}>Sumbit</button>}</td> */}
                                    </tr>
                                })
                    }
                        
            
                    </tbody>
        </table>
                    {/* </div> */}
       
        </div>
        {/* <div id='save-btn' className='d-flex justify-content-center'>
                        <button  className='btn btn-primary btn-icon-text' onClick={savePostData}>Save</button>
                    </div> */}
        <div className='d-flex justify-content-center'>               
            <BottomBar title={filter} savePostData={savePostData} />
        </div>
    </div>
{/* </InfiniteScroll> */}
</div>

  )
}

export default PostList