import React, { Component } from 'react'
import axios from 'axios'

export default class DonePage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             purchasedItems: [],
             flag: false
        }
    }

    handlRedirect = () => {
        this.props.history.push("/")
    }

    componentDidMount() {
        axios
            .get(`http://localhost:5000/purchased`)
            .then(res => {
                const data = res.data
                console.log(res)
                this.setState({
                    purchasedItems: data,
                    flag: true
                })
            })
            .catch(err => console.log(err));
            // console.log(this.state.purchasedItems)
    }
    
    render() {
        if(this.state.flag){
            return (
                <div className = "container text-center">
                    <h1>Purchased Items</h1>
                    <table className="table table-dark">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Item Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Purchased</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.purchasedItems.map((ele, i) => {
                                return (
                                    <tr key = {i}>
                                        <th scope = "row">{i+1} </th>
                                        <td>{ele.item} </td>
                                        <td>{ele.quantity} </td>
                                        <td>{ele.purchased} </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    </table>
                    <button onClick = {this.handlRedirect} >Go Back To Home</button>
                </div>
            )
        } else return <h1>Data is yet to come.</h1>
        
    }
}
