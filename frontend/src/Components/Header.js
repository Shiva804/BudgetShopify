import React, { Component } from "react";
import Axios from "../utils/axiosInstance";
import "../styles/Header.css";
import { Link, withRouter } from "react-router-dom";
import cart from "../images/shopping-cart.svg";

export class Header extends Component {
    logoutHandler = async () => {
        const resp = await Axios.post("/logout");
        console.log(resp);
        this.props.logoutHandler(() => {
            this.props.history.push("/");
        });
    };

    render() {
        return (
            <div class="header">
                <div className="logo">
                    <Link to="/" id="appname">
                        Budget Shopify
                    </Link>

                    <img alt="No Image" className="pic" src={cart} />
                </div>

                {this.props.authenticated ? (
                    <span id="logs">
                        {this.props.role === "ADMIN" ? (
                            <span id="vs-vi">
                                <Link to={`/admin/${this.props.store}`} id="vs">
                                    <img
                                        src="https://image.flaticon.com/icons/png/128/3608/3608947.png"
                                        id="ic"
                                    />
                                    View Your Store
                                </Link>
                                <Link
                                    to={`/admin/${this.props.store}/inventory`}
                                    id="vi"
                                >
                                    <img
                                        src="https://image.flaticon.com/icons/png/128/1291/1291718.png"
                                        id="ic"
                                    />
                                    View Inventory
                                </Link>
                            </span>
                        ) : (
                            <span id="cart-dot">
                                <Link to="/cart">
                                    <img
                                        src="https://image.flaticon.com/icons/png/128/13/13520.png"
                                        id="cart"
                                    />
                                </Link>

                                <span id="circle">{this.props.count}</span>
                            </span>
                        )}

                        <button onClick={this.logoutHandler} id="logout">
                            Logout
                        </button>
                    </span>
                ) : (
                    <button
                        className="login-btn"
                        onClick={() => {
                            this.props.history.push("/login");
                        }}
                    >
                        Login
                    </button>
                )}
            </div>
        );
    }
}

export default withRouter(Header);
