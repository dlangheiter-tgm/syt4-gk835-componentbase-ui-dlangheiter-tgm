import React from 'react';
import {TableCell, TableRow} from "@material-ui/core";

export class Employee extends React.Component{
    render() {
        return (
            <TableRow>
                <TableCell>{this.props.employee.firstName}</TableCell>
                <TableCell>{this.props.employee.lastName}</TableCell>
                <TableCell>{this.props.employee.description}</TableCell>
            </TableRow>
        )
    }
}