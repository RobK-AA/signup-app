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
            signUp(
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
    login: false,
    email: null,
    password: null,
    name: null, 
    username: null,
    picture: "https://img.icons8.com/ios-glyphs/100/000000/test-account.png",
    pictureUrl: "https://img.icons8.com/ios-glyphs/100/000000/test-account.png",
    error: []
  });

  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: formState.email,
      password: formState.password
    },
    onCompleted: (data) => {
      const { token } = data.login;
      if (token) {
        localStorage.setItem(AUTH_TOKEN, token);
        localStorage.setItem('email', formState.email);
        history.push('/confirmation');
      }
    }
  })

  const [signup] = useMutation(SIGNUP_MUTATION, {
    variables: {
      name: formState.name,
      email: formState.email,
      password: formState.password,
      username: formState.username,
      picture: formState.picture
    },
    onCompleted: (data) => {
      const { token } = data.signUp;
      if (token) {
        localStorage.setItem(AUTH_TOKEN, token);
        localStorage.setItem('email', formState.email);
        history.push('/confirmation');
      }
    }
  });

  const handleSubmit = async () => {
    const submitType = formState.login ? login : signup;
    try {
      const { data } = await submitType()
      setFormState(data) 
    } catch (e) {
      setFormState({
          ...formState,
          error: [e]
      })
      renderErrors();
    }
  }

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
            picture: newPhoto 
        });
    }
        if (photo) {
            profilePhoto.readAsDataURL(photo);
        } else {
            alert("Please choose another file type")
        }
  }
  function update(field) {
        return e => {
            if (formState.error.length > 1) setFormState({ error: [] });
            setFormState({
                ...formState,
                [field]: e.currentTarget.value
            });
        };
    }

  function renderErrors() {

    
    if (formState.error.length > 0) {
      const message = formState.error[0].message.split(": ")[1];
      return (
                <div>
                    {message}
                    <p>
                      {message === "Response not successful" ? 
                      'Did you fill out all required fields?' : 
                      null}
                    </p>
                    
                </div>
        );
    }
        
  }
  return (
    <div>
      <h4 className="mv3">{formState.login ? 'Login' : 'Sign Up'}</h4>
      <div className="flex flex-column">
        {!formState.login && (
          <>
          <label>Username*</label>
          <input
            onChange={update('username')}
            type="text"
            placeholder="Your username"
          />
          </>
        )}
        {!formState.login && (
          <>
          <label>Name*</label>
          <input
            onChange={update('name')}
            type="text"
            placeholder="Your name"
          />
          </>
        )}
        <label>Email Address*</label>
        <input
          onChange={update('email')}
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
        <label>Password*</label>
        <input
          onChange={update('password')}
          type="password"
          placeholder="Choose a safe password"
        />
      </div>
      {renderErrors()}
      <div className="flex mt3">
        <button
          className="pointer mr2 button"
          onClick={handleSubmit}
        >
          {formState.login ? 'login' : 'create account'}
        </button>
        <button
          className="pointer button"
          onClick={(e) =>
            setFormState({
              ...formState,
              login: !formState.login,
              error: [],
              email: null,
              password: null,
              name: null,
              username: null
            })
          }
        >
          {formState.login
            ? 'need to create an account?'
            : 'already have an account?'}
        </button>
      </div>
      <p>{formState.username}</p>
      <p>{formState.name}</p>
      <p>{formState.email}</p>
      <p>{formState.picture}</p>
      <p>{formState.password}</p>

    </div>
  );
};

export default Login;
