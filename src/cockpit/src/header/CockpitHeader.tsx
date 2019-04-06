import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    flexGrow: 1,
  },
};

export interface Props extends WithStyles<typeof styles> {}

function CockpitHeader(props: Props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Tello Cockpit
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

CockpitHeader.propTypes = {
  classes: PropTypes.object.isRequired,
} as any;

export default withStyles(styles)(CockpitHeader);