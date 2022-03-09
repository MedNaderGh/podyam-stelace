import _typeof from "@babel/runtime/helpers/typeof";
import memoryLocalStorage from 'localstorage-memory';

var generateKey = function generateKey(namespace) {
  return "".concat(namespace, "-authtoken");
};

export var createDefaultTokenStore = function createDefaultTokenStore() {
  var namespace = 'stl';
  var localStorage = (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' && window.localStorage || memoryLocalStorage;
  return {
    getTokens: function getTokens() {
      var key = generateKey(namespace);
      var rawValue = localStorage.getItem(key);
      return JSON.parse(rawValue);
    },
    setTokens: function setTokens(tokens) {
      if (!tokens || _typeof(tokens) !== 'object') {
        throw new Error('Expected object as tokens value');
      }

      var key = generateKey(namespace);
      localStorage.setItem(key, JSON.stringify(tokens));
    },
    removeTokens: function removeTokens() {
      var key = generateKey(namespace);
      localStorage.removeItem(key);
    }
  };
};