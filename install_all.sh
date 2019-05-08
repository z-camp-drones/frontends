#!/usr/bin/env bash
dir=$(pwd)


cd ${dir}/backend/
nvm use
npm install

cd ${dir}/frontends/cockpit
nvm use
npm install

cd ${dir}/frontends/control-center
nvm use
npm install

cd ${dir}/frontends/telemetry-stream
nvm use
npm install

cd ${dir}/frontends/video-stream
nvm use
npm install