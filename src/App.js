import React from 'react';
import './App.css';
import Search from './components/Search'
import User from './components/User'
import RepoCard from './components/repoCard'

class App extends React.Component {

  state= {
    user:null,
    error:null,
    loading:false,
    username:null,
    repos:null,
    totalrepos:0,
    reposshowing:0,
    page:1,
  }

  fetchUserData = (username) => {
    //fetch github api  
      this.setState({
      loading:true,
      repos:null,
      totalrepos:0,
      reposshowing:0
    })
    const res = fetch(`https://api.github.com/users/${username}`)
    res.then((response) => {
        return response.json()
    }).then((data)=>{
      console.log(data);
      this.setState({
        user:data,
        error:data.message,
        loading:false,
        username:data.login,
        totalrepos: data.public_repos,
      })
    })
    .catch((err)=> {
      this.setState({
        error:"Error fetching data",
        loading:false
      })
    })
  }

  fetchUserRepsitories = (username) => {
    const {page} = this.state

    fetch(`https://api.github.com/users/${this.state.username}/repos?page=${this.state.page}>`)
    .then((response) => {
      return response.json()
    }).then((data)=> {
      console.log("Repositoties fetched: ",data.length);
      this.setState({
        repos:data,
        page: page + 1,
        reposshowing: data.length
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  loadmore = () => {
    console.log("Loading more");
    const {page,reposshowing} = this.state
    fetch(`https://api.github.com/users/${this.state.username}/repos?page=${this.state.page}>`)
    .then((response) => {
      return response.json()
    }).then((data) => {
      const {repos} = this.state
      const morerepos = [...repos,...data]
      console.log(morerepos);
      this.setState({
        repos:morerepos,
        page: page+1,
        reposshowing: morerepos.length
      })
    })
  }

  render() {
    const {user,error,loading,repos,reposshowing,totalrepos} = this.state;
    return (
      <div>
        <Search fetchData={this.fetchUserData}/>
        <div className="container">
          <div className="text-center pt-5">
          {loading && <p><b>Loading...</b></p>}
          <p className="text-danger"><b>{error}</b></p>
          </div>
          {!loading && !error && user && <User user={this.state.user} click={this.fetchUserRepsitories}/>}
          {!loading && repos && repos.map((repo,index) => <RepoCard key={index} repo={repo}/>)}
          {reposshowing>0 && reposshowing<totalrepos && <button className="btn btn-success" onClick={() => this.loadmore()}> Load More </button>}
        </div>
      </div> 
    )
  }
}

export default App;
 