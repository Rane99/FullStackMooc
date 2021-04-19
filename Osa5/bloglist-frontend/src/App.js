import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Users from './components/Users'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBLogForm from './components/NewBlogForm'
import Togglable from './components/Toggleable'
import SingleUser from './components/SingleUser'
import SingleBlog from './components/SingleBlog'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, addBlog, likeBlog, removeBlog } from './reducers/blogReducer'
import { login, logout, loadLogin } from './reducers/userReducer'
import userService from './services/users'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch,
  useHistory,
} from "react-router-dom"




const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState([])


  const blogFormRef = useRef()

  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)

  const user = useSelector(state => state.user)







  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)


    dispatch(login(username, password))

    setUsername('')
    setPassword('')
    {
      setTimeout(() => {
      }, 5000)
    }
  }






  const addNewBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()

    dispatch(addBlog(blogObject))
  }

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <NewBLogForm createNewBlog={addNewBlog} />
    </Togglable>
  )


  useEffect(() => {
    dispatch(initializeBlogs())

  }, [dispatch])

  useEffect(() => {

    dispatch(loadLogin())
  }, [])

  useEffect(() => {
    userService.getAll().then(jusers => setUsers(jusers))


  }, [])

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <div>
        username
          <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-button' type="submit">login</button>
    </form>
  )

  const logout1 = () => {
    console.log("ulos")
    dispatch(logout())
  }

  const likeBLogI = (id) => {
    const blog = blogs.find(elem => elem._id === id)
    const newBlog = { ...blog, likes: blog.likes + 1 }
    console.log("new blog", newBlog)
    dispatch(likeBlog(id, newBlog))

  }

  const removeBlogI = (id) => {
    console.log("remove blog")
    dispatch(removeBlog(id))

  }





  const blogsDiv = () => (
    <div style={{ marginTop: 100 }}>

      <h2>Blogs</h2>
      <p style={{ marginTop: 50 }}>{user.username} logged in</p>

      <button style={{ marginTop: 30, marginBottom: 30 }} onClick={(logout1)}>
        Logout
     </button>

      {blogForm()}



      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} likeBlog={likeBLogI} removeBlog={removeBlogI} />
      )}
    </div>
  )

  const match = useRouteMatch('/users/:id')
  const singleUser = match
    ? users.find(us => us.id === match.params.id)
    : null


  const match2 = useRouteMatch('/blogs/:id')
  const singleBlog = match2
    ? blogs.find(bl => bl._id === match2.params.id)
    : null

  const padding = { padding: 5 }

  const helperDiv = () => (
    <div>

      <h2>blogs</h2>
      <p>{user.username} logged in</p>

      <button onClick={(logout1)}>
        Logout
      </button>


    </div>
  )



  return (


    <div class="container">


      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/blogs">blogs</Link>
        <Link style={padding} to="/users">users</Link>

      </div>


      <Switch>
        <Route path="/users/:id">

          {user !== null && helperDiv()}




          <SingleUser singleUser={singleUser} />

        </Route>

        <Route path="/blogs/:id">

          {user !== null && helperDiv()}




          <SingleBlog singleBlog={singleBlog} />

        </Route>

        <Route path="/blogs">
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} likeBlog={likeBLogI} removeBlog={removeBlogI} />
          )}
        </Route>

        <Route path="/users">
          <Users users={users} />
        </Route>

        <Route path="/">
          {user === null && loginForm()}
          {user !== null && blogsDiv()}
          {user !== null && <Users users={users} />}
        </Route>
      </Switch>



    </div>
  )
}

export default App