// import React, { Component } from 'react';
// import Axios from '../utils/axiosInstance';
// import { constants } from '../utils/constants';

// export class Register extends Component {
// 	state = { email: '', password: '', errors: null };

// 	onChangeHandler = (event) => {
// 		let value = event.target.value;
// 		this.setState({ [event.target.name]: value });
// 	};

// 	onSubmitHandler = async () => {
// 		try {
// 			const { email, password } = this.state;
// 			let resp = await Axios.post('/register', {
// 				email,
// 				password,
// 				role: constants.ADMIN, //TODO: have to refactor. get the role from the parent
// 			});
// 			let mail = resp.data.user.email;
// 			let role = resp.data.user.role;
// 			let store = resp.data.store;

// 			this.setState({ errors: null }, () => {
// 				this.props.loginSuccessHandler(mail, role, store, () => {
// 					// REDIRECT HERE
// 					console.log('im here now');
// 					this.props.history.push('/createstore');
// 				});
// 			});
// 		} catch (err) {
// 			console.log(err.response);
// 			this.setState({ errors: err.response.data.errors[0].message });
// 		}
// 	};

// 	render() {
// 		return (
// 			<div>
// 				<h1>Welcome from the register page</h1>
// 				<div>
// 					<input
// 						onChange={this.onChangeHandler}
// 						value={this.state.email}
// 						name='email'
// 						type='email'
// 						placeholder='Email'
// 					/>

// 					<input
// 						onChange={this.onChangeHandler}
// 						value={this.state.password}
// 						name='password'
// 						type='password'
// 						placeholder='Password'
// 					/>

// 					<button onClick={this.onSubmitHandler}>SUBMIT</button>

// 					{this.state.errors && <p>{this.state.errors}</p>}
// 				</div>
// 			</div>
// 		);
// 	}
// }

// export default Register;

// ----------------------------------------

import React, { Component } from "react";
import Axios from "../utils/axiosInstance";
import { constants } from "../utils/constants";
import { Link } from "react-router-dom";
import "../styles/Register.css";

export class Register extends Component {
    state = { email: "", password: "", errors: null };

    onChangeHandler = (event) => {
        let value = event.target.value;
        this.setState({ [event.target.name]: value });
    };

    onCloseError = async () => {
        this.setState({ errors: null });
    };

    onSubmitHandler = async () => {
        if (this.props.isAdminRoute) {
            try {
                const { email, password } = this.state;
                let resp = await Axios.post("/register", {
                    email,
                    password,
                    role: constants.ADMIN, //TODO: have to refactor. get the role from the parent
                });
                let mail = resp.data.user.email;
                let role = resp.data.user.role;
                let store = resp.data.store;
                let cart = resp.data.user.cart;
                console.log(resp);
                this.setState({ errors: null }, () => {
                    this.props.loginSuccessHandler(
                        mail,
                        role,
                        store,
                        cart,
                        () => {
                            // REDIRECT HERE
                            console.log("im here now");
                            this.props.history.push("/createstore");
                        }
                    );
                });
            } catch (err) {
                console.log(err.response);
                this.setState({ errors: err.response.data.errors[0].message });
            }
        } else {
            //  customer registration
            try {
                const { email, password } = this.state;
                const resp = await Axios.post(
                    "/register",
                    { email, password, role: constants.CUSTOMER },
                    { params: { store: this.props.match.params.storeid } }
                );
                let mail = resp.data.user.email;
                let role = resp.data.user.role;
                let store = resp.data.user.store;
                let cart = resp.data.user.cart;

                this.setState({ errors: null }, () => {
                    this.props.loginSuccessHandler(
                        mail,
                        role,
                        store,
                        cart,
                        (s) => {
                            // REDIRECT HERE
                            console.log("im here now");
                            this.props.history.push(`/${s}`);
                        }
                    );
                });
            } catch (err) {
                console.log(err.response);
                this.setState({ errors: err.response.data.errors[0].message });
            }
        }
    };

    render() {
        return (
            <div id="register-main">
                <div id="registerbox">
                    <h1 id="wel">Register</h1>
                    <div className="register-area">
                        <input
                            id="email"
                            onChange={this.onChangeHandler}
                            value={this.state.email}
                            name="email"
                            type="email"
                            placeholder="Email"
                        />
                        <br></br>

                        <input
                            id="password"
                            onChange={this.onChangeHandler}
                            value={this.state.password}
                            name="password"
                            type="password"
                            placeholder="Password"
                        />
                        <br></br>
                        <button id="submit" onClick={this.onSubmitHandler}>
                            REGISTER
                        </button>
                        <h3 id="last">
                            Already have an account?
                            <Link
                                to={
                                    this.props.isAdminRoute
                                        ? `/login`
                                        : `/${this.props.match.params.storeid}/login`
                                }
                                id="c"
                            >
                                <div>Login !</div>
                            </Link>
                        </h3>

                        {this.state.errors && (
                            <div class="callout">
                                <div class="callout-header">
                                    {this.state.errors}
                                </div>
                                <span
                                    class="closebtn"
                                    onClick={this.onCloseError}
                                >
                                    ×
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;
