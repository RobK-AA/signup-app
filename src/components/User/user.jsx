import React from 'react';
import { useHistory } from 'react-router';
import { USER_QUERY } from '../../util/session_util';
import { Query } from "react-apollo";
import { useQuery } from 'react-apollo';

const User = () => {
  const userEmail = localStorage.getItem('email');
  const { data } = useQuery(USER_QUERY, {
    variables: { email: userEmail },
  });
  const history = useHistory();
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
              <div className="flex mt3" style={{display:"contents"}}>
                    <button
                        className="pointer mr2 button"
                        type="submit"
                        onClick={() => history.push('/')}
                    >
                    Back to form
                    </button>
                    
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default User;