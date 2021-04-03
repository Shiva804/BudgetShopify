import React, { Component } from "react";
import Axios from "../utils/axiosInstance";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "../styles/ViewStore.css";
import i1 from "../images/clark-street-mercantile-P3pI6xzovu0-unsplash.jpg";
import i2 from "../images/pexels-photo-1051747.jpeg";
import i3 from "../images/pexels-photo-2309235.jpeg";
import i4 from "../images/pexels-terje-sollie-298863.jpg";
import i5 from "../images/clark-street-mercantile-qnKhZJPKFD8-unsplash.jpg";

export class ViewStore extends Component {
    state = { items: [] };

    componentDidMount = async () => {
        try {
            console.log("Erq");
            const req = await Axios.get(
                `/${this.props.match.params.storeid}/items`
            );
            console.log(req.data);

            this.setState({ items: req.data });

            // console.log(this.props);
        } catch (err) {
            console.log(err.response);
            this.setState({ errors: err.response.data.errors[0].message });
        }
    };

    addToCartHandler = async (itemId) => {
        try {
            const resp = await Axios.post(
                `/${this.props.match.params.storeid}/cart/${itemId}`
            );
            console.log(resp);
            // this.setState({})
            this.props.updateCartHandler({ cart: resp.data.cart });
        } catch (err) {
            console.log(err);
            this.setState({ errors: err.response.data.errors[0].message });
        }
    };

    removeFromCartHandler = async (itemId) => {
        try {
            const resp = await Axios.delete(
                `/${this.props.match.params.storeid}/cart/${itemId}`
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
        // if (!this.props.authenticated) {
        //     this.props.history.push("/");
        //     return null;
        // }
        return (
            <div>
                <Carousel
                    showThumbs={false}
                    infiniteLoop={true}
                    autoPlay={true}
                    interval={1500}
                    dynamicHeight={false}
                    showStatus={false}
                    width="100%"
                    className="swipe"
                >
                    <div className="image-carousel">
                        <img src={i1} />
                    </div>
                    <div className="image-carousel">
                        <img src={i2} />
                    </div>
                    <div className="image-carousel">
                        <img src={i3} />
                    </div>
                    <div className="image-carousel">
                        <img src={i4} />
                    </div>
                    <div className="image-carousel">
                        <img src={i5} />
                    </div>
                </Carousel>

                <div className="sect2">
                    {this.state.items.map((item) => {
                        console.log(item);
                        if (item.image === "") {
                            item.image =
                                "https://semantic-ui.com/images/wireframe/image.png";
                        }
                        return (
                            <div
                                class="store-products"
                                key={item._id}
                                id={item.name}
                            >
                                <div id="imgss">
                                    <img
                                        style={{ width: "250px" }}
                                        src={item.image}
                                        alt="iqjdw"
                                        id="p-img"
                                    />
                                </div>

                                <div className="conts">
                                    <h2>{item.name} </h2> <br />
                                    <h3>
                                        Available Quantity:
                                        {item.quantityAvailable}
                                    </h3>
                                    <br />
                                </div>

                                <div id="atc">
                                    <h3>Price: {item.price}$</h3>
                                    {this.props.isForCustomer ? (
                                        <button
                                            onClick={() =>
                                                this.addToCartHandler(item._id)
                                            }
                                            id="atc-btn"
                                        >
                                            Add to cart
                                        </button>
                                    ) : null}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default ViewStore;
