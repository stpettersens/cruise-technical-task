### cruise-technical-task
> :ship: Cruise technical task exercise written with Node.js, PHP/Phalcon and Vue.js.

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

#### Dependencies

* [Node.js + npm](https://nodejs.org/en/)
* [Docker](https://www.docker.com)
* [dig](https://linux.die.net/man/1/dig)

#### Deploying

* Set the external IP or domain for the API server:
> `npm run configure`
(`node configure.js <IP/Domain> # to set manually`)

* Install deployment dependencies for app.
> `npm install`

* Deploy clientside JavaScript + CSS.
> `npm run dist`

* Build and run the Docker container.
> `sh build.sh && sh run.sh`
