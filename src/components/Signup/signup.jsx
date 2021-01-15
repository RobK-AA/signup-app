import React from 'react';
import { Link } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

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

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            picture: null,
            pictureUrl: "https://img.icons8.com/ios-glyphs/100/000000/test-account.png",
            errors: {}
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addPhoto = this.addPhoto.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ errors: nextProps.errors });
    }

    update(field) {
        return e => {
            if (this.props.errors) this.props.clearErrors();
            this.setState({
                [field]: e.currentTarget.value
            });
        };
    }
    
    handleSubmit(e) {
        e.preventDefault();
        const user = new FormData();
        user.append("user[name]", this.state.name);
        user.append("user[username]", this.state.username);
        user.append("user[email]", this.state.email);
        user.append("user[password]", this.state.password);
        user.append("user[picture]", this.state.picture);
    
        this.props.createUser(user).then(
            () => {
                return this.props.history.push(`/confirmation`, this.state)
            }
        );
    }

    addPhoto(e) {
        e.preventDefault();
        const profilePhoto = new FileReader();
        const photo = e.target.files[0];

        profilePhoto.onloadend = () => {
            let newPhotoUrl = this.state.pictureUrl;
            newPhotoUrl = profilePhoto.result

            let newPhoto = this.state.picture;
            newPhoto = photo;

            this.setState({ pictureUrl: newPhotoUrl, picture: newPhoto });
        }

        if (photo) {
            profilePhoto.readAsDataURL(photo);
        } else {
            alert("Please choose another file type")
        }
    }

    render() {
        return (
            <div className="form-container">
                <h1>Sign up here!</h1>
                <p className="required-field">* = required field</p>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-item">
                        <label>Username*</label>
                        <div className="input-item">
                            <input onChange={this.update('username')} type='text'></input>
                        </div>
                    </div>
                    <div className="form-item">
                        <label>Email*</label>
                        <div className="input-item">
                            <input onChange={this.update('email')} type='text'></input>
                        </div>
                    </div>
                    <div className="form-item">
                        <label>Name*</label>
                        <div className="input-item">
                            <input onChange={this.update('name')} type='text'></input>
                        </div>
                    </div>
                    <div className="form-item">
                        <label>Password*</label>
                        <div className="input-item">
                            <input onChange={this.update('password')} type='text'></input>
                        </div>
                    </div>
                    <div className="form-item">
                        <label>Confirm Password*</label>
                        <div className="input-item">
                            <input onChange={this.update('confirmPassword')} type='text'></input>
                        </div>
                    </div>
                    <div className="form-item">
                        <label>Picture*</label>
                        <div style={{ backgroundImage: `url(${this.state.pictureUrl})` }} className="picture-container"></div>
                    </div>
                    <label className="profile-photo" htmlFor="profile-photo"></label>
                        <div className="photo-input-item">
                            <input 
                                onChange={this.addPhoto} 
                                id="profile-photo" 
                                className="photo-input" 
                                type="file"
                            />
                        </div>
                    <p>Already have an account?</p>
                    <p><Link to="/login">Log in</Link></p>
                    <button type="submit">Sign Up!</button>
                </form>
                <div>
                    <p>{this.state.username}</p>
                    <p>{this.state.email}</p>
                    <p>{this.state.name}</p>
                    <p>{this.state.password}</p>
                    <p>{this.state.confirmPassword}</p>
                </div>
            </div>
        )
    }
}

export default Signup;