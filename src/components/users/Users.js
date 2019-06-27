import React from 'react';
import UserItem from './UserItem.js';
import Spinner from '../layout/Spinner.js';
import PropTypes from 'prop-types';


// state = {
    //     users: [
    //         {
    //           id: 'id',
    //           login: 'mojombo',
    //           avatar_url: "https://avatars0.githubusercontent.com/u/1?v=4",
    //           html_url: "https://github.com/mojombo"
    //         },
    //         {
    //             id: 'id2',
    //             login: 'mojombo2',
    //             avatar_url: "https://avatars0.githubusercontent.com/u/1?v=4",
    //             html_url: "https://github.com/mojombo"
    //           },
    //           {
    //             id: 'id3',
    //             login: 'mojombo3',
    //             avatar_url: "https://avatars0.githubusercontent.com/u/1?v=4",
    //             html_url: "https://github.com/mojombo"
    //           }
    //       ]  
    //         }



// export class Users extends Component {
const Users = ({ users, loading }) => {
    console.log(users)
    if(loading) {
        return <Spinner />
    } else {
    return (
        <div style={userStyle}>
            {users.map(user => (
                <UserItem key = {user.id} user={user}/>
            ))}
        </div>
    ) }

}

Users.PropTypes = {
    user: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
}

const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
}

export default Users
