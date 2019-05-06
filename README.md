[![CircleCI](https://circleci.com/gh/z-camp-drones/frontends/tree/master.svg?style=svg)](https://circleci.com/gh/z-camp-drones/frontends/tree/master)

# Tello Drone Cockpit
This repo contains of 4 different apps:

<img src="./resources/Drone_control.png" width="450">

1. Main Cockpit App - using ReactJS
2. Video-stream App - using Anguar
3. Control-center App - using VueJS
4. Telemetry-stream App - using ReactJS

## How to run

Follow these steps to start the **Main ReactJS Cockpit App**
```
cd frontends/cockpit
npm run start
```

For every other app do the following
```
cd frontends/*frontend-name*
npm run http-server
npm run serve
```

`npm run http-server` will start a http server, which is sourcing the `./dist/*frontend-name*` folder. To ensure the every frontend can run their own http server, every frontend is using another port. Inside the `./dist` folder is the bundled custom element.

`npm run serve` will create a custom element and save it to the `./dist` folder.

This way the Main Cockpit App can source the newest version of the bundles directly and no need for coping around the built bundles.