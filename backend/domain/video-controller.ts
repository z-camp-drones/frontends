import logger from '../commons/logging/logger';
import {getVideoForwardPort} from '../app-config';

const sdk = require('../lib/tellojs');
const {spawn} = require('child_process');

export default class VideoController {

  startVideoStream() {
    sdk.receiver.video.streamOn()
      .then(() => this.startFfmpeg())
      .catch((e: any) => logger.error('Error starting video stream', e));
  }

  private startFfmpeg() {
    logger.info(`Start Ffmpeg...`);
    const ffmpeg_spawn = {
      'command': 'ffmpeg',
      'args': [
        '-i', 'udp://192.168.10.1:11111',
        '-f', 'mpegts',
        '-codec:v', 'mpeg1video', '-s', '640x480',
        '-b:v', '1000k', '-bf', '0',
        `http://localhost:${getVideoForwardPort()}/video`,
      ],
    };
    const ffmpeg = spawn(ffmpeg_spawn.command, ffmpeg_spawn.args);
    ffmpeg.stdout.on('data', (data: string) => {
      logger.debug(`ffmpeg: ${data}`);
    });

    ffmpeg.stderr.on('data', (data: string) => {
      logger.error(`ffmpeg: ${data}`);
    });
  }
}
