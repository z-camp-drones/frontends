import React, {ChangeEvent} from 'react';
import './CockpitHeader.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export interface Props {
  host: string;
  droneConnected: boolean;
  onHostChange: (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>,
  ) => void;
  onConnect: () => void;
}

function CockpitHeader(props: Props) {

  const onConnect = () => {
    props.onConnect();
  };

  return (
    <div className="header">
      <AppBar position="static" color="default">
        <Toolbar className="toolbar">
          <div>
            <Typography variant="h6" color="inherit">Tello Cockpit</Typography>
          </div>
          <div className="connection-widget">
            <TextField
              id="host"
              label="Host"
              className="host-input-field"
              variant="outlined"
              value={props.host}
              onChange={props.onHostChange}
              margin="normal"
            />
            <div className="connection-status">
            {props.droneConnected
              ? <Typography variant="body2" color="inherit">Connected</Typography>
              : <Button className="connect-button" onClick={() => onConnect()}>Connect</Button>}
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default CockpitHeader;
