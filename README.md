### cruise-technical-task
> :ship: Cruise technical task exercise written with Node.js, PHP/Phalcon and Vue.js.

#### Dependencies

* [Node.js + npm](https://nodejs.org/en/)
* [Docker](https://www.docker.com)

#### Deploying

* Set the external IP or domain for the api server in `data/apihost.json`.
> {"host":"http://localhost","port":8081,"origin":8080}

* Install deployment dependencies for app.
> `npm install`

* Deploy clientside JavaScript + CSS.
> `npm run dist`

* Build and run the Docker container.
> `sh build.sh && sh run.sh`
