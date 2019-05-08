#!/usr/bin/env bash
dir=$(pwd)

echo "INSTALLING BACKEND"
cd ${dir}/backend/
npm install

echo "INSTALLING COCKPIT"
cd ${dir}/frontends/cockpit
npm install

echo "INSTALLING CONTROL-CENTER"
cd ${dir}/frontends/control-center
npm install

echo "INSTALLING TELEMETRY-STREAM"
cd ${dir}/frontends/telemetry-stream
npm install

echo "INSTALLING VIDEO-STREAM"
cd ${dir}/frontends/video-stream
npm install