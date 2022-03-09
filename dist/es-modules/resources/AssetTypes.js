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

var AssetTypes = /*#__PURE__*/function (_Resource) {
  _inherits(AssetTypes, _Resource);

  var _super = _createSuper(AssetTypes);

  function AssetTypes() {
    _classCallCheck(this, AssetTypes);

    return _super.apply(this, arguments);
  }

  return _createClass(AssetTypes);
}(Resource);

export { AssetTypes as default };
Resource.addBasicMethods(AssetTypes, {
  path: '/asset-types',
  includeBasic: ['list', 'read', 'create', 'update', 'remove']
});