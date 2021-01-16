import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Query } from "react-apollo";

const USER_QUERY = gql` 
  query findUser($email: String!) {
    user(email: $email) {
      id
      email
      username
      name
      picture
    }
  }
`;


const User = () => {
  const userEmail = localStorage.getItem('email');
  const { loading, error, data } = useQuery(USER_QUERY, {
    variables: { email: userEmail },
  });
  return (
    <div>
      {data && (
        <>
            <div key={data.user.id}>
                {data.user.name}, {data.user.username}, {data.user.email}, {data.user.picture}
            </div>
        </>
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