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
    repos:null
  }

  fetchUserData = (username) => {
    //fetch github api  
    console.log("fetching user data");
    this.setState({
      loading:true
    })
    const res = fetch(`https://api.github.com/users/${username}`)
    res.then((response) => {
        return response.json()
    }).then((data)=>{
      this.setState({
        user:data,
        error:data.message,
        loading:false,
        username:data.login,
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
    console.log("Fetching user repos");

    fetch(`https://api.github.com/users/${this.state.username}/repos`)
    .then((response) => {
      return response.json()
    }).then((data)=> {
      console.log(data);
      this.setState({
        repos:data
      })
    }).catch((err) => {
      console.log(err);
    })
  }


  render() {
    const {user,error,loading,repos} = this.state;
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
        </div>
      </div> 
    )
  }
}

export default App;
