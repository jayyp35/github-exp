import React from 'react';
import './App.css';
import Search from './components/Search'
import User from './components/User'

class App extends React.Component {

  state= {
    user:null,
    error:null,
    loading:false,
    username:null
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
    }).catch((err) => {
      console.log(err);
    })
  }


  render() {
    const {user,error,loading} = this.state;
    return (
      <div>
      <Search fetchData={this.fetchUserData}/>
      {loading && <p>Loading...</p>}
      <p className="text-danger">{error}</p>
      {!loading && !error && user && <User user={this.state.user} click={this.fetchUserRepsitories}/>}
      </div> 
    )
  }
}

export default App;
