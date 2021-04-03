import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";

export class Dashboard extends Component {
    // componentDidMount = () => {
    // 	if (!this.props.authenticated) {
    // 		console.log(this.props.authenticated);
    // 		console.log('not auth?');
    // 		this.props.history.push('/');
    // 	}
    // };

    render() {
        if (!this.props.authenticated) {
            this.props.history.push("/");
            return null;
        }

        return (
            <div>
                <h1>HELLO FROM DASHBOARD</h1>
                <h1>list of customers</h1>
                <h1> show visit count </h1>
                <h1> view items/inventory </h1>

                <Link
                    to={`/admin/${this.props.match.params.storeid}/inventory`}
                >
                    <button>VIEW INVENTORY</button>
                </Link>
            </div>
        );
    }
}

export default Dashboard;
