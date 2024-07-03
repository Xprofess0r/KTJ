import React from 'react'
import { Switch, Route, withRouter, Redirect, useRouteMatch } from "react-router-dom";
import Contactusmain from './Contactus_main';
import ContactusmainW from './Contactus_mainW';
import ContactusmainD from './Contactus_mainD';
import data from "./data";
const { web, coredata, designdata } = data();
export default function ContactRoutes() {
    let { path, url } = useRouteMatch();
    // console.log("ContactRoutes", coredata, designdata, web);
    return (
        <div>
            <Switch>
                <Route exact path="/contactus"> <Redirect to="/contactus/core"/> </Route>
                <Route path="/contactus/core" render={()=><Contactusmain data={coredata} active={1} />}  />
                <Route path="/contactus/design" render={()=><ContactusmainD data={designdata} active={0} />} />
                <Route path="/contactus/tech" render={()=><ContactusmainW data={web} active={2} />} />
            </Switch>
    </div>
    )
}
