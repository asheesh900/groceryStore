import React, { Component } from 'react'
import axios from 'axios'

export default class Delete extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             item: "",
             quantity: "",
             purchased: "false",
             item_no: ""
        }
    }

    deleteItem = () => {
        axios
            .post(`http://localhost:5000${this.props.match.url}`, {
                item_no: this.props.match.params.id
            })
            .then(res => {
                alert("Are you sure? You want to delete this item.", this.props.history.push("/"))
                console.log(res);
            })
            .catch(err => {
                console.log(err)
            })
            
    }

    handleRedirect = () => {
        this.props.history.push("/");
    }

    componentDidMount() {
        let product = new URLSearchParams(`${this.props.location.search}`)
        // console.log(product.get("item"))
        this.setState({
            item: product.get("item"),
            quantity: product.get("quantity")
        })
    }
    
    render() {
        // console.log(this.props, "delete")
        return (
            <div className="container-fluid mt-4 text-white">
                <div className="container m-auto bg-secondary text-center">
                    <h1>Item Info</h1>
                    <h2>Item Name: {this.state.item} </h2>
                    <h2>Quantity: {this.state.quantity} </h2>
                    <button onClick = {this.deleteItem} className="mb-2 p-2 btn-danger">Delete</button>
                    <button onClick = {this.handleRedirect} className="btn btn-primary ml-2">Go Back</button>
                </div>
            </div>
        )
    }
}
