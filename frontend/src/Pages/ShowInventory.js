import React, { Component } from "react";
import Axios from "../utils/axiosInstance";
import "../styles/ShowInventory.css";

export class ShowInventory extends Component {
    state = {
        items: [],
        name: "",
        price: "",
        category: "",
        quantityAvailable: "",
        image: "",
    };

    componentDidMount = async () => {
        // "/:store/items"
        try {
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

    onChangeHandler = (event) => {
        let value = event.target.value;
        this.setState({ [event.target.name]: value });
    };

    onAddInventoryClickHandler = async () => {
        // add inventory
        try {
            let {
                name,
                price,
                quantityAvailable,
                image,
                category,
            } = this.state;
            const req = await Axios.post(`/item`, {
                name,
                price,
                quantityAvailable,
                image,
                category,
            });

            console.log(req);

            this.setState({
                items: req.data.store.inventory,
                name: "",
                price: "",
                quantityAvailable: "",
                image: "",
            });
        } catch (err) {
            console.log(err.response);
            this.setState({ errors: err.response.data.errors[0].message });
        }
    };

    onRemoveItemHandler = async (itemId) => {
        // remove the selected item
        try {
            const resp = await Axios.delete(`/item/${itemId}`);

            console.log(resp.data);

            // update state
            this.setState({ items: resp.data.inventory });
        } catch (e) {
            console.log(e);
        }
    };
    render() {
        // if (!this.props.authenticated) {
        //     this.props.history.push("/");
        //     return null;
        // }
        return (
            <div className="inventory">
                <div id="fh">
                    <h1>Manage your Inventory</h1>

                    <div className="add">
                        <h3>Add Products</h3>
                        <div>
                            <label for="name">Name:</label>

                            <input
                                class="si"
                                onChange={this.onChangeHandler}
                                value={this.state.name}
                                name="name"
                                placeholder="Name"
                            />
                            <label for="price" id="price">
                                Price:
                            </label>

                            <input
                                class="si"
                                onChange={this.onChangeHandler}
                                value={this.state.price}
                                name="price"
                                placeholder="Price"
                            />
                        </div>

                        <div>
                            <label for="quantityAvailable">
                                Quantity Available:
                            </label>

                            <input
                                class="si"
                                onChange={this.onChangeHandler}
                                value={this.state.quantityAvailable}
                                name="quantityAvailable"
                                placeholder="Quantity Available"
                            />
                            <label for="category">Category:</label>
                            <input
                                class="si"
                                onChange={this.onChangeHandler}
                                value={this.state.category}
                                name="category"
                                placeholder="Category"
                            />
                        </div>
                        <label for="image">Image URL:</label>
                        <input
                            class="si"
                            onChange={this.onChangeHandler}
                            value={this.state.image}
                            name="image"
                            placeholder="Image"
                        />
                        <br></br>

                        <button
                            id="sb1"
                            onClick={this.onAddInventoryClickHandler}
                        >
                            Add to inventory
                        </button>
                    </div>
                </div>
                <hr></hr>
                <div id="sh">
                    <h3 id="sum">Inventory Items</h3>
                    {this.state.items && (
                        <div className="products-side">
                            {this.state.items.map((item) => {
                                console.log(item);
                                if (item.image === "") {
                                    item.image =
                                        "https://semantic-ui.com/images/wireframe/image.png";
                                }
                                return (
                                    <div
                                        class="products"
                                        key={item._id}
                                        id={item.name}
                                    >
                                        <img
                                            style={{ width: "250px" }}
                                            src={item.image}
                                            alt="iqjdw"
                                        />
                                        <div className="cont">
                                            Name: {item.name} <br />
                                            <hr />
                                            Category: {item.category}
                                            <br />
                                            <hr />
                                            Price: {item.price}
                                            <hr />
                                            <br />
                                            Quantity: {item.quantityAvailable}
                                            <br />
                                            <hr />
                                        </div>
                                        <div
                                            onClick={() =>
                                                this.onRemoveItemHandler(
                                                    item._id
                                                )
                                            }
                                        >
                                            <h2 id="x"> X </h2>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default ShowInventory;
