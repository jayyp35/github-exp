import React from 'react'

const User = ({user,click}) => {
    return(
        <div className="card">
            <div className="card-body">
                <img src={user.avatar_url} alt="Img"/>
                <h1>{user.name}</h1>
                <p>{user.company}</p>
                <p>{user.bio}</p>
            </div>
            <button onClick={()=>click(user.login)} className="btn btn-success">Fetch Repos</button>
        </div>
    )
}

export default User