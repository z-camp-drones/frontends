const sdk = require("../lib/tellojs");

let stateEmitter: any = null;
export let getStateEmitter = function() {
  if (stateEmitter === null) {
    stateEmitter = sdk.receiver.state.bind(); // Binding to port of state
  }
  return stateEmitter;
};
