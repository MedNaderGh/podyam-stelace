import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.reflect.construct.js";
import _createClass from "@babel/runtime/helpers/createClass";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import Resource from '../Resource';
import { decodeJwtToken } from '../utils';
var method = Resource.method;

var Auth = /*#__PURE__*/function (_Resource) {
  _inherits(Auth, _Resource);

  var _super = _createSuper(Auth);

  function Auth() {
    _classCallCheck(this, Auth);

    return _super.apply(this, arguments);
  }

  return _createClass(Auth);
}(Resource);

export { Auth as default };
Auth.prototype.login = method({
  path: '/auth/login',
  method: 'POST',
  afterRequest: function afterRequest(res, self) {
    var tokenStore = self._stelace.getApiField('tokenStore');

    tokenStore.setTokens(res);
    return res;
  }
});
Auth.prototype.logout = method({
  path: '/auth/logout',
  method: 'POST',
  beforeRequest: function beforeRequest(requestParams, self, tokens) {
    if (tokens && tokens.refreshToken) {
      requestParams.data.refreshToken = tokens.refreshToken;
    }

    return requestParams;
  },
  afterRequest: function afterRequest(res, self) {
    var tokenStore = self._stelace.getApiField('tokenStore');

    tokenStore.removeTokens();
    return res;
  }
});

Auth.prototype.info = function () {
  var tokenStore = this._stelace.getApiField('tokenStore');

  var infoResult = {
    isAuthenticated: false,
    userId: null
  };
  if (!tokenStore) return infoResult;
  var tokens = tokenStore.getTokens();
  if (!tokens || !tokens.accessToken) return infoResult;

  try {
    var parsedToken = decodeJwtToken(tokens.accessToken);
    infoResult.isAuthenticated = true;
    infoResult.userId = parsedToken.userId;
    return infoResult;
  } catch (err) {
    return infoResult;
  }
};

Auth.prototype.getTokens = method({
  path: '/auth/token',
  method: 'POST',
  afterRequest: function afterRequest(res, self) {
    var tokenStore = self._stelace.getApiField('tokenStore');

    tokenStore.setTokens(res);
    return res;
  }
});
Auth.prototype.check = method({
  path: '/auth/check',
  method: 'POST'
});