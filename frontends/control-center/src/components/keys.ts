export interface Key {
    key: string;
    keyCode: number;
}

const ARROW_UP: Key = {
    key: 'ArrowUp',
    keyCode: 38,
};
const ARROW_DOWN: Key = {
    key: 'ArrowDown',
    keyCode: 40,
};
const ARROW_LEFT: Key = {
    key: 'ArrowLeft',
    keyCode: 37,
};
const ARROW_RIGHT: Key = {
    key: 'ArrowRight',
    keyCode: 39,
};

const W_KEY: Key = {
    key: 'w',
    keyCode: 87,
};

const S_KEY: Key = {
    key: 's',
    keyCode: 83,
};

const A_KEY: Key = {
    key: 'a',
    keyCode: 65,
};

const D_KEY: Key = {
    key: 'd',
    keyCode: 68,
};

const ALL_BASIC_KEYS: Key[] = [ARROW_UP, ARROW_DOWN, ARROW_LEFT, ARROW_RIGHT];

export const ALL_ALLOWED_BASIC_KEYS: string[] = ALL_BASIC_KEYS.map(k => k.key);

export const ALL_ALLOWED_KEY_CODES: number[] = ALL_BASIC_KEYS.map(k => k.keyCode);

const ALL_ADVANCED_KEYS: Key[] = [W_KEY, S_KEY, A_KEY, D_KEY];

export const ALL_ALLOWED_ADVANCED_KEYS: string[] = ALL_ADVANCED_KEYS.map(k => k.key);

export const ALL_ALLOWED_ADVANCED_KEY_CODES: number[] = ALL_ADVANCED_KEYS.map(k => k.keyCode);
