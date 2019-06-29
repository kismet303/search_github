import React, { Fragment, Component} from 'react';
import Navbar from './components/layout/Navbar';
import './App.css';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import axios from 'axios';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import About from "./pages/About.js";
import Alert from "./components/layout/Alert.js";



class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
    repos: []
    };
  
  // async componentDidMount(){
  //   this.setState({ loading: true});
  //   const res = await axios.get(`https://api.github.com/users?client_id=
  //   ${process.env.REACT_APP_GITHUB_CLIENT_ID}
  //   &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  //   console.log(res.data);
  //   console.log('testing');

  //   this.setState({ users: res.data, loading: false });
  // };

  // Search github Users
  searchUsers = async text => {
console.log(text);
this.setState({ loading: true});
const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ users: res.data.items, loading: false });
  }

  // Search a single user
  getUser = async (username) => {
    this.setState({ loadiang: true})

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    console.log("getting user info");
    console.log(username);
    console.log(res.data);
    this.setState({ user: res.data, loading: false });
  }

  getUserRepos = async (username) => {
    this.setState({ loadiang: true})

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    console.log("getting user repos");
    this.setState({ repos: res.data, loading: false });
  }



  // clear users from state
  clearUsers = () => {
    console.log("clearUsers was clicked");
    this.setState({ users: [], loading: false});
  }

  setAlert = (msg, type) => {
    console.log(msg);
    this.setState({ alert: { msg, type}});
    setTimeout(() => this.setState({ alert: null}), 3000);
  }

  render() {
    const { users, user, loading, repos} = this.state;

    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
          <Switch>
            <Route exact path='/' render={props =>(
              <Fragment>
                <Alert alert={this.state.alert} />
                 <Search
                 searchUsers={this.searchUsers}
                 clearUsers={this.clearUsers}
                 showClear={users.length > 0 ? true : false}
                 setAlert={this.setAlert} />
               <Users loading={loading} users={users} />
               </Fragment>
            )} />
            <Route exact path='/about' component={About}/>
            <Route exact path='/user/:login' render={props=>(
            <User {...props } 
            getUser={this.getUser} 
            getUserRepos={this.getUserRepos} 
            user={user}  
            repos={repos}
            loading={loading}/>
            )}/>
          </Switch>        
          </div>
        </div>
      </Router>
    );

  };
}

export default App;
