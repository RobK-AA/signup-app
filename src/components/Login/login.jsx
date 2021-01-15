// import React from 'react';
// import { Link } from 'react-router-dom';

// class Login extends React.Component {
//     render() {
//         return (
//             <div>
//                 Login page
//                 <p>Need to create an account?</p>
//                 <p><Link to="/">Sign Up</Link></p>
//             </div>
//         )
//     }
// }

// export default Login;

import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router';
const AUTH_TOKEN = 'auth-token';

const SIGNUP_MUTATION = gql`
        mutation SignupMutation(
            $email: String!
            $username: String!
            $name: String!
            $password: String!
            $picture: String!
        ) {
            signup(
                email: $email
                password: $password
                name: $name
                username: $username
                picture: $picture
            ) {
                token
            }
        }
    `;

const LOGIN_MUTATION = gql`
  mutation LoginMutation(
    $email: String!
    $password: String!
  ) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const Login = () => {
  const history = useHistory();
  const [formState, setFormState] = useState({
    login: true,
    email: '',
    password: '',
    name: '', 
    confirmPassword: "",
    picture: null,
    pictureUrl: "https://img.icons8.com/ios-glyphs/100/000000/test-account.png",
    errors: {}
  });

  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: formState.email,
      password: formState.password
    },
    onCompleted: ({ login }) => {
      localStorage.setItem(AUTH_TOKEN, login.token);
      history.push('/');
    }
  });

  const [signup] = useMutation(SIGNUP_MUTATION, {
    variables: {
      name: formState.name,
      email: formState.email,
      password: formState.password
    },
    onCompleted: ({ signup }) => {
      localStorage.setItem(AUTH_TOKEN, signup.token);
      history.push('/');
    }
  });

      function addPhoto(e) {
        e.preventDefault();
        const profilePhoto = new FileReader();
        const photo = e.target.files[0];

        profilePhoto.onloadend = () => {
            let newPhotoUrl = formState.pictureUrl;
            newPhotoUrl = profilePhoto.result

            let newPhoto = formState.picture;
            newPhoto = photo;

            setFormState({ 
              ...formState,
              pictureUrl: newPhotoUrl, 
              picture: newPhoto });
        }

        if (photo) {
            profilePhoto.readAsDataURL(photo);
        } else {
            alert("Please choose another file type")
        }
    }

  return (
    <div>
      <h4 className="mv3">{formState.login ? 'Login' : 'Sign Up'}</h4>
      <div className="flex flex-column">
        {!formState.login && (
          <input
            value={formState.name}
            onChange={(e) =>
              setFormState({
                ...formState,
                name: e.target.value
              })
            }
            type="text"
            placeholder="Your name"
          />
        )}
        {!formState.login && (
          <input
            value={formState.email}
            onChange={(e) =>
              setFormState({
                ...formState,
                email: e.target.value
              })
            }
            type="text"
            placeholder="Your email"
          />
        )}
        {!formState.login && (
          <input
            value={formState.username}
            onChange={(e) =>
              setFormState({
                ...formState,
                username: e.target.value
              })
            }
            type="text"
            placeholder="Your username"
          />
        )}
        <input
          value={formState.email}
          onChange={(e) =>
            setFormState({
              ...formState,
              email: e.target.value
            })
          }
          type="text"
          placeholder="Your email address"
        />
        {!formState.login && (
          <>
          <div className="form-item">
              <label>Picture*</label>
              <div style={{ backgroundImage: `url(${formState.pictureUrl})` }} className="picture-container"></div>
          </div>
          <div className="photo-input-item">
          <input 
              onChange={addPhoto} 
              id="profile-photo" 
              className="photo-input" 
              type="file"
          />
          </div>
          </>
        )}
        <input
          value={formState.password}
          onChange={(e) =>
            setFormState({
              ...formState,
              password: e.target.value
            })
          }
          type="password"
          placeholder="Choose a safe password"
        />
      </div>
      <div className="flex mt3">
        <button
          className="pointer mr2 button"
          onClick={formState.login ? login : signup}
        >
          {formState.login ? 'login' : 'create account'}
        </button>
        <button
          className="pointer button"
          onClick={(e) =>
            setFormState({
              ...formState,
              login: !formState.login
            })
          }
        >
          {formState.login
            ? 'need to create an account?'
            : 'already have an account?'}
        </button>
      </div>
    </div>
  );
};

export default Login;