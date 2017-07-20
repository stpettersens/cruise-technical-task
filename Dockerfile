#
# Dockerfile for cruise-technical-task exercise:
# cruise
#

# Use official Node.js image as base.
FROM node:latest

# Maintainer of this project.
MAINTAINER Sam Saint-Pettersen <s.stpettersen+github@gmail.com>

# Install PHP, PEAR/PECL, caddy web server,
# phalcon framework and MongoDB and its PHP driver as dependencies for app.
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
RUN echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.2.list
RUN curl -s https://packagecloud.io/install/repositories/phalcon/stable/script.deb.sh | bash
RUN curl -s https://getcaddy.com | bash
RUN apt-get update && apt-get install -y php5 php5-cgi php5-phalcon mongodb-org
RUN apt-get install -y php-pear php5-dev libcurl3-openssl-dev
RUN pecl install mongo && echo "extension=mongo.so" >> /etc/php5/cgi/php.ini

# Expose the app and api servers on port 8080 and 8081.
EXPOSE 8080
EXPOSE 8081

# Create db directory.
RUN mkdir -p /data/db

# Create app directory.
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app source.
COPY . /usr/src/app

# Install deployment dependencies for app.
RUN npm install

# Deploy clientside JavaScript + CSS.
RUN npm run dist

# Clobber now unnecessary directories:
# node_modules/ in root and client-side/.
RUN rm -r -f node_modules/
RUN rm -r -f clientside/

# Install dependencies for api server (Node.js "express" application).
WORKDIR /usr/src/app/api
RUN npm install --production

# Serve app.
WORKDIR /usr/src/app/public
CMD mongod | node /usr/src/app/api/api.js | php-cgi -b 9001 | caddy
