import React from 'react';
import {Paper, withStyles, TextField, Button, Typography} from "@material-ui/core";

const styles = (theme) => ({
    root: {
        maxWidth: 300,
        padding: theme.spacing.unit * 2,
    }
});

class createEmployee extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            description: '',
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    };

    render() {
        const {classes} = this.props;

        return (
            <Paper className={classes.root}>
                <Typography variant={"h5"}>Create Employee</Typography>
                <TextField
                    name={'firstName'}
                    label={'First Name'}
                    variant={"standard"}
                    margin={'normal'}
                    fullWidth
                    value={this.state.firstName}
                    onChange={this.handleChange}
                />
                <TextField
                    name={'lastName'}
                    label={'Last Name'}
                    variant={"standard"}
                    margin={'normal'}
                    fullWidth
                    value={this.state.lastName}
                    onChange={this.handleChange}
                />
                <TextField
                    name={'description'}
                    label={'Description'}
                    variant={"standard"}
                    margin={'normal'}
                    fullWidth
                    value={this.state.description}
                    onChange={this.handleChange}
                />
                <Button
                    type={'submit'}
                    variant={"contained"}
                    color={"primary"}
                >
                    Create
                </Button>
            </Paper>
        );
    }

}

export const CreateEmployee = withStyles(styles)(createEmployee);