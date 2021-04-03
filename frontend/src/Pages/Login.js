import React, { Component } from "react";
import Axios from "../utils/axiosInstance";
import { constants } from "../utils/constants";
import "../styles/Login.css";
import { Link } from "react-router-dom";

export class Login extends Component {
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
                let resp = await Axios.post("/login", {
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
                    console.log("running?");
                    this.props.loginSuccessHandler(
                        mail,
                        role,
                        store,
                        cart,
                        (s) => {
                            this.props.history.push(`/`);
                        }
                    );
                });
            } catch (err) {
                console.log(err);
                console.log(err.response);
                this.setState({ errors: err.response.data.errors[0].message });
            }
        } else {
            // customer login
            try {
                const { email, password } = this.state;
                let resp = await Axios.post(
                    "/login",
                    { email, password },
                    { params: { store: this.props.match.params.storeid } }
                );
                let mail = resp.data.user.email;
                let role = resp.data.user.role;
                let store = resp.data.user.store;
                let cart = resp.data.user.cart;
                console.log(resp);
                this.setState({ errors: null }, () => {
                    console.log("running?");
                    this.props.loginSuccessHandler(
                        mail,
                        role,
                        store,
                        cart,
                        (s) => {
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
            <div id="login-main">
                <div id="loginbox">
                    <h1 id="wel">Login</h1>
                    <div className="login-area">
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
                        {/* <button id="submit" onClick={this.onSubmitHandler}> */}
                        <button
                            id="submit"
                            // onClick={() =>
                            //     this.props.onSubmitHandler(this.onSubmitHandler)
                            // }
                            onClick={this.onSubmitHandler}
                        >
                            LOGIN
                        </button>
                        <h3 id="last">
                            Don't have an account? <br />
                            <Link
                                to={`/${this.props.match.params.storeid}/register`}
                                id="c"
                            >
                                Register !
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

export default Login;
