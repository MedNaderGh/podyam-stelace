import _typeof from "@babel/runtime/helpers/typeof";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.string.split.js";
import "core-js/modules/es.string.starts-with.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/web.dom-collections.for-each.js";
import "core-js/modules/es.string.replace.js";
import "core-js/modules/es.array.filter.js";
import "core-js/modules/es.array.index-of.js";
import "core-js/modules/es.array.join.js";
import "core-js/modules/es.object.define-property.js";
import "core-js/modules/es.regexp.to-string.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.object.assign.js";
import jwtDecode from 'jwt-decode';
var OPTIONS_KEYS = ['stelaceVersion', 'stelaceUserId', 'stelaceOrganizationId'];
var hasOwn = {}.hasOwnProperty;
export var isApiKey = function isApiKey(key) {
  if (typeof key !== 'string' || key.length < 32) return false;
  var parts = key.split('_');
  if (parts.length !== 3) return false;
  var type = parts[0];
  return type.length >= 2 && type.length <= 10;
};
export var isSecretApiKey = function isSecretApiKey(key) {
  return isApiKey(key) && key.startsWith('seck_');
};
export var asCallback = function asCallback(promise, cb) {
  if (typeof cb !== 'function') return promise;
  var p = promise.then(function (res) {
    return cb(null, res);
  }).catch(function (err) {
    return setTimeout(function () {
      return cb(err);
    }, 0);
  }); // async throw

  return p;
};
export var isPromise = function isPromise(obj) {
  return !!obj && (_typeof(obj) === 'object' || typeof obj === 'function') && typeof obj.then === 'function' && typeof obj.catch === 'function';
};
export var interpolatePath = function interpolatePath(path, data) {
  var newPath = path;
  var keys = Object.keys(data);
  keys.forEach(function (key) {
    newPath = newPath.replace(':' + key, data[key]);
  });
  return newPath;
};
export var isOptionsHash = function isOptionsHash(obj) {
  return isObject(obj) && OPTIONS_KEYS.some(function (key) {
    return hasOwn.call(obj, key);
  });
};
export var getDataFromArgs = function getDataFromArgs(args) {
  if (!args.length || !isObject(args[0])) return {}; // Object should be either API data/params

  if (!isOptionsHash(args[0])) return args.shift(); // …or SDK options
  // since some endpoints options object may be the provided as the first argument
  // when there optional first argument is not be passed

  var argKeys = Object.keys(args[0]);
  var optionKeysInArgs = argKeys.filter(function (key) {
    return OPTIONS_KEYS.indexOf(key) > -1;
  }); // Detect erroneous options passed in data object
  // i.e. object having some keys that are not options

  if (optionKeysInArgs.length > 0 && optionKeysInArgs.length !== argKeys.length) {
    emitWarning("Options found in arguments (".concat(optionKeysInArgs.join(', '), "). Did you mean to pass an options object? "));
  }

  return {};
};
export var getOptionsFromArgs = function getOptionsFromArgs(args) {
  var opts = {
    headers: {}
  };

  if (args.length > 0) {
    var arg = last(args);

    if (isOptionsHash(arg)) {
      var params = args.pop();
      var extraKeys = Object.keys(params).filter(function (key) {
        return OPTIONS_KEYS.indexOf(key) === -1;
      });

      if (extraKeys.length) {
        emitWarning("Invalid options found (".concat(extraKeys.join(', '), "); ignoring."));
      }

      if (params.stelaceVersion) {
        opts.headers['x-stelace-version'] = params.stelaceVersion;
      }

      if (params.stelaceUserId) {
        opts.headers['x-stelace-user-id'] = params.stelaceUserId;
      }

      if (typeof params.stelaceOrganizationId !== 'undefined') {
        opts.headers['x-stelace-organization-id'] = params.stelaceOrganizationId;
      }
    }
  }

  return opts;
};
export var addReadOnlyProperty = function addReadOnlyProperty(obj, propertyName, property) {
  Object.defineProperty(obj, propertyName, {
    enumerable: false,
    writable: false,
    value: property
  });
};
export var decodeJwtToken = function decodeJwtToken(jwtToken) {
  return jwtDecode(jwtToken);
};

function emitWarning(warning) {
  if (process) {
    if (typeof process.emitWarning !== 'function') {
      return console.warn('Stelace: ' + warning);
    }

    return process.emitWarning(warning, 'Stelace');
  }
}

export var isBrowser = function isBrowser() {
  return (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object';
};
export var encodeBase64 = function encodeBase64(value) {
  if (isBrowser()) return window.btoa(value);else return Buffer.from(value).toString('base64');
};
export var decodeBase64 = function decodeBase64(value) {
  if (isBrowser()) return window.atob(value);else return Buffer.from(value, 'base64').toString('ascii');
}; // Lodash-like helpers

export function isObject(obj) {
  // similar to lodash isObjectLike
  return obj && _typeof(obj) === 'object';
}
export function last(arr) {
  return isObject(arr) && arr.length ? arr[arr.length - 1] : undefined;
}
/**
 * Creates an object composed of the object properties predicate returns truthy for.
 * The predicate is invoked with two arguments: (value, key).
 * @param {Object} object
 * @param {Function} [predicate = identity] - Only keeping truthy values by default
 */

export function pickBy(object) {
  var predicate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (_) {
    return _;
  };
  var obj = {};

  for (var key in object) {
    if (predicate(object[key], key)) obj[key] = object[key];
  }

  return obj;
}
export function clone(data) {
  if (!isObject(data)) return data;
  return Array.isArray(data) ? [].slice.call(data) : Object.assign({}, data);
}