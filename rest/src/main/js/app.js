import React from 'react';
import ReactDOM from 'react-dom';
import "@babel/polyfill";
import {CssBaseline, withStyles} from "@material-ui/core";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Windparks} from "./Windparks";
import {Windengines} from "./Windengines";

const styles = (theme) => ({
    root: {
        minHeight: '100vh',
        width: '100vw',
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 4,
    }
});

class app extends React.Component {

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <CssBaseline/>
                <Router>
                    <Route path={'/'} exact={true} component={Windparks} />
                    <Route path={'/windpark/:wpId'} component={Windengines} />
                </Router>
            </div>
        )
    }
}

const App = withStyles(styles)(app);

ReactDOM.render(
    <App/>,
    document.getElementById('react')
);