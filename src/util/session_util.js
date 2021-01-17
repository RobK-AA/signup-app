import axios from 'axios';
import { gql, useMutation } from '@apollo/client';

export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const login = (userData) => {
  return axios.post('/api/users/login', userData);
};

export const LOGIN = gql`
  mutation LoginMutation(
    $email: String!
    $password: String!
  ) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const SIGNUP = gql`
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

export const USER_QUERY = gql` 
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
