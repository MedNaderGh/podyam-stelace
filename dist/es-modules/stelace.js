import _construct from "@babel/runtime/helpers/construct";
import _typeof from "@babel/runtime/helpers/typeof";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import "core-js/modules/es.array.includes.js";
import "core-js/modules/es.string.includes.js";
import "core-js/modules/es.array.filter.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/web.dom-collections.for-each.js";
import { createDefaultTokenStore } from './tokenStore';
import { errorTypes } from './errors';
import ApiKeys from './resources/ApiKeys';
import Assets from './resources/Assets';
import AssetTypes from './resources/AssetTypes';
import Auth from './resources/Auth';
import Availabilities from './resources/Availabilities';
import Categories from './resources/Categories';
import Config from './resources/Config';
import CustomAttributes from './resources/CustomAttributes';
import Documents from './resources/Documents';
import Entries from './resources/Entries';
import Events from './resources/Events';
import Forward from './resources/Forward';
import Messages from './resources/Messages';
import OrderLines from './resources/OrderLines';
import OrderMoves from './resources/OrderMoves';
import Orders from './resources/Orders';
import Password from './resources/Password';
import Permissions from './resources/Permissions';
import Providers from './resources/Providers';
import Ratings from './resources/Ratings';
import Roles from './resources/Roles';
import SavedSearch from './resources/SavedSearch';
import Search from './resources/Search';
import Tasks from './resources/Tasks';
import Tokens from './resources/Tokens';
import Transactions from './resources/Transactions';
import Users from './resources/Users';
import Webhooks from './resources/Webhooks';
import Workflows from './resources/Workflows';
var resources = {
  ApiKeys: ApiKeys,
  Assets: Assets,
  AssetTypes: AssetTypes,
  Auth: Auth,
  Availabilities: Availabilities,
  Categories: Categories,
  Config: Config,
  CustomAttributes: CustomAttributes,
  Documents: Documents,
  Entries: Entries,
  Events: Events,
  Forward: Forward,
  Messages: Messages,
  OrderLines: OrderLines,
  OrderMoves: OrderMoves,
  Orders: Orders,
  Password: Password,
  Permissions: Permissions,
  Providers: Providers,
  Ratings: Ratings,
  Roles: Roles,
  SavedSearch: SavedSearch,
  Search: Search,
  Tasks: Tasks,
  Tokens: Tokens,
  Transactions: Transactions,
  Users: Users,
  Webhooks: Webhooks,
  Workflows: Workflows
}; // export Stelace for tests

export var Stelace = /*#__PURE__*/function () {
  /**
   * @param {Object} params
   * @param {String} [params.apiKey]
   * @param {String} [params.apiVersion]
   * @param {Object} [params.tokenStore]
   * @param {Function} [params.beforeRefreshToken]
   */
  function Stelace(params) {
    _classCallCheck(this, Stelace);

    if (!params || _typeof(params) !== 'object') {
      throw new Error('A configuration object is expected to initialize Stelace');
    }

    var apiKey = params.apiKey,
        apiVersion = params.apiVersion,
        tokenStore = params.tokenStore,
        beforeRefreshToken = params.beforeRefreshToken;
    this._api = {
      key: null,
      host: Stelace.DEFAULT_HOST,
      protocol: Stelace.DEFAULT_PROTOCOL,
      port: Stelace.DEFAULT_PORT,
      version: Stelace.DEFAULT_API_VERSION,
      timeout: Stelace.DEFAULT_TIMEOUT,
      tokenStore: null,
      beforeRefreshToken: null,
      organizationId: null,
      errorListeners: {}
    };

    this._initResources();

    this.setApiKey(apiKey);
    this.setApiVersion(apiVersion);
    this.setTokenStore(tokenStore || createDefaultTokenStore());
    this.setBeforeRefreshToken(beforeRefreshToken);
  }

  _createClass(Stelace, [{
    key: "setHost",
    value: function setHost(host, port, protocol) {
      this._setApiField('host', host);

      if (port) {
        this.setPort(port);
      }

      if (protocol) {
        this.setProtocol(protocol);
      }
    }
  }, {
    key: "setProtocol",
    value: function setProtocol(protocol) {
      this._setApiField('protocol', protocol.toLowerCase());
    }
  }, {
    key: "setPort",
    value: function setPort(port) {
      this._setApiField('port', port);
    }
  }, {
    key: "setApiVersion",
    value: function setApiVersion(key) {
      if (key) {
        this._setApiField('version', key);
      }
    }
  }, {
    key: "setApiKey",
    value: function setApiKey(key) {
      if (key) {
        this._setApiField('key', key);
      }
    }
  }, {
    key: "setTimeout",
    value: function setTimeout(timeout) {
      this._setApiField('timeout', typeof timeout === 'number' ? timeout : Stelace.DEFAULT_TIMEOUT);
    }
  }, {
    key: "getTokenStore",
    value: function getTokenStore() {
      return this.getApiField('tokenStore') || null;
    }
  }, {
    key: "setTokenStore",
    value: function setTokenStore(tokenStore) {
      var validTokenStore = this.isValidTokenStore(tokenStore);

      if (validTokenStore) {
        this._setApiField('tokenStore', tokenStore);
      }
    }
  }, {
    key: "isValidTokenStore",
    value: function isValidTokenStore(tokenStore) {
      return tokenStore && _typeof(tokenStore) === 'object' && typeof tokenStore.getTokens === 'function' && typeof tokenStore.setTokens === 'function' && typeof tokenStore.removeTokens === 'function';
    }
  }, {
    key: "setBeforeRefreshToken",
    value: function setBeforeRefreshToken(beforeRefreshToken) {
      if (typeof beforeRefreshToken !== 'function') return;

      this._setApiField('beforeRefreshToken', beforeRefreshToken);
    }
  }, {
    key: "setOrganizationId",
    value: function setOrganizationId(organizationId) {
      this._setApiField('organizationId', organizationId);
    }
  }, {
    key: "getApiField",
    value: function getApiField(key) {
      return this._api[key];
    }
  }, {
    key: "_setApiField",
    value: function _setApiField(key, value) {
      this._api[key] = value;
    }
  }, {
    key: "getConstant",
    value: function getConstant(c) {
      return Stelace[c];
    }
  }, {
    key: "getUserAgent",
    value: function getUserAgent() {
      var browserUserAgent;

      if (typeof window !== 'undefined') {
        browserUserAgent = window.navigator && window.navigator.userAgent;
      }

      return Stelace.USER_AGENT_STRING + (browserUserAgent ? ' ' + browserUserAgent : '');
    }
  }, {
    key: "_initResources",
    value: function _initResources() {
      for (var name in resources) {
        var key = name[0].toLowerCase() + name.substring(1);
        this[key] = new resources[name](this);
      }
    }
  }, {
    key: "onError",
    value: function onError(type, callback) {
      if (!errorTypes.includes(type)) throw new Error("Invalid error type: ".concat(type));
      var allListeners = this.getApiField('errorListeners');
      allListeners[type] = allListeners[type] || [];
      allListeners[type].push(callback);
      return function unsubscribe() {
        allListeners[type] = allListeners[type].filter(function (cb) {
          return cb !== callback;
        });
      };
    }
  }, {
    key: "_emitError",
    value: function _emitError(type, error) {
      var allListeners = this.getApiField('errorListeners');
      var typeListeners = allListeners[type] || [];
      typeListeners.forEach(function (listener) {
        listener(error);
      });
    }
  }]);

  return Stelace;
}();
Stelace.DEFAULT_HOST = 'api.stelace.com';
Stelace.DEFAULT_PROTOCOL = 'https';
Stelace.DEFAULT_PORT = 443;
Stelace.DEFAULT_API_VERSION = null;
Stelace.DEFAULT_TIMEOUT = 30 * 1000; // 30s

Stelace.PACKAGE_VERSION = "0.17.2";
Stelace.USER_AGENT_STRING = "Stelace/".concat(Stelace.PACKAGE_VERSION);
export var createInstance = function createInstance() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return _construct(Stelace, args);
};