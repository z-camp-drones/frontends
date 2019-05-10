/**
 * Pitch describes the rotation of the drone's x axis (forward / backward)
 * Roll describes the rotation of the drone's y axis (left / right)
 * Yaw describes the rotation of the drone's z axis
 * Height describes the vertical height of the drone
 */
export interface MovementCommand {
  pitch?: number;
  roll?: number;
  yaw?: number;
  height?: number;
}

export interface FlipCommand {
  direction: string;
}

export interface SpeedChangeCommand {
  speed: number;
}
