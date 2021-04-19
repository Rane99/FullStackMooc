const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { request, response } = require('../app')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
    console.log("nodemon testi")
    const blogs = await Blog.find({}).populate('user')
  
      response.json(blogs)
  
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: 0,
    comments: [],
    user: user._id
  })

  const saved = await blog.save()

  user.blogs = user.blogs.concat(saved._id)
  await user.save()
  response.status(201).json(saved)


})

blogsRouter.put('/:id', async(request, response) => {
  const updated = await Blog.findByIdAndUpdate(request.params.id, request.body)
  response.status(204).json(updated)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.post('/:id/comments', async(request, response) => {
  const comment = request.body.comment
  

  
  const id = request.params.id
  console.log(id)
  const blog = await Blog.findById(id)
  console.log(blog)
  console.log(blog.comments)
  blog.comments = blog.comments.concat(comment)
  const saved = await blog.save()
  response.status(201).json(saved)

})



module.exports = blogsRouter