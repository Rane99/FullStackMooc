
import React, {useState} from 'react'
const NewBlogForm = ({ createNewBlog }) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        const blogObject = {
            title: title,
            author: author,
            url: url,

        }

        createNewBlog(blogObject)


        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (

        <form onSubmit={addBlog}>
            <h2>create new</h2>
            <div>
                title
          <input
                    id='title'
                    type="text"
                    value={title}
                    name="title"
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
                author
          <input
                    id='author'
                    type="text"
                    value={author}
                    name="author"
                    onChange={({ target }) => setAuthor(target.value)}
                />
            </div>
            <div>
                url
          <input
                    id='url'
                    type="text"
                    value={url}
                    name="url"
                    onChange={({ target }) => setUrl(target.value)}
                />
            </div>
            <button id='submit' type="submit">create</button>
        </form>
    )
}


export default NewBlogForm