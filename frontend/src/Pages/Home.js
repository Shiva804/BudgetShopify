import React, { Component } from "react";
import "../styles/Home.css";

export class Home extends Component {
    render() {
        return (
            <div className="main">
                <div className="section1">
                    <div className="quote">
                        "Budget Shopify is better than any other platform we’ve
                        played with, and we’ve played with them all."
                    </div>
                </div>

                <div className="section2">
                    <img
                        src="https://www.tompkinsinc.com/Portals/0/EasyDNNnews/1048/blog_10-29-19.jpg"
                        id="image"
                    />
                    <div className="content">
                        <h3>Sell everywhere </h3>
                        <br />
                        Use one platform to sell products to anyone, anywhere—in
                        person with Point of Sale and online through your
                        website, social media, and online marketplaces.
                    </div>
                </div>
                <div className="section3">
                    <div className="content">
                        <h3>Market your business</h3>
                        <br />
                        Take the guesswork out of marketing with built-in tools
                        that help you create, execute, and analyze digital
                        marketing campaigns.
                    </div>
                    <img
                        src="https://mk0buildfireqbf86ll2.kinstacdn.com/wp-content/uploads/2017/04/promote-your-business.jpg"
                        id="image"
                    />
                </div>

                <div className="section4">
                    <img
                        src="https://miro.medium.com/max/3840/1*bLeGflJgjzhZRhA628WliQ.png"
                        id="image"
                    />
                    <div className="content">
                        <h3>Manage everything </h3>
                        <br />
                        Gain the insights you need to grow—use a single
                        dashboard to manage orders, shipping, and payments
                        anywhere you go.
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
