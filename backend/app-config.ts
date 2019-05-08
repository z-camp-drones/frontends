export const getAppPort = (): number => process.env.PORT ? parseInt(process.env.PORT) : 3000;

export const getVideoForwardPort = (): number => process.env.VIDEO_FORWARD_PORT ? parseInt(process.env.VIDEO_FORWARD_PORT) : 8081;

export const getVideoSocketPort = (): number => process.env.VIDEO_SOCKET_PORT ? parseInt(process.env.VIDEO_SOCKET_PORT) : 8082;