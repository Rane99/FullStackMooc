import React from 'react'
import { Link } from "react-router-dom"

const Blog = (props) => {

  const polku = '/blogs/'+props.blog._id
  return (
    <div  className='blog' style={{ marginTop: 40 }}>

    

     <Link to={polku}> {props.blog.title} </Link>
      
     

      <button style={{ marginLeft: "5px" }} onClick={() => props.likeBlog(props.blog._id)} id='likeButton' >like</button>
      <button style={{ marginLeft: "5px" }} onClick={() => props.removeBlog(props.blog._id)} id='removeButton' >remove</button>
    </div>
  )
}

export default Blog
