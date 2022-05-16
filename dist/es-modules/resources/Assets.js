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

var Assets = /*#__PURE__*/function (_Resource) {
  _inherits(Assets, _Resource);

  var _super = _createSuper(Assets);

  function Assets() {
    _classCallCheck(this, Assets);

    return _super.apply(this, arguments);
  }

  return _createClass(Assets);
}(Resource);

export { Assets as default };
Resource.addBasicMethods(Assets, {
  path: '/assets',
  includeBasic: ['list', 'read', 'create', 'update', 'remove']
});
Assets.prototype.getAMFClassification = method({
  path: '/amfclassification',
  method: 'GET'
});
Assets.prototype.getCategories = method({
  path: '/fundcategories',
  method: 'GET'
});
Assets.prototype.getCurrencies = method({
  path: '/currencies',
  method: 'GET'
});
Assets.prototype.getFundtypes = method({
  path: '/fundtypes',
  method: 'GET'
});
Assets.prototype.getInvestementtypes = method({
  path: '/investementtypes',
  method: 'GET'
});
Assets.prototype.getManagementmethodes = method({
  path: '/managementmethodes',
  method: 'GET'
});
Assets.prototype.getFunds = method({
  path: '/funds',
  method: 'GET'
});
Assets.prototype.addFunds = method({
  path: '/funds',
  method: 'POST'
});
Assets.prototype.getSectors = method({
  path: '/economiquesecteur',
  method: 'GET'
});
Assets.prototype.getLabels = method({
  path: '/label',
  method: 'GET'
});
Assets.prototype.addWatchlist = method({
  path: '/watchlist',
  method: 'POST'
});
Assets.prototype.getWatchlist = method({
  path: '/watchlist/:id',
  method: 'GET',
  urlParams: ['id']
});
Assets.prototype.getFundsBulk = method({
  path: '/fundsbulk',
  method: 'POST'
});
Assets.prototype.deleteWatchlist = method({
  path: 'watchlist/:id1/:id2',
  method: 'DELETE',
  urlParams: ['id1', 'id2']
});
Assets.prototype.getFundValue = method({
  path: 'fundvalue/:id',
  method: 'GET',
  urlParams: ['id']
});