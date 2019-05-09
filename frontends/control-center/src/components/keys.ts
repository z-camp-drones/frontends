import { BasicDroneState } from './BasicDroneController';
import { AdvancedDroneState } from './AdvancedDroneController';

export interface Movement {
  key: string;
  keyCode: number;
}

export interface AdvancedMovement extends Movement {
  adaptDroneState: (state: AdvancedDroneState, value: number) => AdvancedDroneState;
}

export interface BasicMovement extends Movement {
  adaptDroneState: (state: BasicDroneState, value: number) => BasicDroneState;
}

const FORWARD: BasicMovement = {
  key: 'ArrowUp',
  keyCode: 38,
  adaptDroneState(state: BasicDroneState, value: number) {
    return {
      ...state,
      pitch: value,
    } as BasicDroneState;
  },
};
const BACK: BasicMovement = {
  key: 'ArrowDown',
  keyCode: 40,
  adaptDroneState(state: BasicDroneState, value: number) {
    return {
      ...state,
      pitch: 0 - value,
    } as BasicDroneState;
  },
};
const LEFT: BasicMovement = {
  key: 'ArrowLeft',
  keyCode: 37,
  adaptDroneState(state: BasicDroneState, value: number) {
    return {
      ...state,
      roll: 0 - value,
    } as BasicDroneState;
  },
};
const RIGHT: BasicMovement = {
  key: 'ArrowRight',
  keyCode: 39,
  adaptDroneState(state: BasicDroneState, value: number) {
    return {
      ...state,
      roll: value,
    } as BasicDroneState;
  },
};

const UP: AdvancedMovement = {
  key: 'w',
  keyCode: 87,
  adaptDroneState(state: AdvancedDroneState, value: number) {
    return {
      ...state,
      height: value,
    } as AdvancedDroneState;
  },
};

const DOWN: AdvancedMovement = {
  key: 's',
  keyCode: 83,
  adaptDroneState(state: AdvancedDroneState, value: number) {
    return {
      ...state,
      height: 0 - value,
    } as AdvancedDroneState;
  },
};

const ROTATE_LEFT: AdvancedMovement = {
  key: 'a',
  keyCode: 65,
  adaptDroneState(state: AdvancedDroneState, value: number) {
    return {
      ...state,
      yaw: 0 - value,
    } as AdvancedDroneState;
  },
};

const ROTATE_RIGHT: AdvancedMovement = {
  key: 'd',
  keyCode: 68,
  adaptDroneState(state: AdvancedDroneState, value: number) {
    return {
      ...state,
      yaw: value,
    } as AdvancedDroneState;
  },
};

export const TAKEOFF_LAND: AdvancedMovement = {
  key: '',
  keyCode: 32,
  adaptDroneState(state: AdvancedDroneState, value: number) {
    return {...state};
  },
};

export const EMERGENCY: AdvancedMovement = {
  key: 'Escape',
  keyCode: 27,
  adaptDroneState(state: AdvancedDroneState, value: number) {
    return {...state};
  },
};

export const ALL_BASIC_MOVEMENTS: BasicMovement[] = [FORWARD, BACK, LEFT, RIGHT];

export const ALL_ALLOWED_BASIC_KEYS: string[] = ALL_BASIC_MOVEMENTS.map(
  k => k.key,
);

export const ALL_ADVANCED_MOVEMENTS: AdvancedMovement[] = [
  UP,
  DOWN,
  ROTATE_LEFT,
  ROTATE_RIGHT,
];

export const ALL_ALLOWED_ADVANCED_KEYS: string[] = ALL_ADVANCED_MOVEMENTS.map(
  k => k.key,
);
