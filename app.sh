#!/bin/sh
# Run the application outside of Docker container.
# Uses daemonize: http://software.clapper.org/daemonize
cd /usr/src/app/api
daemonize -c $(pwd) /usr/bin/node api.js
cd /usr/src/app/public
daemonize -c $(pwd) /usr/bin/php-cgi -b 9001
daemonize -c $(pwd) /usr/local/bin/caddy
