export interface AccelerationDto extends CoordinateDto {
}

export interface TemperatureDto {
    low: number;
    high: number;
}

export interface SpeedDto extends CoordinateDto {
}

export interface CoordinateDto {
    x: number;
    y: number;
    z: number;
}

export default interface TelemetryDto {
    pitch: number;
    roll: number;
    yaw: number;
    speed: SpeedDto;
    temperature: TemperatureDto;
    tof: number;
    heigh: number;
    battery: number;
    barometer: number;
    time: number;
    acceleration: AccelerationDto;
}