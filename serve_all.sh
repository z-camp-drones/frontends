#!/usr/bin/env bash
dir=$(pwd)

echo "BUILDING BACKEND"
cd ${dir}/backend/
npm start

echo "BUILDING COCKPIT"
cd ${dir}/frontends/cockpit
npm run start &

echo "BUILDING CONTROL-CENTER"
cd ${dir}/frontends/control-center
npm run serve-element &
npm run serve &


echo "BUILDING TELEMETRY-STREAM"
cd ${dir}/frontends/telemetry-stream
npm run serve-element &
npm run serve &


echo "BUILDING VIDEO-STREAM"
cd ${dir}/frontends/video-stream
npm run serve-element &
npm run serve &
