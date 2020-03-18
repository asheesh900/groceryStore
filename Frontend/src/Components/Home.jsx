import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

export default class Home extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             items: [],
             flag: false
        }
    }

    componentDidMount(){
        axios
            .get("http://localhost:5000/listing")
            .then(res => {
                const data = res.data["Items"];
                // console.log(data)
                this.setState({
                    items: data,
                    flag:true
                })
            })
            .catch(err => console.log(err));
            // console.log(this.state.items);
            

    }
    
    render() {
        if(this.state.flag === true){
            return (
                <div className = "container">
                    <h1>Product's List</h1>
                    <div className="row"></div>
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead className = "thead-dark">
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Item Name</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Mark</th>
                                <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.items.map((ele, i) => {
                                        return (
                                            <tr key = {i}>
                                                <td>{i+1}</td>
                                                <td>{ele.item}</td>
                                                <td>{ele.quantity} </td>
                                                <td>
                                                    <Link to = {`/change/${i+1}?item=${ele.item}&quantity=${ele.quantity}`}><button className="btn btn-primary">Edit</button></Link>
                                                </td>
                                                <td>
                                                    <Link to = {`/mark/${i+1}?item=${ele.item}&quantity=${ele.quantity}`}><button className="btn btn-warning">Mark</button></Link>
                                                </td>
                                                <td>
                                                    <Link to = {`/delete/${i+1}?item=${ele.item}&quantity=${ele.quantity}`}><button className="btn btn-danger">Delete</button></Link>
                                                </td>

                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                            </table>
                    </div>
                </div>
            )

        } else {
            return <h3>Data is yet to come.</h3>
        }
    }
}
