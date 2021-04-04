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
                        <h3>Why Budget Shopify? </h3>
                        <br />
                        Budget Shopify is a platform for users to independently
                        manage online stores. It does not undertake the delivery
                        and selling functions.This can help to open an
                        e-commerce platform for your business.By registering an
                        account we can have ready-made shop templates, or we can
                        customize our own ideal shop. With ready-made templates,
                        you can build an independent e-commerce website in a
                        jiffy to reach all buyers in every corner of the world.
                    </div>
                </div>
                <div className="section3">
                    <div className="content">
                        <h3>Sell your business</h3>
                        <br />
                        Create a business, whether you’ve got a fresh idea or
                        are looking for a new way to make money. Turn your
                        retail store into an online store and keep serving
                        customers without missing a beat.
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
                        <h3>What does budget shopify do? </h3>
                        <br />
                        We are proposing a Platform as a service(PaaS) where
                        small companies can manage their online store without
                        any hassles. We aim to provide a platform to manage
                        inventory, analyse sales figures and provide an all in
                        one solution for all your business needs.
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
