#!/usr/bin/env bash
dir=$(pwd)
. ~/.nvm/nvm.sh

echo "INSTALLING BACKEND"
cd ${dir}/backend/
nvm use
npm install

echo "INSTALLING COCKPIT"
cd ${dir}/frontends/cockpit
nvm use
npm install

echo "INSTALLING CONTROL-CENTER"
cd ${dir}/frontends/control-center
nvm use
npm install

echo "INSTALLING TELEMETRY-STREAM"
cd ${dir}/frontends/telemetry-stream
nvm use
npm install

echo "INSTALLING VIDEO-STREAM"
cd ${dir}/frontends/video-stream
nvm use
npm install