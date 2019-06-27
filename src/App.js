import React, { Fragment, Component} from 'react';
import Navbar from './components/layout/Navbar';
import './App.css';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import axios from 'axios';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import About from "./pages/About.js";



class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null
    }
  
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

    const res = await axios.get(`https://api.github.com/users?q=${username}&client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ users: res.data, loading: false });


  }

  // clear users from state
  clearUsers = () => {
    console.log("clearUsers was clicked");
    this.setState({ users: [], loading: false});
  }

  setAlert = (msg, type) => {
    console.log(msg);
    this.setState({ alert: { msg, type}});
  }

  render() {
    const { users, user, loading } = this.state;

    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
          <Switch>
            <Route exact path='/' render={props =>(
              <Fragment>
                 <Search
                 searchUsers={this.searchUsers}
                 clearUsers={this.clearUsers}
                 showClear={users.length > 0 ? true : false}
                 setAlert={this.setAlert} />
               <Users loading={loading} users={users} />
               </Fragment>
            )} />
            <Route exact path='/about' component={About}/>
            <Route exact path='/user:login' render={props=>(
              <User {...props } getUser={this.getUser} user={user}  loading={loading}/>
            )}/>
          </Switch>        
          </div>
        </div>
      </Router>
    );

  };
}

export default App;
