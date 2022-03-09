import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.object.assign.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.array.includes.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/web.dom-collections.for-each.js";
import axios from 'axios';
import method from './method';
import getBasicMethods from './method.basic';
import { addReadOnlyProperty, clone, isBrowser, pickBy, encodeBase64 } from './utils';

var Resource = /*#__PURE__*/function () {
  function Resource(stelace) {
    _classCallCheck(this, Resource);

    this._stelace = stelace;
  }

  _createClass(Resource, [{
    key: "_request",
    value: function _request(_ref) {
      var path = _ref.path,
          method = _ref.method,
          data = _ref.data,
          queryParams = _ref.queryParams,
          _ref$options = _ref.options,
          options = _ref$options === void 0 ? {} : _ref$options;
      var requestParams = {
        url: path,
        method: method,
        baseURL: this.getBaseURL(),
        headers: this._prepareHeaders(options),
        timeout: this._stelace.getApiField('timeout')
      };

      if (queryParams && Object.keys(queryParams).length) {
        requestParams.params = queryParams;
      }

      if (data && Object.keys(data).length) {
        requestParams.data = data;
      }

      return axios(requestParams).then(this._responseHandler).catch(this._errorHandler);
    }
  }, {
    key: "_responseHandler",
    value: function _responseHandler(res) {
      var response = clone(res.data);
      var headers = res.headers || {};
      var lastResponse = {
        requestId: headers['x-request-id'],
        statusCode: res.status
      };
      addReadOnlyProperty(response, 'lastResponse', lastResponse);
      return response;
    }
  }, {
    key: "_errorHandler",
    value: function _errorHandler(err) {
      console.log(err);
      if (!err.response) throw err;
      var rawResponse = Object.assign({}, err.response);
      var error = Object.assign({}, rawResponse.data); // useful for tests (cannot add multiple times `lastResponse`)

      var headers = rawResponse.headers || {};
      var lastResponse = {
        requestId: headers['x-request-id'],
        statusCode: rawResponse.status
      };
      addReadOnlyProperty(error, 'lastResponse', lastResponse);
      throw error;
    }
  }, {
    key: "_prepareHeaders",
    value: function _prepareHeaders(options) {
      var apiKey = this._stelace.getApiField('key');

      var headers = {}; // Migrating to 'Authorization: Basic|Bearer|Stelace-V1' header

      var authorization = options.headers && options.headers.authorization; // can only be Bearer token

      var token = authorization && /Bearer\s+([^\s]*)/i.exec(authorization);
      token = token && token[1]; // Transforming to custom Authorization scheme
      // https://tools.ietf.org/html/draft-ietf-httpbis-p7-auth-19#appendix-B
      // Note that Stelace API header content parsing is case-insensitive
      // But we use casing for clarity here, as in 'apiKey'

      if (token) headers.authorization = "Stelace-V1 apiKey=".concat(apiKey, ", token=").concat(token);else if (apiKey) headers.authorization = "Basic ".concat(encodeBase64(apiKey + ':')); // cannot set the user agent in browser environment for security reasons
      // https://github.com/axios/axios/issues/1231

      if (!isBrowser()) headers['user-agent'] = this._stelace.getUserAgent();

      var apiVersion = this._stelace.getApiField('version');

      if (apiVersion) headers['x-stelace-version'] = apiVersion;

      var organizationId = this._stelace.getApiField('organizationId');

      if (organizationId) headers['x-stelace-organization-id'] = organizationId;

      if (options.headers) {
        Object.assign(headers, pickBy(options.headers, function (v, k) {
          return k.toLowerCase() !== 'authorization';
        }));
      }

      return pickBy(headers);
    }
  }, {
    key: "getBaseURL",
    value: function getBaseURL() {
      var protocol = this._stelace.getApiField('protocol');

      var host = this._stelace.getApiField('host');

      var port = this._stelace.getApiField('port');

      return protocol + '://' + host + ([80, 443].includes(port) ? '' : ":".concat(port));
    }
  }], [{
    key: "addBasicMethods",
    value: function addBasicMethods(resource, _ref2) {
      var path = _ref2.path,
          _ref2$includeBasic = _ref2.includeBasic,
          includeBasic = _ref2$includeBasic === void 0 ? [] : _ref2$includeBasic;
      var basicMethods = getBasicMethods(path, method);
      includeBasic.forEach(function (name) {
        resource.prototype[name] = basicMethods[name];
      });
    }
  }]);

  return Resource;
}();

export { Resource as default };
Resource.method = method;