import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Counter from "./components/Counter";
import store from './store';
import { Provider } from 'react-redux';

import '../stylus/index.styl';

ReactDOM.render(
    <Provider store={store}>
        <Counter />
    </Provider>
    , document.getElementById('root')
)