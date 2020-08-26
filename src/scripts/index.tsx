import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Hello from "./components/Hello";

import '../stylus/index.styl';

ReactDOM.render(<Hello content="hello world"/>, document.getElementById('root'))