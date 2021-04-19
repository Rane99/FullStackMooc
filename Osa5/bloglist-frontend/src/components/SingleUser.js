import React, { useState, useEffect, useRef } from 'react'







const User = (props) => {

    if (!props.singleUser) {
        return (

            <p>not found</p>
        )
    }




    return (
        <div >
            <h1>{props.singleUser.name}</h1>

            <h3>added blogs</h3>

            {props.singleUser.blogs.map(blog =>
                <p>{blog.title}</p>
            )}


        </div>

    )
}

export default User
