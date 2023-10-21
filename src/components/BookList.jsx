import React, { useEffect, useState } from 'react'
import config from '../config';
import { Link, useNavigate } from 'react-router-dom';
import BottomBar from './utils/BottomBar';
import AlertComp from './utils/AlertComp';

function BookList() {
    const [BookData, setBookData] = useState(null)
    const navigate = useNavigate();

   
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    useEffect(() => { 
      const BASE_URL = config["baseUrl"]
      const url = `http://${BASE_URL}/api/v1/master/posts/islamic-books/`
      fetch(url).then((response)=>{
        return response.json()
      }).then((result)=>{
        console.log(result.data)
        setBookData(result.data)
      }).catch((error)=>{
        alert(error.message)
      })
      return () => { }
    }, [])
    
  return (
    <div className="col-lg-12 mt-5 grid-margin stretch-card">
            <div className="card-body mt-2">
            <h4 className="card-title">Islamic Books for Posts</h4>
            <div className="table-responsive">
             
                <table className="table table-striped">
                <thead>
                    <tr>
                    <th className='text-center'>Cover Image</th>
                    <th  className='text-center'>Book Title English</th>
                    <th className='text-center'>Book Title Arabic</th>
                    <th className='text-center'>Created on</th>
                    <th className='text-center'>Updated on</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        BookData && BookData.map((book, index)=>{
                            const cr_date_obj = new Date(book.created_on);
                            const up_date_obj = new Date(book.updated_on);
                            const created_on = `${months[cr_date_obj.getMonth()]} ${cr_date_obj.getDate()}, ${cr_date_obj.getFullYear()}`
                            const updated_on = `${months[up_date_obj.getMonth()]} ${up_date_obj.getDate()}, ${up_date_obj.getFullYear()}`
                            return <tr>
                              <td className="py-1 text-center">
                                  <img src={book.cover_image} alt="image" />
                              </td>
                              <td  className='text-center'><Link to={{ pathname: `books/${book.id}/`}} state={{book: book}}  >{book.en_name} </Link> </td>
                              <td className='text-center'>{book.ar_name}</td>                        
                              <td className='text-center'>{created_on}</td>
                              <td className='text-center'>{updated_on}</td>
                            </tr>
                        })
                    }
                </tbody>
                </table>
            </div>
            </div>
        </div>
  )
}

export default BookList