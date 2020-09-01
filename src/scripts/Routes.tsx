import * as React from 'react';
import { Switch } from 'react-router';
import { Link, Route } from 'react-router-dom';
import Counter from './counter/Container';
import NotFound from './NotFound';

export class Routes extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                <h1>React Redux sample</h1>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/counter'>Counter</Link></li>
                    <li><Link to='/counter/params'>Counter with param</Link></li>
                </ul>
                <Switch>
                    <Route exact path='/counter' component={Counter}/>
                    <Route exact path='/counter/:myParams' component={Counter}/>
                    <Route component={ NotFound } />
                </Switch>
            </div>
        )
    }
}