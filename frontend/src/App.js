// import './App.css';
// import './styles/app.css';

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateStore from "./Pages/CreateStore";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ShowInventory from "./Pages/ShowInventory";
import ViewStore from "./Pages/ViewStore";
import Axios from "./utils/axiosInstance";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Footer from "./Components/Footer";
import Cart from "./Pages/Cart";

import { constants } from "../src/utils/constants";

export class App extends Component {
    state = { authenticated: false, email: "", role: "", store: "", cart: [] };

    getUserData = async () => {
        try {
            let resp = await Axios.get("/user");
            console.log(resp.data);
            this.setState({
                authenticated: true,
                email: resp.data.email,
                role: resp.data.role,
                store: resp.data.store,
                cart: resp.data.cart,
            });
        } catch (err) {
            this.setState({ authenticated: false });
            console.log(err.response);
        }
    };

    loginSuccessHandler = async (email, role, store, cart, callback) => {
        this.setState(
            {
                email: email,
                role: role,
                store: store,
                authenticated: true,
                cart: cart,
            },
            () => {
                console.log("here?!");

                callback(this.state.store);
            }
        );
        // await this.getUserData();
    };

    logoutHandler = async (callback) => {
        console.log("ehhel");
        this.setState({ authenticated: false, email: "", role: "", store: "" });
        // this.props.history.push('/login');
        callback();
    };

    componentDidMount = async () => {
        await this.getUserData();
    };

    onAdminLoginHandler = async (callback) => {
        try {
            console.log("ehllow world");
            const { email, password } = this.state;
            let resp = await Axios.post("/login", {
                email,
                password,
                role: constants.ADMIN, //TODO: have to refactor. get the role from the parent
            });
            let mail = resp.data.user.email;
            let role = resp.data.user.role;
            let store = resp.data.store;
            console.log(resp);

            callback(this.loginSuccessHandler, mail, role, store);
        } catch (err) {
            console.log(err);
            console.log(err.response);
            this.setState({ errors: err.response.data.errors[0].message });
        }
    };

    onCustomerLoginHandler = async () => {
        // customer login page
        try {
            const { email, password } = this.state;
            let resp = await Axios.post(
                "/login",
                { email, password },
                { params: { store: this.props.match.params.storeid } }
            );
        } catch (err) {
            console.log(err.response);
            this.setState({ errors: err.response.data.errors[0].message });
        }
    };

    onCustomerRegisterHandler = async () => {
        try {
            const { email, password } = this.state;
            const resp = await Axios.post(
                "/register",
                { email, password, role: constants.CUSTOMER },
                { params: { store: this.props.match.params.storeid } }
            );
        } catch (err) {
            console.log(err.response);
            this.setState({ errors: err.response.data.errors[0].message });
        }
    };

    onAdminRegisterHandler = async () => {
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

            this.setState({ errors: null }, () => {
                this.props.loginSuccessHandler(mail, role, store, () => {
                    // REDIRECT HERE
                    console.log("im here now");
                    this.props.history.push("/createstore");
                });
            });
        } catch (err) {
            console.log(err.response);
            this.setState({ errors: err.response.data.errors[0].message });
        }
    };

    updateCartHandler = ({ cart }) => {
        this.setState({ cart: cart });
    };

    render() {
        return (
            <div>
                <Router>
                    <Header
                        count={this.state.cart.length}
                        role={this.state.role}
                        store={this.state.store}
                        authenticated={this.state.authenticated}
                        logoutHandler={this.logoutHandler}
                    />

                    <Switch>
                        <Route
                            path="/login"
                            component={(props) => (
                                <Login
                                    {...props}
                                    isAdminRoute={true}
                                    store={this.state.store}
                                    loginSuccessHandler={
                                        this.loginSuccessHandler
                                    }
                                />
                            )}
                        />
                        <Route
                            path="/register"
                            component={(props) => (
                                <Register
                                    {...props}
                                    isAdminRoute={true}
                                    loginSuccessHandler={
                                        this.loginSuccessHandler
                                    }
                                />
                            )}
                        />

                        <Route
                            path="/createstore"
                            component={(props) => (
                                <CreateStore
                                    {...props}
                                    authenticated={this.state.authenticated}
                                    store={this.state.store}
                                />
                            )}
                        />

                        <Route
                            path="/admin/:storeid/inventory"
                            component={(props) => (
                                <ShowInventory
                                    {...props}
                                    authenticated={this.state.authenticated}
                                    store={this.state.store}
                                />
                            )}
                        />
                        <Route
                            path="/admin/:storeid/dashboard"
                            component={(props) => (
                                <Dashboard
                                    {...props}
                                    authenticated={this.state.authenticated}
                                    store={this.state.store}
                                />
                            )}
                        />

                        <Route
                            path="/cart"
                            component={(props) => (
                                <Cart
                                    {...props}
                                    storeid={this.state.store}
                                    cart={this.state.cart}
                                    updateCartHandler={this.updateCartHandler}
                                />
                            )}
                        />

                        <Route
                            path="/admin/:storeid/"
                            component={(props) => (
                                <ViewStore
                                    updateCartHandler={this.updateCartHandler}
                                    isForCustomer={false}
                                    authenticated={this.state.authenticated}
                                    {...props}
                                    store={this.state.store}
                                />
                            )}
                        />
                        <Route
                            path="/:storeid/login"
                            component={(props) => (
                                <Login
                                    {...props}
                                    isAdminRoute={false}
                                    store={this.state.store}
                                    loginSuccessHandler={
                                        this.loginSuccessHandler
                                    }
                                />
                            )}
                        />

                        <Route
                            path="/:storeid/register"
                            component={(props) => (
                                <Register
                                    {...props}
                                    isAdminRoute={false}
                                    loginSuccessHandler={
                                        this.loginSuccessHandler
                                    }
                                />
                            )}
                        />

                        <Route
                            path="/:storeid/"
                            component={(props) => (
                                <ViewStore
                                    isForCustomer={true}
                                    {...props}
                                    updateCartHandler={this.updateCartHandler}
                                    authenticated={this.state.authenticated}
                                    store={this.state.store}
                                />
                            )}
                        />

                        <Route
                            path="/"
                            component={(props) => (
                                <Home
                                    {...props}
                                    store={this.state.store}
                                    loginSuccessHandler={
                                        this.loginSuccessHandler
                                    }
                                />
                            )}
                        />
                    </Switch>
                    <Footer />
                </Router>
            </div>
        );
    }
}

export default App;
