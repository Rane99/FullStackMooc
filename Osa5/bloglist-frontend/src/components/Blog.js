import React from 'react'
const Blog = ({ blog, viewBlog, likeBlog, removeBlog }) => (
  <div className='blog'>
    {blog.title} {blog.author}
    
    <button onClick={viewBlog}>view</button>
    <button onClick={likeBlog} id='likeButton' >like</button>
    <button onClick={removeBlog} id='removeButton' >remove</button>
  </div>
)

export default Blog
