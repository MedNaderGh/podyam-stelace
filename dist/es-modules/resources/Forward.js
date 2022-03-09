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
import { asCallback } from '../utils';
import makeRequest from '../makeRequest';

function forwardMethod(method) {
  return function (path) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var callback = typeof args[args.length - 1] === 'function' && args.pop();
    var spec = {
      method: method,
      path: path
    };
    var requestPromise = asCallback(makeRequest(this, args, spec), callback);
    return requestPromise;
  };
}

var Forward = /*#__PURE__*/function (_Resource) {
  _inherits(Forward, _Resource);

  var _super = _createSuper(Forward);

  function Forward() {
    _classCallCheck(this, Forward);

    return _super.apply(this, arguments);
  }

  return _createClass(Forward);
}(Resource);

export { Forward as default };
Forward.prototype.get = forwardMethod('GET');
Forward.prototype.post = forwardMethod('POST');
Forward.prototype.put = forwardMethod('PUT');
Forward.prototype.patch = forwardMethod('PATCH');
Forward.prototype.del = forwardMethod('DELETE');
Forward.prototype.options = forwardMethod('OPTIONS');