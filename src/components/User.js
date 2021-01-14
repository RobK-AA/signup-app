import React from 'react';
import { useQuery, gql } from '@apollo/client';

const USER_QUERY = gql`
  {
    users {
      id
      name
      username
      email
      picture
    }
  }
`;

const User = (props) => {
  const { data } = useQuery(USER_QUERY);
  return (
    <div>
      {data && (
        <>
          {data.users.map((user) => {
            return (
                <div key={user.id}>
                    {user.name}, {user.username}, {user.email}, {user.picture}
                </div>
                )
            })}
        </>
      )}
    </div>
  );
};

export default User;