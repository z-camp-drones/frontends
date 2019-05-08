#!/usr/bin/env bash
dir=$(pwd)

echo "BUILDING BACKEND"
cd ${dir}/backend/
npm run build

echo "BUILDING COCKPIT"
cd ${dir}/frontends/cockpit
npm run build

echo "BUILDING CONTROL-CENTER"
cd ${dir}/frontends/control-center
npm run build

echo "BUILDING TELEMETRY-STREAM"
cd ${dir}/frontends/telemetry-stream
npm run build

echo "BUILDING VIDEO-STREAM"
cd ${dir}/frontends/video-stream
npm run build