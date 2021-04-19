import blogService from '../services/blogs'



const reducer = (state = [], action) => {
    console.log("staten now", state)
    console.log(action, 'action')

    switch (action.type) {
        case 'ADD':
            const newBlog = action.data
            return [...state, newBlog]





        case 'LIKE':
            const id = action.data.id
            const blogToChange = state.find(n => n._id === id)
            const changedBlog = {
                ...blogToChange,
                likes: blogToChange.likes + 1
            }

            console.log("changed blog", changedBlog)

            return state.map(blog => blog._id !== id ? blog : changedBlog)

        case 'COMMENT':
            const myID = action.data.id



            return state.map(blog => blog._id !== myID ? blog : action.data.commentedBlog)

        case 'REMOVE':

            const identifier = action.data.id
            const blogToRemove = state.find(n => n._id === identifier)


            console.log("removed blog", blogToRemove)

            return state.filter(blog => blog._id !== identifier)

        case 'INIT_BLOGS':
            return action.data

        default: return state
    }
}


export const addBlog = (content) => {

    return async dispatch => {
        const newBlog = await blogService.create(content)
        console.log('new blog')
        dispatch({
            type: 'ADD',
            data: newBlog
        })
    }
}

export const likeBlog = (id, blog) => {

    return async dispatch => {
        const updatedBlog = await blogService.update(id, blog)
        dispatch({
            type: 'LIKE',
            data: { id }
        })
    }
}

export const removeBlog = (id) => {

    return async dispatch => {
        const removeBlog = await blogService.remove(id)
        dispatch({
            type: 'REMOVE',
            data: { id }
        })
    }
}

export const commentBlog = (id, comment) => {

    return async dispatch => {
        const commentedBlog = await blogService.comment(id, comment)
        console.log("commentd", commentedBlog)
        dispatch({
            type: 'COMMENT',
            data: { id, commentedBlog }
        })
    }
}


export const initializeBlogs = () => {
    console.log("INIT")
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export default reducer