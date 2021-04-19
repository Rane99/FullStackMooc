import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { commentBlog } from '../reducers/blogReducer'
import {
    useHistory,
  } from "react-router-dom"



const CommentForm = (props) => { 
    const history = useHistory()
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()


    const handleComment = (event) => {
        event.preventDefault()
        console.log(comment)

        dispatch(commentBlog(props.id, comment))

        
    }

    return (
    <form onSubmit={handleComment}>
    
      
        
          <input value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
      
      <button  type="submit">add comment</button>
    </form>
  )
    }

const Blog = (props) => {


    const link = props.singleBlog.url
    return (
        <div>
            <h2>{props.singleBlog.title}</h2>
            <a href={link}>link </a>
            <p>{props.singleBlog.likes} likes</p>
            <p>added by {props.singleBlog.author}</p>

            <h3>comments</h3>
            <CommentForm id={props.singleBlog._id}/>
            {props.singleBlog.comments.map(comment =>
                <p>{comment}</p>
            )}
        </div>
    )
}

export default Blog