import { DroneState } from './DroneController';

export interface Movement {
	key: string;
	keyCode: number;
	adaptDroneState: (state: DroneState, value: number) => DroneState;
}

const FORWARD: Movement = {
	key: 'ArrowUp',
	keyCode: 38,
	adaptDroneState(state: DroneState, value: number) {
		return {
			...state,
			pitch: value,
		} as DroneState;
	},
};
const BACK: Movement = {
	key: 'ArrowDown',
	keyCode: 40,
	adaptDroneState(state: DroneState, value: number) {
		return {
			...state,
			pitch: 0 - value,
		} as DroneState;
	},
};
const LEFT: Movement = {
	key: 'ArrowLeft',
	keyCode: 37,
	adaptDroneState(state: DroneState, value: number) {
		return {
			...state,
			roll: 0 - value,
		} as DroneState;
	},
};
const RIGHT: Movement = {
	key: 'ArrowRight',
	keyCode: 39,
	adaptDroneState(state: DroneState, value: number) {
		return {
			...state,
			roll: value,
		} as DroneState;
	},
};

const UP: Movement = {
	key: 'w',
	keyCode: 87,
	adaptDroneState(state: DroneState, value: number) {
		return {
			...state,
			height: value,
		} as DroneState;
	},
};

const DOWN: Movement = {
	key: 's',
	keyCode: 83,
	adaptDroneState(state: DroneState, value: number) {
		return {
			...state,
			height: 0 - value,
		} as DroneState;
	},
};

const ROTATE_LEFT: Movement = {
	key: 'a',
	keyCode: 65,
	adaptDroneState(state: DroneState, value: number) {
		return {
			...state,
			yaw: 0 - value,
		} as DroneState;
	},
};

const ROTATE_RIGHT: Movement = {
	key: 'd',
	keyCode: 68,
	adaptDroneState(state: DroneState, value: number) {
		return {
			...state,
			yaw: value,
		} as DroneState;
	},
};

export const TAKEOFF_LAND: Movement = {
	key: '',
	keyCode: 32,
	adaptDroneState(state: DroneState, value: number) {
		return {...state};
	},
};

export const EMERGENCY: Movement = {
	key: 'Escape',
	keyCode: 27,
	adaptDroneState(state: DroneState, value: number) {
		return {...state};
	},
};

export const ALL_BASIC_MOVEMENTS: Movement[] = [FORWARD, BACK, LEFT, RIGHT];

export const ALL_ALLOWED_BASIC_KEYS: string[] = ALL_BASIC_MOVEMENTS.map(k => k.key);

export const ALL_ADVANCED_MOVEMENTS: Movement[] = [UP, DOWN, ROTATE_LEFT, ROTATE_RIGHT];

export const ALL_ALLOWED_ADVANCED_KEYS: string[] = ALL_ADVANCED_MOVEMENTS.map(k => k.key);
