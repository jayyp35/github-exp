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
    fetchedrepos:false,
    page:1,
  }

  fetchUserData = (username) => {
    //fetch github api  
      this.setState({
      loading:true,
      repos:null,
      totalrepos:0,
      reposshowing:0,
      fetchedrepos:false,
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
        reposshowing: data.length,
        fetchedrepos:true,
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  loadmore = () => {
    
    const {page,fetchedrepos,reposshowing,totalrepos} = this.state
    if(fetchedrepos && (reposshowing<totalrepos)) {
      this.setState({
        fetchedrepos:false
      })
      console.log("Loading more");
      fetch(`https://api.github.com/users/${this.state.username}/repos?page=${this.state.page}>`)
      .then((response) => {
        return response.json()
      }).then((data) => {
        const prevrepos = this.state.repos
        const morerepos = [...prevrepos,...data]
        console.log(morerepos);
        this.setState({
          repos:morerepos,
          page: page+1,
          reposshowing: morerepos.length,
          fetchedrepos:true
        })
      })
    }
  }

  componentDidMount() {
    window.addEventListener("scroll",this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener("scroll",this.handleScroll)
  }

  handleScroll = () => {
    const currentScroll = window.scrollY
    const maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight
    
    if(maxScroll-currentScroll < 100) {
      this.loadmore()
    }
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
          
        </div>
      </div> 
    )
  }
}

export default App;
 