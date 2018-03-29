
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './routes/Home/Home.js';
import Discover from './routes/Discover/Discover.js';


export default (
    <Switch>
        
        <Route component={ Home } path='/' exact />
        <Route component={ Discover } path='/discover' exact />

    </Switch>
)
