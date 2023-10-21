import React, { useEffect } from 'react'
import PostList from './PostList'

function PostReview() {

  return (
    <>
        <p className='h4'> Available Posts </p>
        <PostList />
    </>
    
  )
}

export default PostReview