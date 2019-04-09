const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');
import {EmployeeList} from "./EmployeeList";
import {CssBaseline, withStyles} from "@material-ui/core";
import {CreateEmployee} from "./CreateEmployee";

const styles = (theme) => ({
    root: {
        minHeight: '100vh',
        minWidth: '100vw',
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 4,
    }
});

class app extends React.Component {

    constructor(props) {
        super(props);
        this.state = {employees: []};
    }

    componentDidMount() {
        client({method: 'GET', path: '/api/employees'}).done(response => {
            this.setState({employees: response.entity._embedded.employees});
        });
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <CssBaseline/>
                <EmployeeList employees={this.state.employees}/>
                <br/><br/><br/>
                <CreateEmployee/>
            </div>
        )
    }
}

const App = withStyles(styles)(app);

ReactDOM.render(
    <App/>,
    document.getElementById('react')
);