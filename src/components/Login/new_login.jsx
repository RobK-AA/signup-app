import React from "react";
import { Mutation } from "react-apollo";
import { LOGIN } from '../../util/session_util';
import { SIGNUP } from '../../util/session_util';

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: false,
            email: "",
            password: "",
            name: "", 
            username: "",
            picture: "https://img.icons8.com/ios-glyphs/100/000000/test-account.png",
            pictureUrl: "https://img.icons8.com/ios-glyphs/100/000000/test-account.png",
            error: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addPhoto = this.addPhoto.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault();
        const user = new FormData();
        user.append("user[username]", this.state.username);
        user.append("user[email]", this.state.email);
        user.append("user[name]", this.state.name);
        user.append("user[password]", this.state.password);
        user.append("user[picture]", this.state.picture);
        // this.props.createUser(user).then(
        //     () => {
        //         return this.props.history.push(`/confirmation`, this.state)
        //     }
        // );
    }

    addPhoto(e) {
        e.preventDefault();
        const profilePhoto = new FileReader();
        const photo = e.target.files[0];
        
        profilePhoto.onloadend = () => {
            let newPhotoUrl = profilePhoto.result;
            let newPhoto = photo;

            this.setState({ 
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
    renderErrors() {
        if (this.state.error.length > 0) {
            const message = this.state.error[0];
            return (
                <div>
                    <p>
                      {message === "Response not successful" ? 
                      'Did you fill out all required fields?' : 
                      message}
                    </p>
                </div>
            );
        }   
    }

    handleErrors(err) {
        const formType = this.state.login ? "login" : "signup";
        const emailExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const isValidEmail =  emailExpression.test(String(this.state.email).toLowerCase());
        if (formType === "login") {
            if (this.state.email === null || this.state.email.length === 0 || this.state.password === null || this.state.password.length === 0) {
                this.setState({ error: ["Please enter your email & password"]})
            } else {
                this.setState({ error: ["Incorrect username/password combo"]})
            }
        } else if (formType === "signup") {
            if (this.state.email === null || this.state.email.length === 0 || 
                this.state.password === null || this.state.password.length === 0 ||
                this.state.name === null || this.state.name.length === 0 || 
                this.state.username === null || this.state.username.length === 0) {
                    this.setState({ error: ["Please fill out all required fields"]})
                } else if (this.state.password && this.state.name && this.state.email && this.state.username && this.state.password.length < 6) {
                    this.setState({ error: ["Password must be at least 6 characters"]})
                } else if (!isValidEmail) {
                    this.setState({ error: ["Please enter a valid email"]})
                } else {
                    this.setState({ error: [err.message]})
                }
        }
    }

    update(field) {
      return e => {
          if (this.state.error.length > 0) this.setState({ error: [] });
          this.setState({
              [field]: e.currentTarget.value
          });
      };
    }

    render() {
        // return (
            // <div className="form-container">
            //     <h4 className="mv3">{this.state.login ? 'Login' : 'Sign Up'}</h4>
            //     <h4>* = required field</h4>
            //     // <div className="flex flex-column flex-outer">
            //     // <div className="flex flex-column">
            //     //     {!this.state.login && (
                //     <>
                //     <label>Username*</label>
                //     <input
                //         onChange={this.update('username')}
                //         type="text"
                //         placeholder="Your username"
                //     />
                //     </>
                //     )}
                //     {!this.state.login && (
                //     <>
                //     <label>Name*</label>
                //     <input
                //         onChange={this.update('name')}
                //         type="text"
                //         placeholder="Your name"
                //     />
                //     </>
                //     )}
                //     <label>Email Address*</label>
                //     <input
                //         onChange={this.update('email')}
                //         type="text"
                //         placeholder="Your email address"
                //     />
                //     {!this.state.login && (
                //     <>
                //     <div className="form-item">
                //         <label>Picture*</label>
                //     <div style={{ backgroundImage: `url(${this.state.pictureUrl})` }} className="picture-container"></div>
                //     </div>
                //     <div className="photo-input-item">
                //     <input 
                //         onChange={this.addPhoto} 
                //         id="profile-photo" 
                //         className="photo-input" 
                //         type="file"
                //         title=" "
                //     />
                //     </div>
                //     </>
                //     )}
                //     <label>Password*</label>
                //     <input
                //         onChange={this.update('password')}
                //         type="password"
                //         placeholder={this.state.login ? 
                //             "Enter your password" : "Choose a safe password"}
                //     />
                // </div>
                // {this.renderErrors()}
                // <div className="flex mt3">
                //     <button
                //         className="pointer mr2 button"
                //         onClick={this.handleSubmit}
                //     >
                //     {this.state.login ? 'Log In' : 'Sign Up'}
                //     </button>
                //     <button
                //         className="pointer button"
                //         onClick={(e) =>
                //             this.setState({
                //             login: !this.state.login,
                //             error: [],
                //             email: null,
                //             password: null,
                //             name: null,
                //             username: null
                //         })}
                //     >
                //     {this.state.login
                //     ? 'Need to sign up?'
                //     : 'Already have an account?'}
                //     </button>
        //             </div>
        //         </div>
        //     </div>
        // );
        return (
        <Mutation
            mutation={this.state.login ? LOGIN : SIGNUP}
            onError={err => {
                    this.handleErrors(err);
                    console.log(err);
                }
            }
            onCompleted={data => {
            console.log(data)
            const { token } = data.login || data.signUp;
            localStorage.setItem('email', this.state.email);
            localStorage.setItem("auth-token", token);
            this.props.history.push("/confirmation");
            }}
        >
            {loginUser => (

            <div className="form-container">
                <h4 className="mv3">{this.state.login ? 'Log In' : 'Sign Up'}</h4>
                <h4>* = required field</h4>
                <form
                onSubmit={e => {
                    e.preventDefault();
                    loginUser({
                    variables: {
                        email: this.state.email,
                        password: this.state.password,
                        username: this.state.username,
                        name: this.state.name,
                        picture: this.state.picture
                    }
                    });
                }}
                >
                <div className="flex flex-column flex-outer">
                <div className="flex flex-column">
                    {!this.state.login && (
                    <>
                    <label>Username*</label>
                    <input
                        onChange={this.update('username')}
                        type="text"
                        placeholder="Your username"
                    />
                    </>
                    )}
                    {!this.state.login && (
                    <>
                    <label>Name*</label>
                    <input
                        onChange={this.update('name')}
                        type="text"
                        placeholder="Your name"
                    />
                    </>
                    )}
                    <label>Email Address*</label>
                    <input
                        onChange={this.update('email')}
                        type="text"
                        placeholder="Your email address"
                        value={this.state.email}
                    />
                    {!this.state.login && (
                    <>
                    <div className="form-item">
                        <label>Picture*</label>
                    <div style={{ backgroundImage: `url(${this.state.pictureUrl})` }} className="picture-container"></div>
                    </div>
                    <div className="photo-input-item">
                    <input 
                        onChange={this.addPhoto} 
                        id="profile-photo" 
                        className="photo-input" 
                        type="file"
                    />
                    </div>
                    </>
                    )}
                    <label>Password*</label>
                    <input
                        onChange={this.update('password')}
                        type="password"
                        placeholder={this.state.login ? 
                            "Enter your password" : "Choose a safe password"}
                        value={this.state.password}
                    />
                </div>
                {this.renderErrors()}
                <div className="flex mt3">
                    <button
                        className="pointer mr2 button"
                        type="submit"
                        // onClick={this.handleSubmit}
                    >
                    {this.state.login ? 'Log In' : 'Sign Up'}
                    </button>
                    
                </div>
                </div>
                </form>
                <button
                        className="pointer button"
                        onClick={(e) => this.setState({
                            login: !this.state.login,
                            error: [],
                            email: "",
                            password: "",
                            name: "",
                            username: ""
                        })
                    }
                    >
                    {this.state.login
                    ? 'Need to sign up?'
                    : 'Already have an account?'}
                    </button>
            </div>
            )}
        </Mutation>
        );
    }
}

export default Signup;