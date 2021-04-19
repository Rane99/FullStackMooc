import blogService from '../services/blogs'
import loginService from '../services/login'



const reducer = (state = {}, action) => {
    console.log("staten now", state)
    console.log(action, 'action')

    switch (action.type) {
        case 'LOGIN':

            return action.data

        case 'LOADLOGIN':
            console.log("NIEW")

            return action.data



        case 'LOGOUT':
            return {}



        default: return state
    }
}


export const login = (username, password) => {

    return async dispatch => {



        try {
            var user = await loginService.login({
                username, password,
            })

            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )

            blogService.setToken(user.token)


        }
        catch (error) {
            console.log("ERROR", error)
        }


        dispatch({
            type: 'LOGIN',
            data: user
        })
    }
}








export const loadLogin = () => {

    return async dispatch => {
        var user = null
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            user = JSON.parse(loggedUserJSON)

            console.log("USER", user)

            blogService.setToken(user.token)

        }
        dispatch({
            type: 'LOADLOGIN',
            data: user
        })
    }
}


export const logout = () => {

    return async dispatch => {
        window.localStorage.removeItem('loggedBlogappUser')
        window.location.reload(false);
        console.log('ulos')
        dispatch({
            type: 'LOGOUT'
        })
    }
}



export default reducer


