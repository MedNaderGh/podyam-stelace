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
var method = Resource.method;

var Tokens = /*#__PURE__*/function (_Resource) {
  _inherits(Tokens, _Resource);

  var _super = _createSuper(Tokens);

  function Tokens() {
    _classCallCheck(this, Tokens);

    return _super.apply(this, arguments);
  }

  return _createClass(Tokens);
}(Resource);

export { Tokens as default };
Tokens.prototype.checkRequest = method({
  path: '/token/check/request',
  method: 'POST'
});
Tokens.prototype.checkConfirm = method({
  path: '/token/check/:token',
  method: 'GET',
  urlParams: ['token']
});