import React, { Component, Fragment } from 'react';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Repos from '../repos/Repos';


export class User extends Component {
    componentDidMount() {
        this.props.getUser(this.props.match.params.login);
        this.props.getUserRepos(this.props.match.params.login);
    };

    static propTypes = {
        loading: PropTypes.bool.isRequired,
        getUserRepos: PropTypes.func.isRequired,
        repos: PropTypes.array.isRequired
    };

    render() {
        const { name,
            avatar_url,
            location,
            company,
            bio,
            blog,
            login,
            html_url,
            followers,
            following,
            public_repos,
            public_gists,
            hireable ,
        } = this.props.user;


const {loading, repos} = this.props;
if (loading) return <Spinner />;
        return (
            <div>
                <Link to= "/"   className='btn btn-light'>
                Back To Search
                </Link>
                <h3>Profile</h3>
                Hireable: {' '}
                {hireable ? (
                    <i className='fas fa-check text-success' />
                ) : (
                        <i classame='fas fas-times-circle text-danger' />
                    )}

                <div className="card grid-2">
                    <div className="all-center">
                        <img src={avatar_url} className='round-img' alt="" style={{ width: '150px' }} />
                    
                    <h1>{name}</h1>
                    <p>{location}</p>
                    </div>
                    <div>
                
                {bio && ( <Fragment>
                    <h3>Bio</h3>
                    <p>{bio}</p>
                    </Fragment>
                    )}
                    <a href={html_url} className='btn btn-dark my-1'>Visit Github Profile</a>
                    <ul>
                        <li>
                            {login && <Fragment>
                                <strong>Username: </strong>{login}
                                 </Fragment>}
                        </li>
                        <li>
                            {login && <Fragment>
                                <strong>Company: </strong>{company}
                                 </Fragment>}
                        </li>
                        <li>
                            {login && <Fragment>
                                <strong>Website: </strong>{blog}
                                 </Fragment>}
                        </li>
                    </ul>
                    </div>
                    
                    </div>
                
                
                <div className="card text-center">
                <div className="badge badge-primary">Followers:{followers}</div>
                <div className="badge badge-success">Following:{following}</div>
                <div className="badge badge-light">Public repos:{public_repos}</div>
                <div className="badge badge-dark">Public Gists:{public_gists}</div>
                </div>

                <div>
                    <Repos repos={repos} />
                </div>
            </div>
        )
    }
};

export default User
