import React from 'react'

const RepoCard = ({repo}) => {
    let link = `https://github.com/${repo.owner.login}/${repo.name}`
    return (
        <div className="card m-1 rounded">
            <div className="card-body">
            <a className="text-info" href={link} target="_blank" rel="noreferrer"><h3>{repo.name} </h3></a>
                <p>{repo.description}</p>
                <h4></h4>
            </div>
        </div>
    )
}

export default RepoCard 