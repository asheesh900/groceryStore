import React, { Component } from 'react'
import axios from 'axios'

export default class Mark extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             item: "",
             quantity: "",
             purchased: "false"
        }
    }

    markItem = () => {
        axios
            .post(`http://localhost:5000/purchased`, {
                item_no: this.props.match.params.id
            })
            .then(res => {
                alert("Do you want to mark this item as purchased!", )
            })
    }

    handleRedirect = () => {
        this.props.history.push("/")
    }

    componentDidMount() {
        const product = new URLSearchParams(`${this.props.location.search}`)
        console.log(product.get("item"))
        this.setState({
            item: product.get("item"),
            quantity: product.get("quantity")
        })
    }
    
    render() {
        console.log(this.props)
        return (
            <div className = "container-fluid text-center text-white ">
                <div className="container bg-secondary mt-4">
                    <h1>Mark Item</h1>
                    <h2>Item Name: {this.state.item} </h2>
                    <h2>Quantity: {this.state.quantity} </h2>
                    <button onClick = {this.markItem} className = "btn-warning p-2 mb-2" >Mark As Purchased</button>
                    <button onClick = {this.handleRedirect} className = "btn-primary ml-2 p-2 mb-2">Go Back</button>
                </div>
                
            </div>
        )
    }
}
