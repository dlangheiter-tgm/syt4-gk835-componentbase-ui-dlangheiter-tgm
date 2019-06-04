import React from 'react';
import {withStyles, Typography, Grid, Card} from "@material-ui/core";
import {Line} from "react-chartjs-2";
import {buildPath} from "./settings";

const styles = theme => ({
    root: {
        flex: 1,
    },
    item: {
        padding: theme.spacing.unit * 4,
    }
});

class windengines extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            windengines: {},
        }
    }

    componentDidMount() {
        this.fetchData(this.props.match.params.wpId);
    }

    async fetchData(wpId) {
        const res = await fetch(buildPath(`windpark/${wpId}`));
        const data = await res.json();

        const setData = {};

        for(const we of data) {
            if(!setData[we.windengineID]) {
                setData[we.windengineID] = [];
            }
            setData[we.windengineID].push(we);
        }

        this.setState({windengines: setData});
    }

    transformData(windengineData, attr) {
        const ret = []
        for (let key in windengineData) {
            ret.push({
                x: windengineData[key].timestamp,
                y: windengineData[key][attr]
            })
        }
        return ret;
    }

    render() {
        const {classes} = this.props;

        return (
            <React.Fragment>
                <Typography variant={"h2"}>Windengines:</Typography>
                <br/>
                <Grid container spacing={16}>
                    {
                        Object.keys(this.state.windengines).map(weId => (
                            <Grid item xs={12} key={weId}>
                                <Card className={classes.item}>
                                    <Typography variant={"h3"}>Windengine {weId}</Typography>
                                    <Line data={{
                                        datasets: [{
                                            label: 'Windspeed',
                                            data: this.transformData(this.state.windengines[weId], 'windspeed'),
                                            borderColor: 'red',
                                            fill: false,
                                        }, {
                                            label: 'Temperature',
                                            data: this.transformData(this.state.windengines[weId], 'temperature'),
                                            borderColor: 'blue',
                                            fill: false,
                                        }, {
                                            label: 'Rotationspeed',
                                            data: this.transformData(this.state.windengines[weId], 'rotationspeed'),
                                            borderColor: 'yellow',
                                            fill: false,
                                        }, {
                                            label: 'Blindpower',
                                            data: this.transformData(this.state.windengines[weId], 'blindpower'),
                                            borderColor: 'green',
                                            fill: false,
                                        }]
                                    }} options={{
                                        scales: {
                                            xAxes: [{
                                                type: 'time',
                                                time: {
                                                    //parser: 'YYYY-MM-DD HH:mm:ss:SSS',
                                                }
                                            }],
                                        },
                                        elements: {
                                            line: {
                                                tension: 0, // disables bezier curves
                                            }
                                        },
                                        animation: {
                                            duration: 0, // general animation time
                                        },
                                        hover: {
                                            animationDuration: 0, // duration of animations when hovering an item
                                        },
                                        responsiveAnimationDuration: 0, // animation duration after a resize
                                    }} />
                                </Card>
                            </Grid>
                        ))
                    }
                </Grid>
            </React.Fragment>
        )
    }

}

export const Windengines = withStyles(styles)(windengines);