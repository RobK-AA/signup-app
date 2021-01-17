import React from 'react';
import { USER_QUERY } from '../../util/session_util';
import { Query } from "react-apollo";
import { useQuery } from 'react-apollo';

const User = () => {
  const userEmail = localStorage.getItem('email');
  const { loading, error, data } = useQuery(USER_QUERY, {
    variables: { email: userEmail },
  });
  return (
    <div>
      {data && (
        <div className="confirmation-container">
            <div className="confirmation-user"key={data.user.id}>
              <div className="greeting">
                <h3 className="greeting-text">Hello {data.user.name}</h3>
              </div>
              <div>
                <label>Email</label>
                <h5>{data.user.email}</h5>
              </div>
              <div>
                <label>Username</label>
                <h5>{data.user.username}</h5>
              </div>
              <div className="user-picture">
                <label>Picture</label>
                <div style={{ backgroundImage: `url(${data.user.picture})` }} className="picture-container"></div>
                <h5>{data.user.picture}</h5>
              </div>
            </div>
        </div>
      )}
    </div>
  );

  // return (
  //   <Query query={USER_QUERY}>
  //     {({ loading, error, data }) => {
  //       if (loading) return "Loading...";
  //       if (error) return `Error! ${error.message}`;

  //       return (
  //         <div>
  //           {data.user.name}, {data.user.username}, {data.user.email}, {data.user.picture}
  //         </div>
  //       );
  //     }}
  //   </Query>
  // );
};

export default User;