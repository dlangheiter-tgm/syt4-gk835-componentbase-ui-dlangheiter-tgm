import React from 'react';
import PropTypes from 'prop-types';
import {Paper, withStyles, TextField, Button, Typography} from "@material-ui/core";

const client = require('./client');

const styles = (theme) => ({
    root: {
        maxWidth: 300,
        padding: theme.spacing.unit * 2,
    }
});

const initialDataState = {
    firstName: '',
    lastName: '',
    description: '',
};

class createEmployee extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: initialDataState,
            loading: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            data: {
                ...this.state.data,
                [e.target.name]: e.target.value,
            },
        })
    };

    handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({loading: true});
        client({
            method: 'POST',
            path: '/api/employees',
            entity: this.state.data,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            this.setState({loading: false, data: initialDataState});
            this.props.addEmployee(response.entity);
        });
    }

    render() {
        const {classes} = this.props;

        return (
            <Paper className={classes.root}>
                <form
                    onSubmit={this.handleSubmit}
                >
                    <Typography variant={"h5"}>Create Employee</Typography>
                    <TextField
                        name={'firstName'}
                        label={'First Name'}
                        variant={"standard"}
                        margin={'normal'}
                        fullWidth
                        value={this.state.data.firstName}
                        onChange={this.handleChange}
                    />
                    <TextField
                        name={'lastName'}
                        label={'Last Name'}
                        variant={"standard"}
                        margin={'normal'}
                        fullWidth
                        value={this.state.data.lastName}
                        onChange={this.handleChange}
                    />
                    <TextField
                        name={'description'}
                        label={'Description'}
                        variant={"standard"}
                        margin={'normal'}
                        fullWidth
                        value={this.state.data.description}
                        onChange={this.handleChange}
                    />
                    <Button
                        type={'submit'}
                        variant={"contained"}
                        color={"primary"}disabled={this.state.loading}
                    >
                        Create
                    </Button>
                </form>
            </Paper>
        );
    }
}

createEmployee.propTypes = {
    addEmployee: PropTypes.func.isRequired,
}

export const CreateEmployee = withStyles(styles)(createEmployee);