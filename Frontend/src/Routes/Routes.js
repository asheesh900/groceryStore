import React, { Component } from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import Home from '../Components/Home'
import AddPage from '../Components/AddPage'
import DonePage from '../Components/DonePage'
import Change from '../Components/Change'
import Delete from '../Components/Delete'
import Mark from '../Components/Mark'
import ErrorPage from '../Components/ErrorPage'

export default class Routes extends Component {
    render() {
        return (
            <>
                <div className = "container-fluid bg-dark p-3">
                    <Link to = "/" className = "m-2 p-2 text-white">Home</Link>
                    <Link to = "/add" className = "m-2 p-2 text-white">Add Item</Link>
                    <Link to = "/done" className = "m-2 p-2 text-white">Purchased Items</Link>
                </div>
                <div>
                    <Switch>
                        <Route exact path = "/" component = {Home} />
                        <Route path = "/add" component = {AddPage} />
                        <Route path = "/change/:id" render = {props => <Change {...props} />} />
                        <Route path = "/delete/:id" render = {props => <Delete {...props} />} />
                        <Route path = "/mark/:id" render = {props => <Mark {...props} /> } />
                        <Route path = "/done" component = {DonePage} />
                        <Route component = {ErrorPage} />
                    </Switch>
                </div>
            </>
        )
    }
}
