import React from 'react'

const RepoCard = ({key,repo}) => {
    let link = `https://github.com/${repo.owner.login}/${repo.name}`
    return (
        <div className="card">
            <div className="card-body">
            <a href={link} target="_blank"><h3>{repo.name} </h3></a>
                <p>{repo.description}</p>
                <h4></h4>
            </div>
        </div>
    )
}

export default RepoCard