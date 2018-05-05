
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './routes/Home/Home.js';
import Discover from './routes/Discover/Discover.js';
import FaQ from './routes/FaQ/FaQ.js';
import Support from './routes/Support/Support.js';
import About from './routes/About/About.js';
import Dashboard from './routes/Dashboard/Dashboard.js';


export default (
    <Switch>
        
        <Route component={ Home } path='/home' exact />
        <Route component={ Discover } path='/discover' exact />
        <Route component={ FaQ } path='/faq' exact />
        <Route component={ Support } path='/support' exact />
        <Route component={ About } path='/about' exact />
        <Route component={ Dashboard } path='/' exact />

    </Switch>
)
