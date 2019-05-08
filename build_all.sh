#!/usr/bin/env bash
dir=$(pwd)
. ~/.nvm/nvm.sh

echo "BUILDING BACKEND"
cd ${dir}/backend/
nvm use
npm build

echo "BUILDING COCKPIT"
cd ${dir}/frontends/cockpit
nvm use
npm build

echo "BUILDING CONTROL-CENTER"
cd ${dir}/frontends/control-center
nvm use
npm build

echo "BUILDING TELEMETRY-STREAM"
cd ${dir}/frontends/telemetry-stream
nvm use
npm build

echo "BUILDING VIDEO-STREAM"
cd ${dir}/frontends/video-stream
nvm use
npm build