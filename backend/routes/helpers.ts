export function random(lower: number, upper: number): number {
  return Math.random() * (upper - lower) + lower;
}

export function randomN(lower: number, upper: number): number {
  return Math.floor(random(lower, upper));
}

export function mockMessage(time: number) {
  let low = random(0, 30);
  return {
    pitch: randomN(1, 100),
    roll: randomN(1, 100),
    yaw: randomN(1, 100),
    speed: {x: random(1, 10), y: random(1, 10), z: random(1, 10)},
    temperature: {low: low, high: low + random(1, 10)},
    tof: random(0, 10),
    heigh: random(0, 30),
    battery: random(0, 100),
    barometer: random(950, 1100),
    time: time++,
    acceleration: {
      x: random(-900, 900),
      y: random(-900, 900),
      z: random(-900, 900)
    }
  };
}
