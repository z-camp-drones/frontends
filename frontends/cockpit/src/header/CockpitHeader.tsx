import React, { ChangeEvent } from 'react';
import './CockpitHeader.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

export interface Props {
  host: string;
  onHostChange: ((event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => void),
}

function CockpitHeader(props: Props) {

  return (
    <div className="header">
      <AppBar position="static" color="default">
        <Toolbar className="toolbar">
          <Typography variant="h6" color="inherit">
            Tello Cockpit
          </Typography>
          <TextField
            id="host"
            label="Host"
            className="host-input-field"
            variant="outlined"
            value={props.host}
            onChange={props.onHostChange}
            margin="normal"
          />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default CockpitHeader;