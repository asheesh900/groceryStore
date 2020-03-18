import React, { Component } from 'react'
import axios from 'axios'

export default class AddPage extends Component {
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

    addItem = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:5000/create", {
                item: this.state.item,
                quantity: this.state.quantity,
                purchased: this.state.purchased
            })
            .then(res => {
                alert("Item added successfully");
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });

    }

    handleRedirect = () => {
        console.log(this.props)
        this.props.history.push("/");
    }
    
    render() {
        return (
            <div className = "container m-auto">
                <h2>Add Item</h2>
                <div className="row">
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Item Name</label>
                            <input name = "item" onChange = {(e) => this.handleChange(e)} required type="text" className="form-control"  />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlSelect1">Quantity</label>
                            <select name = "quantity" onChange = {(e) => this.handleChange(e)} className="form-control">
                            <option>choose...</option>
                            <option>5</option>
                            <option>10</option>
                            <option>15</option>
                            <option>20  </option>
                            </select>
                        </div>
                        
                        <button onClick = {(e) => this.addItem(e)} type="Add Item" className="btn btn-primary p-2">Submit</button>
                        <button onClick = {this.handleRedirect} className="btn btn-primary ml-2 p-2">Go Back</button>
                    </form>
                </div>
            </div>
        )
    }
}
