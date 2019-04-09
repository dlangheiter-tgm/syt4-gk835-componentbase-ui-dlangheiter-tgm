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
        this.addEmployee = this.addEmployee.bind(this);
    }

    componentDidMount() {
        client({method: 'GET', path: '/api/employees'}).done(response => {
            console.log('GET', response);
            this.setState({employees: response.entity._embedded.employees});
        });
    }

    addEmployee(entity) {
        this.setState({
            employees: [
                ...this.state.employees,
                entity
            ],
        });
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <CssBaseline/>
                <EmployeeList employees={this.state.employees}/>
                <br/><br/><br/>
                <CreateEmployee addEmployee={this.addEmployee}/>
            </div>
        )
    }
}

const App = withStyles(styles)(app);

ReactDOM.render(
    <App/>,
    document.getElementById('react')
);