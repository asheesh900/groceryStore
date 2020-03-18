import React, { Component } from 'react'
import axios from 'axios'

export default class Change extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             item: "",
             quantity: "",
             purchased: "false"
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    changeItem = (e) => {
        e.preventDefault();
        axios
            .post(`http://localhost:5000/edit/${this.props.match.params.id}`, {
                item: this.state.item,
                quantity: this.state.quantity,
                purchased: this.state.purchased
            })
            .then(res => {
                alert("Changes saved successfully");
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });

    }

    handleRedirect = () => {
        this.props.history.push("/");
    }

    componentDidMount(){
        let product = new URLSearchParams(`${this.props.location.search}`)
        console.log(product.get("quantity"))
        this.setState({
            item: product.get("item"),
            quantity: product.get("quantity")
        })

    }
    
    render() {
        console.log(this.props,"hi")
        return (
            <div className = "container m-auto">
                <h2>Change Item</h2>
                <div className="row">
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Item Name</label>
                            <input value = {this.state.item} name = "item" onChange = {(e) => this.handleChange(e)} required type="text" className="form-control"  />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlSelect1">Quantity</label>
                            <select value = {this.state.quantity} name = "quantity" onChange = {(e) => this.handleChange(e)} className="form-control">
                            <option>choose...</option>
                            <option>5</option>
                            <option>10</option>
                            <option>15</option>
                            <option>20  </option>
                            </select>
                        </div>
                        
                        <button onClick = {(e) => this.changeItem(e)} type="Add Item" className="btn btn-primary">Save Changes</button>
                        <button onClick = {this.handleRedirect} className="btn btn-primary ml-2">Go Back</button>
                    </form>
                </div>
            </div>
        )
    }
}
