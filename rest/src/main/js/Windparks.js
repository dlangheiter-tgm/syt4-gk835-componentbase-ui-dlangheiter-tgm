import React from 'react';
import {withStyles, Typography, List, ListItem, ListItemText, Grid, Card} from "@material-ui/core";
import {Link} from "react-router-dom";

const styles = theme => ({
    root: {
        flex: 1,
    },
    item: {
        padding: theme.spacing.unit * 4,
    },
    resetLink: {
        textDecoration: 'none',
    },
});

class windparks extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            windparks: [],
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    async fetchData() {
        const res = await fetch("http://localhost:8180/windpark/data/json");
        const data = await res.json();
        this.setState({windparks: data});
    }

    render() {
        const {classes} = this.props;

        return (
            <React.Fragment>
                <Typography variant={"h2"}>Windparks:</Typography>
                <br/>
                <Grid container spacing={16}>
                    {this.state.windparks.map(wp => (
                        <Grid item xs={6} key={wp.ownId}>
                            <Link to={`windpark/${wp.ownId}`} className={classes.resetLink}>
                                <Card className={classes.item}>
                                    <Typography variant={"h3"}>Windpark {wp.ownId}</Typography>
                                    <Typography>{wp.jsonDataUrl}</Typography>
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </React.Fragment>
        )
    }

}

export const Windparks = withStyles(styles)(windparks);