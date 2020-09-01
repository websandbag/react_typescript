import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router } from 'react-router';
import store from './store';
import { Provider } from 'react-redux';
import creatBrowserHistory from 'history/creatBrowserHistory'
import { Routes } from "./Routes";

import '../stylus/index.styl';

const history = creatBrowserHistory

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Routes />
        </Router>
    </Provider>
    , document.getElementById('root')
)