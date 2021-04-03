import React, { Component } from "react";
import "../styles/Footer.css";

export default class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div>
                    <h2>Copyrights@2021 Budget Shopify</h2>
                </div>

                <div>
                    <h3>Contact Us:</h3>

                    <div id="icons">
                        <img
                            src="https://image.flaticon.com/icons/png/128/1051/1051382.png"
                            className="icon"
                        />
                        <img
                            src="https://image.flaticon.com/icons/png/128/1077/1077041.png"
                            className="icon"
                        />
                        <img
                            src="https://image.flaticon.com/icons/png/128/747/747393.png"
                            className="icon"
                        />
                    </div>
                </div>
            </div>
        );
    }
}
