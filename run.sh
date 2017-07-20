#!/bin/sh
# Run Docker container.
docker run --name cruise_app -p 8080:8080 -p 8081:8081 -dti cruise
