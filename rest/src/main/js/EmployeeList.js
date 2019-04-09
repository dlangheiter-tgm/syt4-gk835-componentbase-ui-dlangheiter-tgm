import React from 'react';
import {Employee} from "./Employee";
import {withStyles, Table, TableHead, Paper, TableRow, TableCell, TableBody} from "@material-ui/core";

const styles = (theme) => ({
    root: {

    }
});

class employeeList extends React.Component {
    render() {
        const {classes} = this.props;
        const employees = this.props.employees.map(employee =>
            <Employee key={employee._links.self.href} employee={employee}/>
        );
        return (
            <div className={classes.root}>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Description</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employees}
                        </TableBody>
                    </Table>
                </Paper>
            </div>

        )
    }
}

export const EmployeeList = withStyles(styles)(employeeList);