import React from 'react'
import {Route} from 'react-router-dom';
import About from "./About";
import AccountRoutes from './accounts'

export default function Root() {
    return (
        <>
            <Route exact path="/about" component={About}/>
            <Route path="/accounts" component={AccountRoutes} />
        </>
    )
}