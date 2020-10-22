
const notificationReducer = (state = { action: 'HIDE', message: 'nothing' }, action) => {
    console.log('state now: ', state)
    console.log('action', action)

    switch (action.type) {
        case 'SHOW':

            const newState = {
                action: 'SHOW',
                message: action.message
            }

            return newState

        case 'HIDE':

            const newState2 = {
                action: 'HIDE',
                message: action.message
            }
            return newState2

        default: return state
    }
}

let timer = null

export const showNotification = (message, time) => {
    return async dispatch => {

        
       

        dispatch({

            type: 'SHOW',
            message: message
        })

        clearTimeout(timer)

         timer = setTimeout(() => {
            dispatch({

                type: 'HIDE',
                message: 'nothing'
            })
        }, time*1000)

        
        

        

    }
}




export default notificationReducer
