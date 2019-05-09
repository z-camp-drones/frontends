export const getAppPort = (): number => process.env.PORT ? parseInt(process.env.PORT) : 3001;

export const getVideoForwardPort = (): number => process.env.VIDEO_FORWARD_PORT ? parseInt(process.env.VIDEO_FORWARD_PORT) : 8084;

export const getVideoSocketPort = (): number => process.env.VIDEO_SOCKET_PORT ? parseInt(process.env.VIDEO_SOCKET_PORT) : 8083;