import React, { Component } from "react";
import "../styles/Cart.css";
import Axios from "../utils/axiosInstance";

export default class Cart extends Component {
    state = { cart: [] };

    componentDidMount = () => {
        const x = {};
        this.props.cart.forEach((item) => {
            if (!Object.keys(x).includes(item._id)) {
                x[item._id] = { ...item, quantityRequired: 1 };
            } else {
                const y = x[item._id].quantityRequired;
                x[item._id] = { ...item, quantityRequired: y + 1 };
            }
        });

        this.setState({ cart: Object.values(x) });
    };

    removeFromCartHandler = async (itemId) => {
        try {
            // const resp = await Axios.delete(
            //     `/${this.props.match.params.storeid}/cart/${itemId}`
            // );
            const resp = await Axios.delete(
                `/${this.props.storeid}/cart/${itemId}`
            );
            console.log(resp);
            // this.setState({})
            this.props.updateCartHandler({ cart: resp.data.cart });
        } catch (err) {
            console.log(err.response);
            this.setState({ errors: err.response.data.errors[0].message });
        }
    };

    render() {
        return (
            <div className="carts">
                {this.state.cart.length > 0 ? (
                    <div className="cart">
                        <h2>My Cart</h2>
                        <div className="cart-side">
                            {this.state.cart.map((item) => {
                                console.log(item);
                                return (
                                    <div className="cart-item" key={item.name}>
                                        <div id="c-imgss">
                                            <img
                                                style={{ width: "250px" }}
                                                src={item.image}
                                                alt="iqjdw"
                                                id="c-img"
                                            />
                                        </div>
                                        <div id="cons">
                                            <h2>{item.name}</h2>
                                            <div id="pr">
                                                Price: &nbsp;
                                                <div id="pri">
                                                    {item.quantityRequired *
                                                        item.price}
                                                    $
                                                </div>
                                            </div>
                                            <br></br>
                                            <div id="quan">
                                                Quantity: &nbsp;
                                                <div id="quant">
                                                    {item.quantityRequired}
                                                </div>
                                            </div>
                                        </div>
                                        <div id="rfc-div">
                                            <button
                                                id="rfc"
                                                onClick={() => {
                                                    this.removeFromCartHandler(
                                                        item._id
                                                    );
                                                }}
                                            >
                                                Remove from cart
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <button id="po">Place Order!</button>
                    </div>
                ) : (
                    <div id="no">No items in your cart yet... !</div>
                )}
            </div>
        );
    }
}
