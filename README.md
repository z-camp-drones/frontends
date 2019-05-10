[![CircleCI](https://circleci.com/gh/z-camp-drones/frontends/tree/master.svg?style=svg)](https://circleci.com/gh/z-camp-drones/frontends/tree/master)

# Tello Drone Cockpit
This repo contains of 4 different apps:

<img src="./resources/Drone_control.png" width="450">

1. Main Cockpit App - using ReactJS
2. Video-stream App - using Anguar
3. Control-center App - using VueJS
4. Telemetry-stream App - using ReactJS

## Run with docker
For a 'non-development' build, please simply run:
```
docker-compose build --parallel
docker-compose up
```

## Develop with docker
For a 'development' build (live reloading), please simply run:
```
docker-compose -f docker-compose-reload.yml build --parallel
docker-compose -f docker-compose-reload.yml up
```

When you modify the `package.json`, you will need to re-build the docker files, as the `node_modules/` folder is not mounted as volume into the docker image.

## How to run

Follow these steps to start the **Main ReactJS Cockpit App**
```
cd frontends/cockpit
npm run start
```

For every other app do the following
```
cd src/*frontend-name*
npm run serve-element
npm run http-server
```

`npm run http-server` will start a http server, which is sourcing the `./dist/*frontend-name*` folder. To ensure the every frontend can run their own http server, every frontend is using another port. Inside the `./dist` folder is the bundled custom element.

`npm run serve` will create a custom element and save it to the `./dist` folder.

This way the Main Cockpit App can source the newest version of the bundles directly and no need for coping around the built bundles.