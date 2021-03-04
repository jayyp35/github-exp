import React from 'react'

const User = ({user,click}) => {
    return(
        <div className="card m-2">
            <div className="card-body text-center border border-5 border-dark rounded m-2 bg-secondary">
                <img className="border border-info m-2" src={user.avatar_url} alt="Img"/>
                <h1>{user.name}</h1>
                <hr></hr>
                <p>{user.company}</p>
                <p>{user.bio}</p>
            </div>
            <button onClick={()=>click(user.login)} className="btn btn-dark">Fetch Repos</button>
        </div>
    )
}

export default User 