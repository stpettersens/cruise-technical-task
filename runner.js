'use strict'

// Invoke Caddy web server + PHP.

const os = require('os')
const sh = require('shelljs')

process.chdir('public')
if (os.platform() === 'win32') {
  console.info('http://:8080')
  sh.exec('start /min php-cgi -b 9001 && start /min caddy')
} else {
  sh.exec('php-cgi -b 9001 | caddy')
}
