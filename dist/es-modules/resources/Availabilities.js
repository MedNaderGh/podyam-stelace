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

var Availabilities = /*#__PURE__*/function (_Resource) {
  _inherits(Availabilities, _Resource);

  var _super = _createSuper(Availabilities);

  function Availabilities() {
    _classCallCheck(this, Availabilities);

    return _super.apply(this, arguments);
  }

  return _createClass(Availabilities);
}(Resource);

export { Availabilities as default };
Resource.addBasicMethods(Availabilities, {
  path: '/availabilities',
  includeBasic: ['list', 'create', 'update', 'remove']
});
Availabilities.prototype.getGraph = method({
  path: '/availabilities/graph',
  method: 'GET'
});