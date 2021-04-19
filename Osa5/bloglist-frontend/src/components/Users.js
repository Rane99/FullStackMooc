import React, { useState, useEffect, useRef } from 'react'
import { Link } from "react-router-dom"

const User = (props) => {

    const polku = '/users/'+props.id

    return (
        < div >


            <Link to={polku}> {props.name} </Link>


            <span style={{ marginLeft: 200 }}>{props.created}</span>


        </div >
    )
}


const Users = (props) => {

    console.log("USERS", props.users)



    return (
        <div style={{marginTop: 150}}>
            <h1>Users</h1>
            <h4 style={{ marginLeft: 200 }}>blogs created</h4>
            {props.users.map(user =>
                <User key={user.id} name={user.name} created={user.blogs.length} id={user.id} />
            )}
        </div>

    )
}

export default Users
