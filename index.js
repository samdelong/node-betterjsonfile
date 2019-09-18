'use strict'
const fs = require('fs');

var proxy;
var loc;
var char;
var sync = true;

const proxySettings = {
  set: function(obj, prop, val) {
    obj[prop] = val;
    if (sync) {
      writeSync();
    } else {
      write();
    }
    return true;
  },
  get: function(obj, prop) {
    if (obj[prop] && typeof obj[prop] === 'object') {
      return new Proxy(obj[prop], proxySettings);
    }
    return obj[prop];
  }
}

function writeSync(){
  fs.writeFileSync(loc, JSON.stringify(proxy), char ? char : 'utf8');
}

function write() {
  fs.writeFile(loc, JSON.stringify(proxy), char ? char : 'utf8', (err) => {
    if (err) {
      console.error(err);
    }
  });
}

function read(loc){

  let dat = fs.readFileSync(loc);
  if(Buffer.isBuffer(dat)){
    dat = dat.toString('utf8');
  }
  return new Proxy(JSON.parse(dat.replace(/^\uFEFF/, '')), proxySettings)
}

module.exports = function(_loc, _sync, _char) {
  loc = _loc;
  char = _char;
  sync = typeof _sync !== 'undefined' ? _sync : true;
  proxy = read(loc);
  return proxy;
};
