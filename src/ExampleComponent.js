import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import { routes } from './routes';

const ExampleComponent = () => {
    return (
        <>
            <Router>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/albums">Albums</Link>
                        </li>
                        <li>
                            <Link to="/photos">Photos</Link>
                        </li>
                    </ul>
                </nav>
                <div className="sidebar">
                    <Switch>
                        {routes.map((route, index) => (
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                children={<route.sidebar />}
                            />
                        ))}
                    </Switch>
                </div>
                <main>
                    <Switch>
                        {routes.map((route, index) => (
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                children={<route.component />}
                            />
                        ))}
                    </Switch>
                </main>
            </Router>
        </>
    );
}

export default ExampleComponent;