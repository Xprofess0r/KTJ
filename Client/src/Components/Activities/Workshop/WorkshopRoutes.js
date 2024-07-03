import React from 'react'
import { Switch, Route, withRouter, Redirect, useRouteMatch } from "react-router-dom";
import WorkshopRegister from './WorkshopRegister/index';
import WorkshopDeregister from './WorkshopRegister/Deregister';
import { useSelector } from 'react-redux';


export default function WorkshopRoutes() {

    const auth = useSelector((state) => state.auth);
    console.log("auth = " + auth.user.ktjID);

    console.log("WorkshopRoutes")
    return (
        <Switch>
            <Route path="/workshop/register/:id" exact errors={null} component={WorkshopRegister} auth={auth} />
            <Route path="/workshop/deregister/:id" exact errors={null} component={WorkshopDeregister} auth={auth} />
        </Switch>)
}
