const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'myBook',
        author: "kalle havumäki",
        url: "www.myUrl.com",
        likes: 10
    },
    {
        title: 'kirjani',
        author: "seppo lehto",
        url: "www.osoitteeni.com",
        likes: 3
    },
]





beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test('notes are returned as json ', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(2)
})

test('blog can be added ', async () => {
    const newBlog = {
        title: 'minunKirja',
        author: "ismo havumäki",
        url: "www.ni.com",
        likes: 9
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(contents).toContain(
        'minunKirja'
    )
})



afterAll(() => {
    mongoose.connection.close()
})